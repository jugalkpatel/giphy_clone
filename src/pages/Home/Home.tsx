import { Outlet } from "react-router-dom";

import { Navbar } from "../../components";
import { ContentContainer } from "../../styles/common.styles";

function Home() {
  return (
    <>
      <Navbar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </>
  );
}

export { Home };
