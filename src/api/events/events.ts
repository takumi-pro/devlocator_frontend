import { nextApiInstance } from "@/config/axios";

import { EventResponse } from "./type";

/**
 * fetchEvents
 */
export const fetchEvents = async (): Promise<EventResponse> => {
  const result = await nextApiInstance.get<EventResponse>("/api/events");
  return result.data;
};
