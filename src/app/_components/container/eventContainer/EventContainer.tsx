import { Event, EventResponse } from "@/api/events/type";
import Map from "@/app/_components/map/map/Map";
import {
  createBookmark,
  deleteBookmark,
  findBookmark,
} from "@/repositories/bookmark";
import { Filter } from "@/ui/filter/Filter";
import { getSession } from "@/utils/session";

type Props = {
  eventData: EventResponse;
};

/**
 * EventContainer
 */
export const EventContainer = async ({ eventData }: Props) => {
  const session = await getSession();

  const toggleBookmark = async (event: Event, userId: string) => {
    "use server";
    const targetBookmarkEvent = await findBookmark(event.eventId, userId);
    if (targetBookmarkEvent) {
      await deleteBookmark(event.eventId, userId);
    } else {
      await createBookmark(userId, event);
    }
  };

  // const isBookmarked = async (eventId: number) => {
  //   "use server";
  //   const bookmarkedEvent = await prisma.bookmarked_events.findFirst({
  //     where: { event_id: eventId },
  //   });
  //   return Boolean(bookmarkedEvent);
  // };

  return (
    <>
      <Map
        session={session}
        events={eventData.events}
        resultReturned={eventData.resultsReturned}
        toggleBookmark={toggleBookmark}
      />
      <Filter />
    </>
  );
};
