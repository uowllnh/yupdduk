// src/lib/auth.ts
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function loginWithEmail(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signUpWithEmail(email: string, password: string) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function logout() {
  await signOut(auth);
}

export function getAuthErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return "로그인에 실패했습니다. 다시 시도해주세요.";
  }

  switch (error.code) {
    case "auth/popup-closed-by-user":
      return "로그인 창이 닫혔습니다.";
    case "auth/popup-blocked":
      return "브라우저가 로그인 팝업을 차단했습니다.";
    case "auth/unauthorized-domain":
      return "현재 도메인이 Firebase 로그인 허용 도메인에 등록되어 있지 않습니다.";
    case "auth/operation-not-allowed":
      return "Firebase Authentication에서 해당 로그인 방식이 활성화되어 있지 않습니다.";
    case "auth/invalid-api-key":
      return "Firebase API 키 설정이 올바르지 않습니다.";
    case "auth/invalid-email":
      return "이메일 형식이 올바르지 않습니다.";
    case "auth/missing-password":
      return "비밀번호를 입력해주세요.";
    case "auth/weak-password":
      return "비밀번호는 6자 이상으로 입력해주세요.";
    case "auth/email-already-in-use":
      return "이미 가입된 이메일입니다.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "이메일 또는 비밀번호가 올바르지 않습니다.";
    default:
      return `로그인에 실패했습니다. (${error.code})`;
  }
}
