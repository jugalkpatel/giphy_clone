import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages";
import { Trending, SearchResults } from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />}>
            <Route index element={<Trending />} />
            <Route path="/search/:query" element={<SearchResults />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
