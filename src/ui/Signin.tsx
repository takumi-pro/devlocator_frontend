"use client";

import { signIn } from "next-auth/react";

/**
 * Signinボタン
 */
export const Signin = () => {
  return <button onClick={() => signIn()}>Sign in</button>;
};
