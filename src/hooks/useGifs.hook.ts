import { useEffect, useReducer } from "react";

import { GIF, Params } from "../common.types";
import { useIntersect } from "../hooks";
import { getGifs } from "../services";
import { ACTIONS, STATUS } from "../utils";

const API_KEY = process.env.REACT_APP_API_KEY as string;

export type AppState = {
  gifs: null | GIF[] | [];
  status: keyof typeof STATUS;
  error: string | null;
  query?: string;
};

export type ACTIONTYPE =
  | { type: typeof ACTIONS.SET_LOADING }
  | { type: typeof ACTIONS.SET_DATA; payload: { data: GIF[] | [] } }
  | { type: typeof ACTIONS.SET_ERROR; payload: { message: string } }
  | { type: typeof ACTIONS.LOAD_MORE }
  | { type: typeof ACTIONS.SET_LOAD_MORE_DATA; payload: { data: GIF[] | [] } }
  | { type: typeof ACTIONS.LOAD_MORE_ERROR; payload: { message: string } }
  | { type: typeof ACTIONS.SET_QUERY; payload: { query: string } };

const initialState: AppState = {
  status: "IDLE",
  gifs: null,
  error: "",
};

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, status: STATUS.LOADING };
    case ACTIONS.SET_DATA:
      return {
        ...state,
        status: STATUS.RESOLVED,
        gifs: action.payload.data,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        status: STATUS.REJECTED,
        error: action.payload.message,
      };
    case ACTIONS.LOAD_MORE:
      return { ...state, status: STATUS.LOAD_MORE };
    case ACTIONS.SET_LOAD_MORE_DATA:
      const gifs = state.gifs
        ? [...state.gifs, ...action.payload.data]
        : action.payload.data;
      return { ...state, status: STATUS.RESOLVED, gifs };
    case ACTIONS.LOAD_MORE_ERROR:
      return {
        ...state,
        status: STATUS.LOAD_MORE_ERROR,
        error: action.payload.message,
      };
    case ACTIONS.SET_QUERY:
      return {
        ...state,
        query: action.payload.query,
      };
    default:
      return state;
  }
}

function useGifs(url: string) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [containerRef, isVisible] = useIntersect();
  const offset = state.gifs?.length ? state.gifs.length : 0;

  useEffect(() => {
    console.log({ offset });

    if (!isVisible) {
      return;
    }

    dispatch({ type: ACTIONS.LOAD_MORE });

    const params: Params = {
      api_key: API_KEY,
      limit: 10,
      rating: "g",
    };

    if (state.query) {
      params.q = state.query;
    }

    getGifs(url, { ...params, offset })
      .then((res) => {
        if ("gifs" in res) {
          dispatch({
            type: ACTIONS.SET_LOAD_MORE_DATA,
            payload: { data: res.gifs },
          });
          return;
        }
        throw new Error(res.message || "unhandled error has occurred");
      })
      .catch((err: Error) => {
        dispatch({
          type: ACTIONS.LOAD_MORE_ERROR,
          payload: { message: err.message },
        });
      });
  }, [url, isVisible, offset, state.query]);

  return [state, dispatch, containerRef] as const;
}

export { useGifs };
