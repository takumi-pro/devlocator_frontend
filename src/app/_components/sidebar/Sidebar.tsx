"use client";

import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import { Accordion } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccordionCard } from "@/ui/card";

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
 * イベント情報を表示するサイドバー
 */
export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`${
        !open ? "translate-x-sidebar-small tablet:translate-x-sidebar" : ""
      } absolute right-0 top-0 z-10 hidden h-sidebar w-sidebar-small bg-sidebar p-3 shadow-lg transition-all duration-200 mobile:block tablet:w-sidebar`}
    >
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="relative right-12 z-0 flex h-10 w-9 cursor-pointer items-center justify-center rounded-l-lg bg-white"
      >
        <IoIosArrowForward className={`${!open && "rotate-180"}`} />
      </div>
      <Tabs defaultValue="all" className="relative -top-10">
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
  );
};
