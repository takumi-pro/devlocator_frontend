"use client";

import { signIn } from "next-auth/react";

/**
 * Signinボタン
 */
export const Signin = () => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "http://localhost:3000" })}
    >
      Sign in
    </button>
  );
};
