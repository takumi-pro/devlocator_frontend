import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Accordion } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccordionCard } from "@/ui/card";
import { Filter } from "@/ui/filter/Filter";

const events = [
  {
    id: 1,
    title: "新宿ミートアップ#4",
    date: "2023/12/16（土）12:00~13:00",
    address: "東京都新宿区西新宿６丁目２４−１西新宿三井ビルディング１５０３",
    limit: 60,
    current: 50,
  },
  {
    id: 2,
    title: "新宿ミートアップ#4",
    date: "2023/12/16（土）12:00~13:00",
    address: "東京都新宿区西新宿６丁目２４−１西新宿三井ビルディング１５０３",
    limit: 60,
    current: 50,
  },
  {
    id: 3,
    title: "新宿ミートアップ#4",
    date: "2023/12/16（土）12:00~13:00",
    address: "東京都新宿区西新宿６丁目２４−１西新宿三井ビルディング１５０３",
    limit: 60,
    current: 50,
  },
  {
    id: 4,
    title: "新宿ミートアップ#4",
    date: "2023/12/16（土）12:00~13:00",
    address: "東京都新宿区西新宿６丁目２４−１西新宿三井ビルディング１５０３",
    limit: 60,
    current: 50,
  },
  {
    id: 5,
    title: "新宿ミートアップ#4",
    date: "2023/12/16（土）12:00~13:00",
    address: "東京都新宿区西新宿６丁目２４−１西新宿三井ビルディング１５０３",
    limit: 60,
    current: 50,
  },
];

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
      <div className="md:w-md-sidebar absolute right-0 top-0 z-10 h-sidebar w-sidebar bg-sidebar p-3">
        <Tabs defaultValue="all">
          <TabsList className="shadow-lg">
            <TabsTrigger value="all">すべてのイベント</TabsTrigger>
            <TabsTrigger value="bookmark">ブックマークしたイベント</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {/* TODO: UIに切り出す */}
            <div className="mt-6 text-sm text-slate-500">
              <span className="mr-1 font-bold text-custom-fontcolor">99</span>
              件表示されています
            </div>
            <Accordion
              className="mt-3 flex h-sidebar-content flex-col gap-y-3 overflow-scroll"
              type="single"
              collapsible
            >
              {events.map((event) => (
                <AccordionCard key={event.id} event={event} />
              ))}
            </Accordion>
          </TabsContent>
          <TabsContent value="bookmark">bookmark events</TabsContent>
        </Tabs>
      </div>
      <Filter />
    </main>
  );
};

export default Home;
