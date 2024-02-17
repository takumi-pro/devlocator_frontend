"use client";

import { useState } from "react";

import { Event, EventResponse } from "@/api/events/type";
import Map from "@/app/_components/map/map/Map";
import { Filter } from "@/ui/filter/Filter";

/**
 * EventContainer
 */
export const EventContainer = ({ eventData }: { eventData: EventResponse }) => {
  const [eventDetail, setEventDetail] = useState<Event | undefined>();
  return (
    <>
      <Map
        eventDetail={eventDetail}
        events={eventData.events}
        setEventDetail={setEventDetail}
        resultReturned={eventData.resultsReturned}
      />
      <Filter />
      {/* <DrawerWrapper
        events={eventData.events}
        resultReturned={eventData.resultsReturned}
        eventDetail={eventDetail}
      /> */}
    </>
  );
};
