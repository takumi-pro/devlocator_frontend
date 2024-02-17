import { fetchEvents } from "@/api/events/events";

import { EventContainer } from "./_components/container/eventContainer/EventContainer";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

/**
 * Home
 */
const Home = async ({ searchParams }: Props) => {
  const eventData = await fetchEvents(searchParams);
  return (
    <main className="relative">
      <EventContainer eventData={eventData} />
    </main>
  );
};

export default Home;
