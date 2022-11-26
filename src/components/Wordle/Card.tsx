import { WORD_STATE } from "@/const/wordle";
import { CharObj, WordState } from "@/types";
import { css } from "@emotion/react";

interface Props {
  char: CharObj;
}

const Card = ({ char }: Props) => {
  const { char: value, state } = char;

  return (
    <>
      <div css={CardBox(state)}>{value}</div>
    </>
  );
};

export default Card;

const CardBox = (state: WordState) =>
  css({
    width: "4rem",
    height: "4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #e2e2e2",
    fontSize: "2rem",
    fontWeight: "900",
    backgroundColor: WORD_STATE[state].color,
    color:
      WORD_STATE[state].type === WORD_STATE.INIT.type ? "#000000" : "#ffffff",
  });
