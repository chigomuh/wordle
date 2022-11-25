import KeyBox from "@/components/Keyboard/KeyBox";
import { css } from "@emotion/react";
import { useEffect } from "react";

interface Props {
  keyWords: string[][];
  keyDownHandler: (event: KeyboardEvent) => void;
}

const Keyboard = ({ keyWords, keyDownHandler }: Props) => {
  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  return (
    <>
      <div css={Container}>
        {keyWords.map((keys, index) => (
          <div key={index}>
            <KeyBox keys={keys} />
          </div>
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
  gap: "0.4rem",
  width: "100%",
  height: "auto",
});
