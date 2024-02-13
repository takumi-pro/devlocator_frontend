"use client";

import { useState } from "react";

import { Event, EventResponse } from "@/api/events/type";
import Map from "@/app/_components/map/map/Map";
import { Filter } from "@/ui/filter/Filter";

import { DrawerWrapper, Sidebar } from "../..";

/**
 * EventContainer
 */
export const EventContainer = ({ eventData }: { eventData: EventResponse }) => {
  const [eventDataState, setEventDataState] = useState(eventData);
  const [eventDetail, setEventDetail] = useState<Event | undefined>();
  return (
    <>
      <Map
        eventDetail={eventDetail}
        events={eventDataState.events}
        setEventDetail={setEventDetail}
      />
      <Sidebar
        events={eventDataState.events}
        resultReturned={eventDataState.resultsReturned}
        eventDetail={eventDetail}
      />
      <Filter events={eventDataState.events} setEventData={setEventDataState} />
      <DrawerWrapper />
    </>
  );
};
