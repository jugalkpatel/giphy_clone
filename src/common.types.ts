export type GIF = {
  id: string;
  title?: string;
  img: {
    height: string;
    width: string;
    url: string;
  };
};

export type Gifs = {
  gifs: GIF[] | [];
};

export type Params = {
  api_key: string;
  limit: number;
  rating: string;
  q?: string;
  offset?: number;
};


export type ServerError = {
  success: boolean;
  message: string;
};
