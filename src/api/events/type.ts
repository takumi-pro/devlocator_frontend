export type Event = {
  eventId: number;
  title: string;
  description: string;
  eventUrl: string;
  startedAt: string;
  endedAt: string;
  limit: number;
  accepted: number;
  waiting: number;
  updatedAt: string;
  place: string;
  address: string;
  lat: string;
  lon: string;
};

export type BookmarkedEvent = {
  eventId: number;
  userId: string;
  title: string;
  description: string;
  eventUrl: string;
  startedAt: string;
  endedAt: string;
  limit: number;
  accepted: number;
  waiting: number;
  updatedAt: string;
  place: string;
  address: string;
  lat: string;
  lon: string;
};

export type EventParams = {
  keyword?: string;
  date?: string;
  prefecture?: string;
};

export type EventResponse = {
  resultsReturned: number;
  events: Event[];
};
