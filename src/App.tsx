import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

import { Home } from "./pages";
import { Trending, SearchResults } from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Routes>
            <Route element={<Home />}>
              <Route index element={<Trending />} />
              <Route path="/search/:query" element={<SearchResults />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
