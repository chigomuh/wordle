import Card from "@/components/Wordle/Card";
import { css } from "@emotion/react";
import { Word } from "@/types";

interface Props {
  word: Word;
}

const CardContainer = ({ word }: Props) => {
  return (
    <>
      <div css={Container}>
        {word.map((word, index) => (
          <Card key={index} char={word} />
        ))}
      </div>
    </>
  );
};

export default CardContainer;

const Container = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alingItems: "center",
  gap: "0.4rem",
});
