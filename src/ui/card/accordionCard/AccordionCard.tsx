"use client";

import { format } from "date-fns";
import parse from "html-react-parser";
import Link from "next/link";
import { useRef } from "react";
import { FaRegBookmark, FaRegUser } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { VscLinkExternal } from "react-icons/vsc";

import { Event } from "@/api/events/type";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  event: Event;
  isBorder?: boolean;
  isShadow?: boolean;
  handleClick?: () => void;
};

/**
 * イベント情報を表示するカード
 */
export const AccordionCard = ({
  event,
  isBorder = false,
  isShadow = true,
  handleClick,
}: Props) => {
  const accordionRef = useRef<HTMLButtonElement>(null);

  const toggleAccordion = () => {
    if (
      handleClick &&
      accordionRef &&
      accordionRef.current?.ariaExpanded === "false"
    )
      handleClick();
  };
  // const doggleAccordion = () => {
  //   if (accordionRef.current) {
  //     const isOpen = accordionRef.current.ariaExpanded === "true";
  //     const dataState = isOpen ? "open" : "closed";
  //     accordionRef.current.setAttribute("data-state", dataState);
  //   }
  // }
  // const closeAccordion = () => {
  //   if (accordionRef.current) {
  //     accordionRef.current.setAttribute("data-state", "closed");
  //   }
  // }

  return (
    <Card
      className={`${isBorder && "border border-custom-sub"} ${
        isShadow && "shadow-lg"
      } relative`}
      onClick={toggleAccordion}
    >
      <AccordionItem value={`item-${event.eventId.toString()}`}>
        <AccordionTrigger ref={accordionRef} className="w-full">
          <div className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-bookmark-primary bg-transparent">
            <FaRegBookmark className="text-lg text-bookmark-primary" />
          </div>
          <CardHeader>
            <CardTitle className="w-11/12 text-base">{event.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex flex-col gap-y-1.5">
              <div className="flex items-center justify-start gap-2 text-sm text-custom-gray-7070">
                <IoCalendarOutline className="text-lg" />
                {format(event.startedAt, "yyy年MM月dd日 HH:mm~")}
              </div>
              <div className="flex items-center justify-start gap-2 text-sm text-custom-gray-7070">
                <LiaMapMarkerAltSolid className="text-2xl" />
                {event.address}
              </div>
              <div className="flex items-center justify-start gap-2 text-sm text-custom-gray-7070">
                <FaRegUser />
                {event.waiting}/{event.limit}
              </div>
            </div>
          </CardContent>
        </AccordionTrigger>
        <AccordionContent>
          <div className="text-base font-bold">イベント概要</div>
          {typeof event.description === "string" ? (
            parse(event.description)
          ) : (
            <p className="text-sm text-custom-gray-7070">
              概要が正しく表示できませんでした
            </p>
          )}
          <div className="mt-3 text-base font-bold">アクセス</div>
          <p className="text-sm text-custom-gray-7070">
            {event.address} {event.place}
          </p>
          <Link
            href={event.eventUrl}
            target="_blank"
            className="mt-3 flex h-10 w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-bookmark-primary text-sm text-custom-fontcolor transition-all hover:bg-custom-sub"
          >
            詳しくみる
            <VscLinkExternal />
          </Link>
        </AccordionContent>
      </AccordionItem>
    </Card>
  );
};
