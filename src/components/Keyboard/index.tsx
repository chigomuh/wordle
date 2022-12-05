import KeyBox from "@/components/Keyboard/KeyBox";
import { KEY_WORDS_ARRAY } from "@/const/wordle";
import { useWordle } from "@/hooks";
import { mq } from "@/styles";
import { css } from "@emotion/react";
import { useEffect } from "react";

const Keyboard = () => {
  const { keyboardHandler } = useWordle();

  useEffect(() => {
    const keydownHandler = ({ key }: KeyboardEvent) => {
      keyboardHandler(key.toUpperCase());
    };

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keyboardHandler]);

  return (
    <>
      <div css={Container}>
        {KEY_WORDS_ARRAY.map((keys, index) => (
          <KeyBox key={index} keys={keys} />
        ))}
      </div>
    </>
  );
};

export default Keyboard;

const Container = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.2rem",
  width: "100%",
  height: "auto",
  [mq[1]]: {
    gap: "0.4rem",
  },
});
