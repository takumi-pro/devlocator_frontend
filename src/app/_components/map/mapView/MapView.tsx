"use client";

import L from "leaflet";
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

import { Sidebar } from "../..";

// TODO: 別ファイルで管理
const ICON_SIZE = {
  WIDTH: 40,
  HEIGHT: 40,
};
const SHADOW_ANCHOR = {
  X: 14,
  Y: 40,
};
const ICON_ANCHOR = {
  X: 20,
  Y: 40,
};
const POPUP_ANCHOR = {
  X: 0,
  Y: -40,
};

const markerIcon = L.icon({
  iconUrl: "/icon_blue_1.svg",
  iconSize: [ICON_SIZE.WIDTH, ICON_SIZE.HEIGHT],
  shadowUrl: iconShadow.src,
  // TODO: マジックナンバー修正
  iconAnchor: [ICON_ANCHOR.X, ICON_ANCHOR.Y],
  shadowAnchor: [SHADOW_ANCHOR.X, SHADOW_ANCHOR.Y],
  popupAnchor: [POPUP_ANCHOR.X, POPUP_ANCHOR.Y],
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
      {/* TODO: コンポーネント名変更 - サイドバーだけでなくDrawerもあるため */}
      <Sidebar
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
