import { css } from "@emotion/react";

interface Props {
  char: string;
}

const Card = ({ char }: Props) => {
  return (
    <>
      <div css={CardBox}>{char.toUpperCase()}</div>
    </>
  );
};

export default Card;

const CardBox = css({
  width: "4rem",
  height: "4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid #e2e2e2",
  fontSize: "2rem",
  fontWeight: "900",
});
