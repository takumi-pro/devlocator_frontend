import { Metadata } from "next";

import { fetchEvents } from "@/api/events/events";

import { EventContainer } from "./_components/container/eventContainer/EventContainer";
import Favicon from "./favicon.ico";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  metadataBase: new URL("https://devlocator-frontend.vercel.app"),
  title: "DevLocator",
  description: "エンジニアイベントを地図上で検索できるサービス",
  icons: [{ rel: "icon", url: Favicon.src }],
  openGraph: {
    title: "DevLocator",
  },
  twitter: {
    title: "DevLocator",
    description: "エンジニアイベントを地図上で検索できるサービス",
  },
};

/**
 * Home
 */
const Home = async ({ searchParams }: Props) => {
  const eventData = await fetchEvents(searchParams);
  return (
    <main className="relative h-content">
      <EventContainer eventData={eventData} />
    </main>
  );
};

export default Home;
