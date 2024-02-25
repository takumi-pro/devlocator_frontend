"use client";

import { format } from "date-fns";
import parse from "html-react-parser";
import { Session } from "next-auth";
import Link from "next/link";
import { RefObject, useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { VscLinkExternal } from "react-icons/vsc";

import { Event } from "@/api/events/type";
import { SigninDialog } from "@/app/_components/dialog/signinDialog/SigninDialog";
import { Bookmark } from "@/app/_components/icons";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { nextApiInstance } from "@/config/axios";

type Props = {
  event: Event;
  eventDetail?: Event;
  isBorder?: boolean;
  isShadow?: boolean;
  handleClick?: () => void;
  accordionContainerRef?: RefObject<HTMLDivElement>;
  isSelected: boolean;
  toggleBookmark: (event: Event, userId: string) => Promise<void>;
  session: Session | undefined;
};

/**
 * イベント情報を表示するカード
 */
export const AccordionCard = ({
  event,
  isBorder = false,
  isShadow = true,
  isSelected = false,
  eventDetail,
  handleClick,
  accordionContainerRef,
  toggleBookmark,
  session,
}: Props) => {
  const [isBookmarkState, setIsBookmarkState] = useState(false);
  const [openSigninDialog, setOpenSigninDialog] = useState(false);

  const clickBookmark = async () => {
    if (!session || !session?.user) {
      setOpenSigninDialog(true);
      return;
    }
    await toggleBookmark(event, session.user.id);
    const response = await nextApiInstance.get(
      `/api/users/${session.user.id}/events/${event.eventId}/isBookmarked`
    );
    setIsBookmarkState(response.data.isBookmarked);
  };

  useEffect(() => {
    const fetchBookmarkState = async () => {
      // TODO: 別ファイルで型定義する
      if (!session || !session.user) return;
      const response = await nextApiInstance.get(
        `/api/users/${session.user.id}/events/${event.eventId}/isBookmarked`
      );
      setIsBookmarkState(response.data.isBookmarked);
    };

    fetchBookmarkState();
  }, [event.eventId, session]);

  const accordionRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (
      eventDetail &&
      cardRef.current &&
      accordionContainerRef?.current &&
      eventDetail.eventId === event.eventId
    ) {
      const topMargin = 96;
      accordionContainerRef.current.scrollTop =
        cardRef.current.offsetTop - topMargin;
    }
  }, [eventDetail, event.eventId, accordionContainerRef]);

  return (
    <div className="relative" ref={cardRef}>
      <SigninDialog
        text="イベントをブックマークするにはログインが必要です！"
        open={openSigninDialog}
        setOpen={setOpenSigninDialog}
      />
      <Bookmark clickBookmark={clickBookmark} isBookmark={isBookmarkState} />
      <Card
        className={`${isBorder && "border"} ${isShadow && "shadow-lg"} ${
          isSelected ? "border-custom-main" : "border-custom-sub"
        } relative`}
        onClick={toggleAccordion}
      >
        <AccordionItem
          className={`rounded-2xl border ${isSelected && "border-custom-main"}`}
          value={`item-${event.eventId.toString()}`}
        >
          <AccordionTrigger ref={accordionRef} className="w-full">
            {/* TODO: componentで管理（bookmark） */}
            {/* <div
              onClick={clickBookmark}
              className="absolute right-3 top-3 z-sidebar-z flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-bookmark-primary bg-transparent"
            >
              {!isBookmarkState && (
                <FaRegBookmark className="text-lg text-bookmark-primary" />
              )}
              {isBookmarkState && (
                <FaBookmark className="text-lg text-bookmark-primary" />
              )}
            </div> */}
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
                  {event.accepted}/{event.limit}
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
              href={event.eventUrl ? event.eventUrl : "/"}
              target="_blank"
              className={`${
                !event.eventUrl && "pointer-events-none"
              } mt-3 flex h-10 w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-bookmark-primary text-sm text-custom-fontcolor transition-all hover:bg-custom-sub`}
            >
              詳しくみる
              <VscLinkExternal />
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Card>
    </div>
  );
};
