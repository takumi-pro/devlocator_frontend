import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Filter } from "@/ui/filter/Filter";

/**
 * Home
 */
const Home = () => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/ui/map/Map").then((module) => module), {
        ssr: false,
      }),
    []
  );

  return (
    <main className="relative">
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
          top: "0px",
          right: "0px",
        }}
      />
      <Filter />
    </main>
  );
};

export default Home;
