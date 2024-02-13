import "leaflet/dist/leaflet.css";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Event } from "@/api/events/type";

type Props = {
  events: Event[];
};

/**
 * Leafletで地図を表示する
 */
const Map = ({ events }: Props) => {
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

  return <MapView events={events} />;
};

export default Map;
