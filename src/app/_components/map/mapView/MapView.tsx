"use client";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { Session } from "next-auth";
import { useState } from "react";
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

import { DrawerWrapper, Sidebar } from "../..";

const markerIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

const popup = L.popup();

type Props = {
  events: Event[];
  resultReturned: number;
  session: Session | undefined;
  toggleBookmark: (event: Event, userId: string) => Promise<void>;
};

/**
 * Leafletで地図を表示する
 */
const MapView = ({
  events,
  resultReturned,
  session,
  toggleBookmark,
}: Props) => {
  // TODO: 別ファイルで管理
  const lat = 139.7668576;
  const lon = 35.6810436;

  const [eventDetail, setEventDetail] = useState<Event | undefined>();

  return (
    <MapContainer
      center={[lon, lat]}
      zoom={10}
      attributionControl={false}
      scrollWheelZoom={false}
      zoomControl={false}
      style={{
        height: "calc(100vh - 56px)",
        width: "100%",
        zIndex: "1",
      }}
    >
      {/****************************
       * サイドバー
       ******************************/}
      <Sidebar
        events={events}
        resultReturned={resultReturned}
        eventDetail={eventDetail}
        popup={popup}
        toggleBookmark={toggleBookmark}
        session={session}
      />
      <DrawerWrapper
        events={events}
        resultReturned={resultReturned}
        eventDetail={eventDetail}
        popup={popup}
        toggleBookmark={toggleBookmark}
        session={session}
      />

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
              eventHandlers={{
                click: () => {
                  if (eventDetail && eventDetail.eventId == event.eventId) {
                    setEventDetail(undefined);
                  } else {
                    setEventDetail(event);
                  }
                },
              }}
            >
              <Popup>
                {event.address}
                <br />
                {event.place}
              </Popup>
            </Marker>
          ))}
      </MaekerClusterGroup>
    </MapContainer>
  );
};

export default MapView;
