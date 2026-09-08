"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  getAuthErrorMessage,
  loginWithEmail,
  loginWithGoogle,
} from "@/lib/auth";
import { auth } from "@/lib/firebase";
import SocialLoginButton from "./loginbutton";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nextPath = searchParams.get("next") || "/";

  useEffect(() => {
    if (auth.currentUser) {
      router.replace(nextPath);
    }
  }, [nextPath, router]);

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    setIsLoggingIn(true);

    try {
      await loginWithGoogle();
      router.replace(nextPath);
    } catch (error) {
      console.error(error);
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoggingIn(true);

    try {
      await loginWithEmail(email, password);
      router.replace(nextPath);
    } catch (error) {
      console.error(error);
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <main className="bg-primary flex min-h-screen flex-col py-8">
      <section className="px-4">
        <Link href="/" className="text-sm font-bold text-white">
          닫기
        </Link>
      </section>
      <span className="mt-10 flex justify-center text-2xl text-white">
        로그인
      </span>
      <section className="mt-24 h-screen w-full rounded-4xl bg-white pt-12">
        <section className="flex flex-col justify-center px-6 pb-4">
          {errorMessage ? (
            <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm leading-5 font-semibold text-red-500">
              {errorMessage}
            </p>
          ) : null}

          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-500">
                이메일
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email@example.com"
                autoComplete="email"
                className="h-13 w-full rounded-2xl border border-gray-200 bg-white px-4 text-[16px] outline-none focus:border-black"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-500">
                비밀번호
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="6자 이상"
                autoComplete="current-password"
                className="h-13 w-full rounded-2xl border border-gray-200 bg-white px-4 text-[16px] outline-none focus:border-black"
              />
            </label>
            <Link
              href=""
              className="text-primary-orange my-[29px] flex justify-end text-sm"
            >
              비밀번호를 잃어버렸나요?
            </Link>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="bg-primary h-14 w-full rounded-[12px] px-5 text-[16px] font-bold text-white disabled:opacity-60"
            >
              이메일로 로그인
            </button>
          </form>
          <section className="my-10 block w-full text-center font-bold text-gray-400">
            <span className="mr-2"> 계정이 없나요? </span>

            <Link
              href="signup/inputId"
              className="text-primary-orange font-bold"
            >
              회원가입
            </Link>
          </section>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-bold text-gray-400">Or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <section className="mt-10 flex justify-around">
            <SocialLoginButton
              label="구글 로그인"
              icon="/icons/social/google.svg"
              variant="google"
              disabled={isLoggingIn}
              onClick={handleGoogleLogin}
            />
            <SocialLoginButton
              label="카카오 로그인"
              icon="/icons/social/kakao.svg"
              variant="kakao"
              disabled={isLoggingIn}
              onClick={handleGoogleLogin}
            />
            <SocialLoginButton
              label="네이버 로그인"
              icon="/icons/social/naver.svg"
              variant="naver"
              disabled={isLoggingIn}
              onClick={handleGoogleLogin}
            />
          </section>
        </section>
      </section>
    </main>
  );
}
