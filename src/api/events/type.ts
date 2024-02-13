export type Event = {
  eventId: string;
  title: string;
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

export type EventResponse = {
  resultsReturned: number;
  events: Event[];
};
