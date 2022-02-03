export type GIF = {
  id: string;
  title: string;
  img: {
    height: string;
    width: string;
    url: string;
  };
};

export type Gifs = {
  gifs: GIF[];
};

export type Params = {
  api_key: string;
  limit: number;
  rating: string;
};

export type SearchParams = Params & {
  q: string;
};
