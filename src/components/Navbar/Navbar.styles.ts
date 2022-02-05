import styled from "styled-components";

import { AiOutlineFileGif } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.text};
  grid-column: 1 / -1;
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Logo = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 0;
  }
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
`;

const Submit = styled.button.attrs({ type: "submit" })`
  padding: 0 0.7rem;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
`;

const InputField = styled.input.attrs({ placeholder: "Search all the gifs" })`
  padding: 0.5rem;
  flex: 1 2 auto;
  border-radius: 0.3rem;
`;

const GIFIcon = styled(AiOutlineFileGif)`
  font-size: 2rem;
`;

const SearchIcon = styled(BiSearchAlt2)`
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
`;

export { LogoText, Nav, Submit, Form, InputField, GIFIcon, Logo, SearchIcon };
