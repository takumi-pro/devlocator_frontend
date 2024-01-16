"use client";

import { signIn, signOut } from "next-auth/react";

/**
 * Home
 */
const Home = () => {
  return (
    <main>
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
    </main>
  );
};

export default Home;
