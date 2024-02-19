import { IsBookmarkedParams } from "@/app/api/type";
import { prisma } from "@/config/prisma";

/**
 * GET
 * @param request request
 */
export async function GET(request: Request, { params }: IsBookmarkedParams) {
  const bookmarkedEvent = await prisma.bookmarked_events.findFirst({
    where: { eventId: Number(params.eventId), userId: params.userId },
  });

  return Response.json({ isBookmarked: Boolean(bookmarkedEvent) });
}
