import Setting from "@/assets/svg/Setting";
import Question from "@/assets/svg/Question";
import { css, keyframes } from "@emotion/react";
import { useState } from "react";
import HowToPlay from "../Wordle/HowToPlay";
import { mq } from "@/styles";

const Icons = () => {
  const [open, setOpen] = useState(false);

  const onClickQuestionIcon = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div css={CursorPointer} onClick={onClickQuestionIcon}>
        <Question width={32} height={32} />
      </div>
      {open && (
        <>
          <div css={Back}></div>
          <div css={HowToPlayBox}>
            <HowToPlay onClickClose={() => setOpen(false)} />
          </div>
        </>
      )}
      <div css={CursorPointer}>
        <Setting width={30} height={30} />
      </div>
    </>
  );
};

export default Icons;

const ShowBottom = (type: "MOB" | "PC") => {
  const { innerHeight } = window;

  return keyframes({
    "0%": {
      top: innerHeight,
    },
    "100%": {
      top: type === "MOB" ? innerHeight - 480 : innerHeight / 2 - 480 / 2,
    },
  });
};

const Back = css({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "#ffffff",
  opacity: "0.5",
  zIndex: "100",
});

const HowToPlayBox = css({
  position: "absolute",
  top: window.innerHeight - 480,
  left: "50%",
  transform: "translate(-50%, 0)",
  width: "100%",
  maxWidth: "30rem",
  height: "30rem",
  padding: "1rem",
  backgroundColor: "#fff",
  borderRadius: "0.5rem",
  boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.2)",
  zIndex: "999",
  animation: `${ShowBottom("MOB")} 0.5s ease-in-out forwards`,
  [mq[1]]: {
    width: "90%",
    height: "30rem",
    animation: `${ShowBottom("PC")} 0.5s ease-in-out forwards`,
  },
});

const CursorPointer = css({
  cursor: "pointer",
});
