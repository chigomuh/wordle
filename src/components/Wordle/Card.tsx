import { WORD_STATE } from "@/const/wordle";
import { CharObj } from "@/types";
import { css, keyframes } from "@emotion/react";

interface Props {
  char: CharObj;
  index: number;
}

const Card = ({ char, index }: Props) => {
  const { char: value } = char;

  return (
    <>
      <div css={CardBox(char, index)}>{value}</div>
    </>
  );
};

export default Card;

const ScaleEffect = keyframes({
  "0%": {
    transform: "scale(1.2)",
  },
  "100%": {
    transform: "scale(1)",
  },
});

const EnterEffect = (prev: {}, result: {}) =>
  keyframes({
    "0%": {
      transform: "rotate3d(1, 0, 0, 0deg)",
      ...prev,
    },
    "50%": {
      transform: "rotate3d(1, 0, 0, 180deg)",
    },
    "100%": {
      transform: "rotate3d(1, 0, 0, 0deg)",
      ...result,
    },
  });

const CardBox = ({ state, char }: CharObj, index: number) => {
  const { color: backgroundColor } = WORD_STATE[state];
  const isEntered = state !== WORD_STATE.INIT.type;
  const prev = {
    border: `2px solid ${char !== "" ? "#878a8c" : "#e2e2e2"}`,
    backgroundColor: "#ffffff",
    color: "#000000",
  };

  const result = {
    border: "none",
    backgroundColor,
    color: "#ffffff",
  };

  return css({
    ...prev,
    width: "4rem",
    height: "4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    fontWeight: "900",
    animation: isEntered
      ? `${EnterEffect(prev, result)} 1s ease-in ${index * 200}ms forwards`
      : char !== ""
      ? `${ScaleEffect} 0.1s ease-in-out`
      : "none",
  });
};
