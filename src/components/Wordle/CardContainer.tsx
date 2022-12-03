import Card from "@/components/Wordle/Card";
import { css } from "@emotion/react";
import { Word } from "@/types";
import { mq } from "@/styles";

interface Props {
  word: Word;
}

const CardContainer = ({ word }: Props) => {
  return (
    <div css={Container}>
      {word.map((char, index) => (
        <div css={CardBox} key={index}>
          <Card char={char} index={index} />
        </div>
      ))}
    </div>
  );
};

export default CardContainer;

const CardBox = css({
  width: "3rem",
  height: "3rem",
  fontSize: "1.5rem",
  [mq[1]]: {
    width: "4rem",
    height: "4rem",
    fontSize: "2rem",
  },
});

const Container = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alingItems: "center",
  gap: "0.4rem",
  width: "100%",
  height: "auto",
});
