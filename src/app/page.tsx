import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Filter } from "@/ui/filter/Filter";

import { DrawerWrapper, Sidebar } from "./_components";

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
      <Sidebar />
      <Filter />
      <DrawerWrapper />
    </main>
  );
};

export default Home;
