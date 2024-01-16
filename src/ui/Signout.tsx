"use client";

import { signOut } from "next-auth/react";

/**
 * Signoutボタン
 */
export const Signout = () => {
  return <button onClick={() => signOut()}>Sign out</button>;
};
