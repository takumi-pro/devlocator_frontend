"use client";

import L from "leaflet";
import { Session } from "next-auth";
import { useRef, useState } from "react";
import { IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { useMap } from "react-leaflet";

import { BookmarkedEvent, Event } from "@/api/events/type";
import { Accordion } from "@/components/ui/accordion";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { nextApiInstance } from "@/config/axios";
import { MAP } from "@/const/map";
import { AccordionCard } from "@/ui/card";

type Props = {
  events: Event[];
  resultReturned: number;
  eventDetail?: Event;
  popup: L.Popup;
  toggleBookmark: (event: Event, userId: string) => Promise<void>;
  session: Session | undefined;
};

/**
 * イベント情報を表示するサイドバー
 */
export const Sidebar = ({
  events,
  resultReturned,
  eventDetail,
  popup,
  toggleBookmark,
  session,
}: Props) => {
  const map = useMap();
  const accordionRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [bookmarkedEvents, setBookmarkedEvents] = useState<BookmarkedEvent[]>();

  const onOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setOpenDrawer(true);
    } else {
      setOpenDrawer(false);
    }
  };

  const zoom = 15;
  const locateEvent = (lng: number, lat: number, popupContent: string) => {
    map.flyTo([lat, lng], zoom, { duration: 1.8 });
    const targetPopup = popup.setLatLng([lat, lng]).setContent(popupContent);
    map.openPopup(targetPopup);
  };

  // ブックマークしたイベント取得
  const fetchBookmarkedEvent = async () => {
    if (!session || !session.user) return;
    const bookmarkedEvents = await nextApiInstance.get(
      `/api/users/${session.user.id}/events`
    );
    setBookmarkedEvents(bookmarkedEvents.data.bookmarkedEvents);
  };

  return (
    <>
      {/******************
       * sidebar
       ********************/}
      <div
        className={`${
          !open ? "translate-x-sidebar-small tablet:translate-x-sidebar" : ""
        } absolute right-0 top-0 z-sidebar-z hidden h-sidebar w-sidebar-small bg-sidebar p-3 shadow-lg transition-all duration-200 mobile:block tablet:w-sidebar`}
        onMouseEnter={() => map.scrollWheelZoom.disable()}
        onMouseLeave={() => map.scrollWheelZoom.enable()}
      >
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="relative right-12 flex h-10 w-9 cursor-pointer items-center justify-center rounded-l-lg bg-white"
        >
          <IoIosArrowForward className={`${!open && "rotate-180"}`} />
        </div>
        <Tabs defaultValue="all" className="relative -top-10">
          <TabsList className="shadow-lg">
            <TabsTrigger value="all">すべてのイベント</TabsTrigger>
            <TabsTrigger onClick={fetchBookmarkedEvent} value="bookmark">
              ブックマークしたイベント
            </TabsTrigger>
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
              className="mt-3 flex h-sidebar-content flex-col gap-y-3 overflow-y-scroll scroll-smooth"
              type="single"
              collapsible
              ref={accordionRef}
            >
              {eventDetail && events.length > MAP.DISPLAY_THAN && (
                <AccordionCard
                  handleClick={() =>
                    locateEvent(
                      Number(eventDetail.lon),
                      Number(eventDetail.lat),
                      `${eventDetail.address} ${eventDetail.place}`
                    )
                  }
                  isSelected
                  event={eventDetail}
                  toggleBookmark={toggleBookmark}
                  session={session}
                />
              )}
              {events &&
                events.length <= MAP.DISPLAY_THAN &&
                events.map((event) => (
                  <AccordionCard
                    key={event.eventId}
                    event={event}
                    eventDetail={eventDetail}
                    accordionContainerRef={accordionRef}
                    isSelected={event.eventId == eventDetail?.eventId}
                    handleClick={() =>
                      locateEvent(
                        Number(event.lon),
                        Number(event.lat),
                        `${event.address} ${event.place}`
                      )
                    }
                    session={session}
                    toggleBookmark={toggleBookmark}
                  />
                ))}
              {!(events.length <= MAP.DISPLAY_THAN) && !eventDetail && (
                <p className="text-sm text-slate-500">
                  イベントを100件以下に絞り込むと表示されます
                </p>
              )}
            </Accordion>
          </TabsContent>
          <TabsContent value="bookmark">
            <div className="mt-6 text-sm text-slate-500">
              {!session?.user && "ブックマークするにはログインが必要です"}
              {session?.user && Boolean(bookmarkedEvents?.length) && (
                <>
                  <span className="mr-1 font-bold text-custom-fontcolor">
                    {bookmarkedEvents?.length}
                  </span>
                  件がブックマークされています
                </>
              )}
              {session?.user &&
                Boolean(!bookmarkedEvents?.length) &&
                "ブックマークしたイベントはありません"}
            </div>
            <Accordion
              className="mt-3 flex h-sidebar-content flex-col gap-y-3 overflow-y-scroll scroll-smooth"
              type="single"
              collapsible
              ref={accordionRef}
            >
              {bookmarkedEvents &&
                bookmarkedEvents.map((event) => (
                  <AccordionCard
                    key={event.eventId}
                    event={event}
                    eventDetail={eventDetail}
                    accordionContainerRef={accordionRef}
                    isSelected={event.eventId == eventDetail?.eventId}
                    handleClick={() =>
                      locateEvent(
                        Number(event.lon),
                        Number(event.lat),
                        `${event.address} ${event.place}`
                      )
                    }
                    session={session}
                    toggleBookmark={toggleBookmark}
                  />
                ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>

      {/******************
       * drawer
       ********************/}
      <div className="absolute right-3 top-3 z-sidebar-z block h-sidebar mobile:hidden">
        <Drawer
          shouldScaleBackground
          open={openDrawer}
          onOpenChange={onOpenChange}
        >
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
                  <span className="mr-1 font-bold text-custom-fontcolor">
                    {resultReturned}
                  </span>
                  件がマップに表示されています
                </div>
                <Accordion
                  className="flex h-full flex-col gap-y-3 overflow-y-scroll pt-3"
                  type="single"
                  collapsible
                >
                  {/* TODO: sidebarと共通なのでコンポーネント化する */}
                  {eventDetail && events.length > MAP.DISPLAY_THAN && (
                    <AccordionCard
                      handleClick={() =>
                        locateEvent(
                          Number(eventDetail.lon),
                          Number(eventDetail.lat),
                          `${eventDetail.address} ${eventDetail.place}`
                        )
                      }
                      isSelected
                      event={eventDetail}
                      toggleBookmark={toggleBookmark}
                      session={session}
                    />
                  )}
                  {events &&
                    events.length <= MAP.DISPLAY_THAN &&
                    events.map((event) => (
                      <AccordionCard
                        key={event.eventId}
                        event={event}
                        eventDetail={eventDetail}
                        accordionContainerRef={accordionRef}
                        isSelected={event.eventId == eventDetail?.eventId}
                        handleClick={() =>
                          locateEvent(
                            Number(event.lon),
                            Number(event.lat),
                            `${event.address} ${event.place}`
                          )
                        }
                        session={session}
                        toggleBookmark={toggleBookmark}
                      />
                    ))}
                  {!(events.length <= MAP.DISPLAY_THAN) && !eventDetail && (
                    <p className="text-sm text-slate-500">
                      イベントを100件以下に絞り込むと表示されます
                    </p>
                  )}
                </Accordion>
              </TabsContent>
              <TabsContent
                className="h-sidebar-content min-h-sidebar-content"
                value="bookmark"
              >
                <div className="text-sm text-slate-500">
                  {!session?.user && "ブックマークするにはログインが必要です"}
                  {session?.user && Boolean(bookmarkedEvents?.length) && (
                    <>
                      <span className="mr-1 font-bold text-custom-fontcolor">
                        {bookmarkedEvents?.length}
                      </span>
                      件がブックマークされています
                    </>
                  )}
                  {session?.user &&
                    Boolean(!bookmarkedEvents?.length) &&
                    "ブックマークしたイベントはありません"}
                </div>
                <Accordion
                  className="mt-3 flex h-sidebar-content flex-col gap-y-3 overflow-y-scroll scroll-smooth"
                  type="single"
                  collapsible
                  ref={accordionRef}
                >
                  {bookmarkedEvents &&
                    bookmarkedEvents.map((event) => (
                      <AccordionCard
                        key={event.eventId}
                        event={event}
                        eventDetail={eventDetail}
                        accordionContainerRef={accordionRef}
                        isSelected={event.eventId == eventDetail?.eventId}
                        handleClick={() =>
                          locateEvent(
                            Number(event.lon),
                            Number(event.lat),
                            `${event.address} ${event.place}`
                          )
                        }
                        session={session}
                        toggleBookmark={toggleBookmark}
                      />
                    ))}
                </Accordion>
              </TabsContent>
            </Tabs>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};
