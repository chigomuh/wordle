import Delete from "@/assets/svg/Delete";
import { css } from "@emotion/react";
import { mq } from "@/styles";
import { useContext } from "react";
import { KeyboardContext } from "@/context";
import { WordState } from "@/types";
import { WORD_STATE } from "@/const/wordle";

interface Props {
  text: string;
  state: WordState;
}

const KeyCard = ({ text, state }: Props) => {
  const KeyboardController = useContext(KeyboardContext);

  const onClickButton = () => {
    if (!KeyboardController) return;

    const { keyboardHandler } = KeyboardController;
    keyboardHandler(text);
  };

  return (
    <>
      <button css={CardBox(state)} onClick={onClickButton}>
        {text === "BACKSPACE" ? <Delete /> : text}
      </button>
    </>
  );
};

export default KeyCard;

const CardBox = (state: WordState) =>
  css({
    fontSize: "0.8rem",
    width: "fit-content",
    height: "2.5rem",
    padding: "0 0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      WORD_STATE.INIT.type === state || WORD_STATE.NONE.type === state
        ? "#d3d6da"
        : WORD_STATE[state].color,
    borderRadius: "0.25rem",
    fontWeight: "900",
    wordBreak: "keep-all",
    cursor: "pointer",
    [mq[1]]: {
      padding: "0 1rem",
      height: "3.5rem",
      fontSize: "1rem",
    },
  });
