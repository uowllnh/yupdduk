import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const handlersPath = path.join(rootDir, "src/mocks/handlers.ts");

function extractConst(source, name) {
  const startToken = `const ${name}`;
  const start = source.indexOf(startToken);

  if (start < 0) {
    throw new Error(`${name} 값을 찾지 못했습니다.`);
  }

  const equals = source.indexOf("=", start);
  const valueStart = source.indexOf(source.slice(equals + 1).match(/[{\[]/)?.[0], equals);
  const opener = source[valueStart];
  const closer = opener === "{" ? "}" : "]";
  let depth = 0;
  let inString = false;
  let stringQuote = "";
  let escaped = false;

  for (let index = valueStart; index < source.length; index += 1) {
    const char = source[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === stringQuote) {
        inString = false;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      stringQuote = char;
      continue;
    }

    if (char === opener) depth += 1;
    if (char === closer) depth -= 1;

    if (depth === 0) {
      return source.slice(valueStart, index + 1);
    }
  }

  throw new Error(`${name} 값을 끝까지 읽지 못했습니다.`);
}

function parseLiteral(source, name) {
  const literal = extractConst(source, name);
  return Function(`"use strict"; return (${literal});`)();
}

function omitUndefined(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, fieldValue]) => fieldValue !== undefined),
  );
}

async function loadFirebaseAdmin() {
  try {
    const adminModule = await import("firebase-admin");
    return adminModule.default ?? adminModule;
  } catch {
    throw new Error(
      "firebase-admin이 설치되어 있지 않습니다. 먼저 `npm install firebase-admin -D`를 실행해주세요.",
    );
  }
}

function buildMenuDocuments(source) {
  const sectionLabels = parseLiteral(source, "SECTION_LABELS");
  const spiceOptions = parseLiteral(source, "SPICE_OPTIONS");
  const toppingOptions = parseLiteral(source, "TOPPING_OPTIONS");
  const yupddeokMenuOptions = parseLiteral(source, "YUPDDEOK_MENU_OPTIONS");
  const menuSeeds = parseLiteral(source, "menuSeeds");

  return menuSeeds.map((menu, index) => {
    const section = menu.config.section;

    return omitUndefined({
      id: menu.id,
      name: menu.name,
      price: menu.price,
      image: menu.image,
      section,
      sectionLabel: sectionLabels[section],
      description: menu.description,
      explan: menu.description,
      menuOption: menu.id === "yupddeok" ? yupddeokMenuOptions : undefined,
      spice: menu.config.spiceType ? spiceOptions[menu.config.spiceType] : undefined,
      toppingChoices: (menu.config.toppingTypes ?? []).map((type) => ({
        type,
        ...toppingOptions[type],
      })),
      isActive: true,
      order: index,
    });
  });
}

async function main() {
  const collectionName = process.env.FIRESTORE_MENU_COLLECTION ?? "menus";
  const source = fs.readFileSync(handlersPath, "utf8");
  const menus = buildMenuDocuments(source);
  const admin = await loadFirebaseAdmin();

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }

  const db = admin.firestore();
  const batch = db.batch();

  for (const menu of menus) {
    const ref = db.collection(collectionName).doc(menu.id);
    batch.set(ref, menu, { merge: true });
  }

  await batch.commit();

  console.log(`${collectionName} 컬렉션에 메뉴 ${menus.length}개를 업로드했습니다.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
