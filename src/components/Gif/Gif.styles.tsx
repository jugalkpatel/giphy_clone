import styled from "styled-components";

const GifTitle = styled.p`
  color: ${({ theme }) => theme.text};
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  font-weight: bold;

  @media (min-width: 568px) {
    display: none;
  }
`;

const GifContainer = styled.article`
  position: relative;
  height: 15rem;
  @media (min-width: 568px) {
    &:hover ${GifTitle} {
      display: block;
    }
  }
`;

const GifImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
`;

export { GifImg, GifContainer, GifTitle };
