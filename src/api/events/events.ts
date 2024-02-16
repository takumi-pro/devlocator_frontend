import { nextApiInstance } from "@/config/axios";
import { buildQueryString } from "@/utils/params";

import { EventParams, EventResponse } from "./type";

/**
 * fetchEvents
 * @param queryParams クエリパラメータオブジェクト
 */
export const fetchEvents = async (
  queryParams: EventParams
): Promise<EventResponse> => {
  const queryString = buildQueryString(queryParams);
  const result = await nextApiInstance.get<EventResponse>(
    `/api/events${queryString}`
  );
  return result.data;
};
