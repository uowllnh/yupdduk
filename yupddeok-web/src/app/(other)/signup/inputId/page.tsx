"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { getAuthErrorMessage, signUpWithEmail } from "@/lib/auth";
import { auth } from "@/lib/firebase";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const nextPath = searchParams.get("next") || "/";

  useEffect(() => {
    if (auth.currentUser) {
      router.replace(nextPath);
    }
  }, [nextPath, router]);

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoggingIn(true);

    try {
      await signUpWithEmail(email, password);
      router.replace("/signup");
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
        회원가입
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
                autoComplete="new-password"
                className="h-13 w-full rounded-2xl border border-gray-200 bg-white px-4 text-[16px] outline-none focus:border-black"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-500">
                비밀번호 확인
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="6자 이상"
                autoComplete="new-password"
                className="h-13 w-full rounded-2xl border border-gray-200 bg-white px-4 text-[16px] outline-none focus:border-black"
              />
            </label>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="bg-primary mt-10 h-14 w-full rounded-[12px] px-5 text-[16px] font-bold text-white disabled:opacity-60"
            >
              이메일로 회원가입
            </button>
          </form>
          <div className="my-10 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-bold text-gray-400">Or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <Link
            href="/login"
            className="block w-full text-center text-sm font-bold text-gray-500"
          >
            이미 계정이 있나요? 로그인
          </Link>
        </section>
      </section>
    </main>
  );
}
