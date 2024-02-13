"use client";

import { useState } from "react";

import { EventResponse } from "@/api/events/type";
import Map from "@/app/_components/map/map/Map";
import { Filter } from "@/ui/filter/Filter";

import { DrawerWrapper, Sidebar } from "../..";

/**
 * EventContainer
 */
export const EventContainer = ({ eventData }: { eventData: EventResponse }) => {
  const [eventDataState, setEventDataState] = useState(eventData);
  return (
    <>
      <Map events={eventDataState.events} />
      <Sidebar
        events={eventDataState.events}
        resultReturned={eventDataState.resultsReturned}
      />
      <Filter events={eventDataState.events} setEventData={setEventDataState} />
      <DrawerWrapper />
    </>
  );
};
