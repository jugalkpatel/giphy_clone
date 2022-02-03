import axios, { AxiosError } from "axios";
import { Gifs, Params, SearchParams } from "../common.types";
import { createError } from "../utils";

export type ServerError = {
  success: false;
  msg: string;
};

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

    const gifs = response.data.map((gif: any) => {
      if (!gif.id || !gif.title || !gif.images.downsized) {
        throw createError(
          "INCOMPLETE_RESPONSE",
          "error occurred while fetching data !"
        );
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
    if (error instanceof Error && error.name === "INCOMPLETE_RESPONSE") {
      return { success: false, msg: error.message };
    }

    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ServerError>;

      if (serverError && serverError?.response) {
        return { success: false, msg: serverError.response.data.msg };
      }
    }

    return { success: false, msg: "something went wrong! please refresh" };
  }
}

export { getGifs };
