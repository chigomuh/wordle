import KeyBox from "@/components/Keyboard/KeyBox";
import { KeyboardContext } from "@/context";
import { mq } from "@/styles";
import { css } from "@emotion/react";
import { useEffect } from "react";

interface Props {
  keyWords: string[][];
  keyboardHandler: (key: string) => void;
}

const Keyboard = ({ keyWords, keyboardHandler }: Props) => {
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
      <KeyboardContext.Provider value={{ keyboardHandler }}>
        <div css={Container}>
          {keyWords.map((keys, index) => (
            <KeyBox key={index} keys={keys} />
          ))}
        </div>
      </KeyboardContext.Provider>
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
