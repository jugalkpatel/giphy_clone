import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";

import {
  ContentHeader,
  MessageContainer,
  ErrorIcon,
  Message,
} from "../../styles/common.styles";

import { Gif } from "../../components";
import { useGifs } from "../../hooks";
import { getGifs } from "../../services";
import { ACTIONS, STATUS } from "../../utils";

const URL = process.env.REACT_APP_SEARCH_URL as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;

function SearchResults() {
  const { query } = useParams();
  const [state, dispatch] = useGifs(URL, {
    api_key: API_KEY,
    limit: 10,
    rating: "g",
    q: query,
  });

  const override = `
    grid-row: 1 / -1;
    grid-column: 1 / -1;
  `;

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_LOADING });

    getGifs(URL, { api_key: API_KEY, limit: 10, rating: "g", q: query })
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
  }, [query, dispatch]);

  if (state.status === STATUS.LOADING || state.status === STATUS.IDLE) {
    return <HashLoader loading={true} css={override} size={75} color="#FFF" />;
  }

  if (state.status === STATUS.RESOLVED && state.gifs) {
    if (!state.gifs.length) {
      return (
        <MessageContainer>
          <Message>No GIFs found for {query}</Message>
        </MessageContainer>
      );
    }

    return (
      <>
        <ContentHeader>{query}</ContentHeader>
        {state.gifs.map(({ id, img, title }) => {
          return <Gif key={id} id={id} title={title} img={img} />;
        })}
      </>
    );
  }

  if (state.status === STATUS.REJECTED) {
    return (
      <MessageContainer>
        <ErrorIcon />
        <Message>OOPS SOMETHING WENT WRONG PLEASE REFRESH !</Message>
      </MessageContainer>
    );
  }

  return <>{null}</>;
}

export { SearchResults };
