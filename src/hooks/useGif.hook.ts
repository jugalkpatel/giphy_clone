import { useEffect, useRef, useReducer } from "react";

import { GIF, Params, SearchParams } from "../common.types";
import { getGifs } from "../services";
import { ACTIONS, STATUS } from "../utils";

export type AppState = {
  gifs: null | GIF[] | [];
  status: keyof typeof STATUS;
  error: string | null;
};

export type ACTIONTYPE =
  | { type: typeof ACTIONS.SET_LOADING }
  | { type: typeof ACTIONS.SET_DATA; payload: { data: GIF[] | [] } }
  | { type: typeof ACTIONS.SET_ERROR; payload: { message: string } };

const initialState: AppState = { status: "IDLE", gifs: null, error: "" };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, status: STATUS.LOADING };
    case ACTIONS.SET_DATA:
      const { data } = action.payload;
      return { ...state, status: STATUS.RESOLVED, gifs: data };
    case ACTIONS.SET_ERROR:
      const { message } = action.payload;
      return { ...state, status: STATUS.REJECTED, error: message };
    default:
      return state;
  }
}

function useGifs(url: string, payload: Params | SearchParams) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stablePayload = useRef(payload);

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_LOADING });
    const params = stablePayload.current;
    getGifs(url, params)
      .then((res) => {
        if ("gifs" in res) {
          dispatch({ type: ACTIONS.SET_DATA, payload: { data: res.gifs } });
          return;
        }

        throw new Error(res.message || "unhandled error has occurred");
      })
      .catch((err: Error) => {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: { message: err.message },
        });
      });
  }, [url]);

  return [state, dispatch] as const;
}

export { useGifs };
