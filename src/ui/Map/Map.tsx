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
} from "react-leaflet";

const markerIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

/**
 * Leafletで地図を表示する
 */
export const Map = () => {
  const lat = 139.7668576;
  const lon = 35.6810436;

  return (
    <MapContainer
      center={[lon, lat]}
      zoom={10}
      style={{
        height: "calc(100vh - 56px)",
        width: "100%",
        zIndex: "1",
      }}
      attributionControl={false}
    >
      <TileLayer
        className="flex justify-start"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
      />
      <AttributionControl position="bottomleft" />
      {/* TODO: マーカーの先端が目的地からずれている問題の解消 */}
      <Marker icon={markerIcon} position={[lon, lat]}>
        <Popup>test</Popup>
      </Marker>
    </MapContainer>
  );
};
