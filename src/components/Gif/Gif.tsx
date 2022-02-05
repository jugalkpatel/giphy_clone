import { GIF } from "../../common.types";

import { GifImg, GifContainer, GifTitle } from "./Gif.styles";

function Gif({ id, img, title }: GIF) {
  console.log({ title });
  return (
    <GifContainer>
      <GifImg src={img.url} height={img.height} width={img.width} />
      <GifTitle>{title}</GifTitle>
    </GifContainer>
  );
}

export { Gif };
