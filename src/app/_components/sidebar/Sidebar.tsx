"use client";

import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import { Event } from "@/api/events/type";
import { Accordion } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccordionCard } from "@/ui/card";

type Props = {
  events: Event[];
  resultReturned: number;
  eventDetail?: Event;
};

/**
 * イベント情報を表示するサイドバー
 */
export const Sidebar = ({ events, resultReturned, eventDetail }: Props) => {
  const lessThan = 100;
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
            <span className="mr-1 font-bold text-custom-fontcolor">
              {resultReturned}
            </span>
            件がマップに表示されています
          </div>
          <Accordion
            className="mt-3 flex h-sidebar-content flex-col gap-y-3 overflow-scroll"
            type="single"
            collapsible
          >
            {eventDetail && (
              <AccordionCard key={eventDetail.eventId} event={eventDetail} />
            )}
            {events &&
              events.length <= lessThan &&
              events.map((event) => (
                <AccordionCard key={event.eventId} event={event} />
              ))}
            {!(events.length <= lessThan) && !eventDetail && (
              <p className="text-sm text-slate-500">
                イベントを100件以下に絞り込むと表示されます
              </p>
            )}
          </Accordion>
        </TabsContent>
        <TabsContent value="bookmark">bookmark events</TabsContent>
      </Tabs>
    </div>
  );
};
