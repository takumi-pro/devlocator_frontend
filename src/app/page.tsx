"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

/**
 * Home
 */
const Home = () => {
  const Map = useMemo(
    () =>
      dynamic(() => import("../ui/Map/Map").then((module) => module.Map), {
        ssr: false,
      }),
    []
  );
  return (
    <main>
      <Map />
      {/* TODO: uiに切り出す */}
      <div
        style={{
          width: "424px",
          height: "calc(100vh - 56px)",
          backgroundColor: "#fff",
          zIndex: "1",
          opacity: ".7",
          position: "absolute",
          top: "56px",
          right: "0px",
        }}
      />
    </main>
  );
};

export default Home;
