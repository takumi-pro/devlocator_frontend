import "leaflet/dist/leaflet.css";

import { Session } from "next-auth";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Event } from "@/api/events/type";

type Props = {
  events: Event[];
  resultReturned: number;
  session: Session | undefined;
  toggleBookmark: (event: Event, userId: string) => Promise<void>;
};

/**
 * Leafletで地図を表示する
 */
const Map = ({ events, resultReturned, session, toggleBookmark }: Props) => {
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
      session={session}
      events={events}
      resultReturned={resultReturned}
      toggleBookmark={toggleBookmark}
    />
  );
};

export default Map;
