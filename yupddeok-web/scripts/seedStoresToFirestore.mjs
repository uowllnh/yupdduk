import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const storesPath = path.join(rootDir, "src/mocks/stores.ts");

function extractConst(source, name) {
  const start = source.search(new RegExp(`(?:export\\s+)?const\\s+${name}\\b`));

  if (start < 0) {
    throw new Error(`${name} 값을 찾지 못했습니다.`);
  }

  const equals = source.indexOf("=", start);
  const firstValueChar = source.slice(equals + 1).match(/[{\[]/)?.[0];

  if (!firstValueChar) {
    throw new Error(`${name} 값의 시작점을 찾지 못했습니다.`);
  }

  const valueStart = source.indexOf(firstValueChar, equals);
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

async function main() {
  const collectionName = process.env.FIRESTORE_STORE_COLLECTION ?? "stores";
  const source = fs.readFileSync(storesPath, "utf8");
  const stores = parseLiteral(source, "STORES").map((store, index) => ({
    ...store,
    isActive: true,
    order: index,
  }));
  const admin = await loadFirebaseAdmin();

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }

  const db = admin.firestore();
  const batch = db.batch();

  for (const store of stores) {
    const ref = db.collection(collectionName).doc(store.id);
    batch.set(ref, store, { merge: true });
  }

  await batch.commit();

  console.log(`${collectionName} 컬렉션에 매장 ${stores.length}개를 업로드했습니다.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
