import { HashLoader } from "react-spinners";

import {
  ContentHeader,
  ErrorIcon,
  MessageContainer,
  TrendingIcon,
  Message,
} from "../../styles/common.styles";

import { Gif } from "../../components";
import { useGifs } from "../../hooks";
import { STATUS } from "../../utils";

const URL = process.env.REACT_APP_TRENDING_URL as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;

function Trending() {
  const [state] = useGifs(URL, {
    api_key: API_KEY,
    limit: 10,
    rating: "g",
  });
  const override = `
    grid-row: 1 / -1;
    grid-column: 1 / -1;
  `;

  if (state.status === STATUS.LOADING || state.status === STATUS.IDLE) {
    return <HashLoader loading={true} css={override} size={75} color="#FFF" />;
  }

  if (state.status === STATUS.RESOLVED && state.gifs) {
    if (!state.gifs.length) {
      return (
        <MessageContainer>
          <Message>No GIFs found</Message>
        </MessageContainer>
      );
    }

    return (
      <>
        <ContentHeader>
          <TrendingIcon />
          Trending
        </ContentHeader>
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

export { Trending };
