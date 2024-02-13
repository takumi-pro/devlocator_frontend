import { fetchEvents } from "@/api/events/events";

import { EventContainer } from "./_components/container/eventContainer/EventContainer";

/**
 * Home
 */
const Home = async () => {
  const eventData = await fetchEvents();
  return (
    <main className="relative">
      <EventContainer eventData={eventData} />
    </main>
  );
};

export default Home;
