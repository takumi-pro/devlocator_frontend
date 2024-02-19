import { FetchBookmarkedEventParams } from "@/app/api/type";
import { prisma } from "@/config/prisma";

/**
 * GET
 * @param request request
 */
export async function GET(
  request: Request,
  { params }: FetchBookmarkedEventParams
) {
  const bookmarkedEvents = await prisma.bookmarked_events.findMany({
    where: { userId: params.userId },
  });

  return Response.json({ bookmarkedEvents });
}
