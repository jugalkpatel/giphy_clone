import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";

import {
  ContentHeader,
  MessageContainer,
  ErrorIcon,
  Message,
  ContentContainer,
} from "../../styles/common.styles";

import { Params } from "../../common.types";
import { Gif } from "../../components";
import { useGifs } from "../../hooks";
import { getGifs } from "../../services";
import { STATUS, ACTIONS } from "../../utils";

const URL = process.env.REACT_APP_SEARCH_URL as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;

function SearchResults() {
  const { query } = useParams();
  const [state, dispatch, ref] = useGifs(URL);

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_LOADING });

    const params: Params = {
      api_key: API_KEY,
      limit: 10,
      rating: "g",
    };

    if (query) {
      params.q = query;
      dispatch({ type: ACTIONS.SET_QUERY, payload: { query } });
    }

    getGifs(URL, params)
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

  const override = `
    grid-row: 1 / -1;
    grid-column: 1 / -1;
    height: 70vh;
  `;

  const displayElement = () => {
    if (state.status === STATUS.LOADING || state.status === STATUS.IDLE) {
      return (
        <HashLoader loading={true} css={override} size={75} color="#FFF" />
      );
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

    if (state.status === STATUS.LOAD_MORE && state.gifs) {
      return (
        <>
          <ContentHeader>{query}</ContentHeader>
          {state.gifs.map(({ id, img, title }) => {
            return <Gif key={id} id={id} title={title} img={img} />;
          })}
          <HashLoader loading={true} css={override} size={75} color="#FFF" />
        </>
      );
    }

    if (state.status === STATUS.LOAD_MORE_ERROR && state.error && state.gifs) {
      return (
        <>
          <ContentHeader>{query}</ContentHeader>
          {state.gifs.map(({ id, img, title }) => {
            return <Gif key={id} id={id} title={title} img={img} />;
          })}
          <MessageContainer>
            <ErrorIcon />
            <Message>OOPS SOMETHING WENT WRONG PLEASE REFRESH !</Message>
          </MessageContainer>
        </>
      );
    }
  };
  console.log({ state });
  return (
    <div>
      <ContentContainer>
        {displayElement()}

        <section ref={ref}></section>
      </ContentContainer>
    </div>
  );
}

export { SearchResults };
