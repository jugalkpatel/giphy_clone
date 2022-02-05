import { useParams } from "react-router-dom";
import { useGifs } from "../../hooks";
import { STATUS } from "../../utils";

const URL = process.env.REACT_APP_SEARCH_URL as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;

function SearchResults() {
  const { query } = useParams();
  const [state] = useGifs(URL, {
    api_key: API_KEY,
    limit: 10,
    rating: "g",
    q: query,
  });

  if (state.status === STATUS.IDLE || state.status === STATUS.LOADING) {
    return <h1>Loading.......</h1>;
  }

  if (state.status === STATUS.RESOLVED) {
    return <pre>{JSON.stringify(state.gifs, null, 2)}</pre>;
  }
  return <pre>{JSON.stringify(state.error || "unhandled error", null, 2)}</pre>;
}

export { SearchResults };
