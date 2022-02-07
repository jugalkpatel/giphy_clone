import styled from "styled-components";
import { FaRegSadCry } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import { GifContainer } from "../components/Gif/Gif.styles";

const ContentContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: max-content;
  max-width: 1024px;
  gap: 1rem;
  padding: 1rem;
  margin: 0 auto;
  min-height: 100vh;
  justify-items: center;
  align-items: center;
  @media (min-width: 768px) {
    gap: 0.7rem;
    ${GifContainer}:nth-child(4n) {
      grid-row: span 1;
    }

    ${GifContainer}:nth-child(4n - 1) {
      grid-row: span 2;
    }

    ${GifContainer}:nth-child(4n - 2) {
      grid-row: span 3;
    }

    ${GifContainer}:nth-child(4n - 3) {
      grid-row: span 4;
    }

  }
`;

const ContentHeader = styled.article`
  color: ${({ theme }) => theme.text};
  display: flex;
  grid-column: 1 / -1;
  width: 100%;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const MessageContainer = styled.article`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  grid-column: 1 / -1;
  align-items: center;
  justify-content: center;
`;

const ErrorIcon = styled(FaRegSadCry)`
  font-size: 5rem;
`;

const Message = styled.h3`
  text-align: center;
  margin: 1rem;
  font-weight: 200;
`;

const TrendingIcon = styled(FiTrendingUp)`
  color: ${({ theme }) => theme.trending};
  margin-right: 0.5rem;
`;

export {
  ContentContainer,
  ContentHeader,
  MessageContainer,
  ErrorIcon,
  Message,
  TrendingIcon,
};
