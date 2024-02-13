import { axiosInstance } from "@/config/axios";
import { ENDPOINT } from "@/const/api";

import { EventDetailParmas } from "../../type";

/**
 * GET
 * @param request request
 * @param params params
 */
export async function GET(request: Request, { params }: EventDetailParmas) {
  const result = await axiosInstance.get(`${ENDPOINT.EVENT}/${params.eventId}`);
  return Response.json({ events: result.data });
}
