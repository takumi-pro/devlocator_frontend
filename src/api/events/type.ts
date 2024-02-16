export type Event = {
  eventId: string;
  title: string;
  description: string;
  eventUrl: string;
  startedAt: string;
  endedAt: string;
  limit: string;
  accepted: string;
  waiting: string;
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
