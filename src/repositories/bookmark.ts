import { Event } from "@/api/events/type";
import { prisma } from "@/config/prisma";

/**
 * ブックマーク作成
 * @param userId ユーザID
 * @param event イベント情報
 */
export const createBookmark = (userId: string, event: Event) => {
  return prisma.bookmarked_events.create({
    data: {
      eventId: event.eventId,
      userId,
      eventUrl: event.eventUrl,
      title: event.title,
      description: event.description,
      lat: event.lat,
      lon: event.lon,
      startedAt: event.startedAt,
      endedAt: event.endedAt,
      address: event.address,
      place: event.place,
      accepted: event.accepted,
      waiting: event.waiting,
      limit: event.limit,
    },
  });
};

/**
 * ブックマーク削除
 * @param eventId イベントID
 * @param userId ユーザID
 */
export const deleteBookmark = (eventId: number, userId: string) => {
  return prisma.bookmarked_events.delete({
    where: { eventId, userId },
  });
};

/**
 * ブックマーク取得
 * @param eventId イベントID
 * @param userId ユーザID
 */
export const findBookmark = (eventId: number, userId: string) => {
  return prisma.bookmarked_events.findFirst({
    where: {
      eventId,
      userId,
    },
  });
};
