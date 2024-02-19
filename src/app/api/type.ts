export type EventDetailParmas = {
  params: {
    eventId: string;
  };
};

export type IsBookmarkedParams = {
  params: {
    eventId: string;
    userId: string;
  };
};

export type FetchBookmarkedEventParams = {
  params: {
    userId: string;
  };
};
