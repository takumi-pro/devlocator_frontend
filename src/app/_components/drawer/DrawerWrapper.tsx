"use client";

import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

import { Accordion } from "@/components/ui/accordion";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
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
 * ドロワー
 */
export const DrawerWrapper = () => {
  const [open, setIsOpen] = useState(false);
  const onOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  return (
    <div className="absolute right-3 top-3 z-10 block mobile:hidden">
      <Drawer shouldScaleBackground open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger className="relative top-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-white">
          <IoIosArrowUp />
        </DrawerTrigger>
        <DrawerContent className="px-3">
          <Tabs defaultValue="all">
            <TabsList className="border border-custom-sub">
              <TabsTrigger value="all">すべてのイベント</TabsTrigger>
              <TabsTrigger value="bookmark">
                ブックマークしたイベント
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="all"
              className="h-sidebar-content min-h-sidebar-content"
            >
              {/* TODO: UIに切り出す */}
              <div className="text-sm text-slate-500">
                <span className="mr-1 font-bold text-custom-fontcolor">99</span>
                件表示されています
              </div>
              <Accordion
                className="flex flex-col gap-y-3 overflow-scroll pt-3"
                type="single"
                collapsible
              >
                {events.map((event) => (
                  <AccordionCard
                    isBorder
                    isShadow={false}
                    key={event.id}
                    event={event}
                  />
                ))}
              </Accordion>
            </TabsContent>
            <TabsContent
              className="h-sidebar-content min-h-sidebar-content"
              value="bookmark"
            >
              bookmark events
            </TabsContent>
          </Tabs>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
