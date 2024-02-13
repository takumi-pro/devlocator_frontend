import { axiosInstance } from "@/config/axios";
import { ENDPOINT } from "@/const/api";

/**
 * GET
 */
export async function GET() {
  const result = await axiosInstance.get(ENDPOINT.EVENT);
  return Response.json({ ...result.data });
}
