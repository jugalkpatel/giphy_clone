import styled from "styled-components";
import { FaRegSadCry } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";

const ContentContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  max-width: 1024px;
  gap: 1rem;
  padding: 1rem;
  margin: 0 auto;
  min-height: 70vh;
  justify-items: center;
  align-items: center;
  @media (min-width: 768px) {
    gap: 0.7rem;
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
