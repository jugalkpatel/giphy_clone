import { useGifs } from "../../hooks";
import { ACTIONS, STATUS } from "../../utils";

const URL = process.env.REACT_APP_TRENDING_URL as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;

function Trending() {
  const [state, dispatch] = useGifs(URL, {
    api_key: API_KEY,
    limit: 10,
    rating: "g",
  });

  if (state.status === STATUS.IDLE || state.status === STATUS.LOADING) {
    return <h1>Loading.......</h1>;
  }

  if (state.status === STATUS.RESOLVED) {
    return <pre>{JSON.stringify(state.gifs, null, 2)}</pre>;
  }

  if (state.status === STATUS.REJECTED) {
    return <pre>{JSON.stringify(state.error, null, 2)}</pre>;
  }

  return (
    <button onClick={() => dispatch({ type: ACTIONS.SET_LOADING })}>
      set loading
    </button>
  );
}

export { Trending };
