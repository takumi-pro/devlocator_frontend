import "leaflet/dist/leaflet.css";

import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useMemo } from "react";

import { Event } from "@/api/events/type";

type Props = {
  events: Event[];
  eventDetail?: Event;
  setEventDetail: Dispatch<SetStateAction<Event | undefined>>;
};

/**
 * Leafletで地図を表示する
 */
const Map = ({ events, setEventDetail, eventDetail }: Props) => {
  const MapView = useMemo(
    () =>
      dynamic(
        () =>
          import("@/app/_components/map/mapView/MapView").then(
            (module) => module
          ),
        {
          ssr: false,
        }
      ),
    []
  );

  return (
    <MapView
      events={events}
      eventDetail={eventDetail}
      setEventDetail={setEventDetail}
    />
  );
};

export default Map;
