import Delete from "@/assets/svg/Delete";
import { css } from "@emotion/react";
import { mq } from "@/styles";
import { useContext } from "react";
import { KeyboardContext } from "@/context";

interface Props {
  text: string;
}

const KeyCard = ({ text }: Props) => {
  const KeyboardController = useContext(KeyboardContext);

  const onClickButton = () => {
    if (!KeyboardController) return;

    const { keyboardHandler } = KeyboardController;
    keyboardHandler(text);
  };

  return (
    <>
      <button css={CardBox} onClick={onClickButton}>
        {text === "BACKSPACE" ? <Delete /> : text}
      </button>
    </>
  );
};

export default KeyCard;

const CardBox = css({
  width: "fit-content",
  height: "3rem",
  padding: "0 0.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#d3d6da",
  borderRadius: "0.25rem",
  fontWeight: "900",
  wordBreak: "keep-all",
  cursor: "pointer",
  [mq[1]]: {
    padding: "0 1rem",
    height: "3.5rem",
  },
});
