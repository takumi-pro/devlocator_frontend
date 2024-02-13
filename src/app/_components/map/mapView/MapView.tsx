"use client";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import {
  AttributionControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import MaekerClusterGroup from "react-leaflet-cluster";

import { Event } from "@/api/events/type";

const markerIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

/**
 * Leafletで地図を表示する
 */
const MapView = ({ events }: { events: Event[] }) => {
  const lat = 139.7668576;
  const lon = 35.6810436;

  return (
    <MapContainer
      center={[lon, lat]}
      zoom={10}
      attributionControl={false}
      zoomControl={false}
      style={{
        height: "calc(100vh - 56px)",
        width: "100%",
        zIndex: "1",
      }}
    >
      <TileLayer
        className="flex justify-start"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
      />

      <AttributionControl prefix={false} position="bottomleft" />
      <ZoomControl position="bottomleft" />

      {/* TODO: マーカーの先端が目的地からずれている問題の解消 */}
      <MaekerClusterGroup chunkedLoading>
        {events.length &&
          events.map((event) => (
            <Marker
              key={event.eventId}
              icon={markerIcon}
              position={[Number(event.lat), Number(event.lon)]}
            >
              <Popup>test</Popup>
            </Marker>
          ))}
      </MaekerClusterGroup>
    </MapContainer>
  );
};

export default MapView;
