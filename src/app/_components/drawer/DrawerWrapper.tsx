"use client";

import L from "leaflet";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { useMap } from "react-leaflet";

import { Event } from "@/api/events/type";
import { Accordion } from "@/components/ui/accordion";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MAP } from "@/const/map";
import { AccordionCard } from "@/ui/card";

type Props = {
  events: Event[];
  resultReturned: number;
  eventDetail?: Event;
  popup: L.Popup;
};

/**
 * ドロワー
 */
export const DrawerWrapper = ({
  events,
  resultReturned,
  eventDetail,
  popup,
}: Props) => {
  const [open, setIsOpen] = useState(false);
  const map = useMap();
  const onOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const zoom = 15;
  const locateEvent = (lng: number, lat: number, popupContent: string) => {
    map.flyTo([lat, lng], zoom, { duration: 1.8 });
    const targetPopup = popup.setLatLng([lat, lng]).setContent(popupContent);
    map.openPopup(targetPopup);
  };

  return (
    <div className="absolute right-3 top-3 z-sidebar-z block h-sidebar mobile:hidden">
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
                {events &&
                  events.length <= MAP.DISPLAY_THAN &&
                  events.map((event) => (
                    <AccordionCard
                      isBorder
                      isShadow={false}
                      key={event.eventId}
                      event={event}
                      eventDetail={eventDetail}
                      isSelected={false}
                      handleClick={() =>
                        locateEvent(
                          Number(event.lon),
                          Number(event.lat),
                          `${event.address} ${event.place}`
                        )
                      }
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
