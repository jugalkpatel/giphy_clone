import axios, { AxiosError } from "axios";

import { Gifs, Params, SearchParams, ServerError } from "../common.types";
import { createError } from "../utils";

async function getGifs(
  url: string,
  params: Params | SearchParams
): Promise<Gifs | ServerError> {
  try {
    const { data: response } = await axios.get(url, { params });

    if (!("data" in response)) {
      throw createError(
        "INCOMPLETE_RESPONSE",
        "error occurred while fetching data !"
      );
    }

    if (!response.data.length) {
      console.log("emtpy");
      return { gifs: [] };
    }

    const gifs = response.data.map((gif: any) => {
      if (!gif.id || !gif.images.downsized) {
        throw new Error();
      }

      return {
        id: gif.id,
        title: gif.title,
        img: {
          height: gif.images.downsized.height,
          width: gif.images.downsized.width,
          url: gif.images.downsized.url,
        },
      };
    });

    return { gifs };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;

      if (serverError && serverError?.response) {
        return { success: false, message: serverError.response.data.message };
      }
    }

    return { success: false, message: "something went wrong! please refresh" };
  }
}

export { getGifs };
