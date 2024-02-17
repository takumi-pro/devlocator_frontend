import { type NextRequest } from "next/server";

import { axiosInstance } from "@/config/axios";
import { ENDPOINT } from "@/const/api";
import { buildQueryString } from "@/utils/params";

/**
 * GET
 * @param req req
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("keyword");
  const date = searchParams.get("date");
  const queryString = buildQueryString({ keyword, date });
  const result = await axiosInstance.get(`${ENDPOINT.EVENT}${queryString}`);
  return Response.json({ ...result.data });
}
