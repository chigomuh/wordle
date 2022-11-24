import Delete from "@/assets/svg/Delete";
import { css } from "@emotion/react";
import { mq } from "@/styles";

interface Props {
  text: string;
}

const KeyCard = ({ text }: Props) => {
  return (
    <>
      <div css={CardBox}>{text === "BACKSPACE" ? <Delete /> : text}</div>
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
