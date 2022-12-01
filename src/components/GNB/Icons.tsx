import Setting from "@/assets/svg/Setting";
import Question from "@/assets/svg/Question";
import { css } from "@emotion/react";
import { useState } from "react";
import HowToPlay from "../Wordle/HowToPlay";

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
        <div css={HowToPlayBox}>
          <HowToPlay onClickClose={() => setOpen(false)} />
        </div>
      )}
      <div css={CursorPointer}>
        <Setting width={30} height={30} />
      </div>
    </>
  );
};

export default Icons;

const HowToPlayBox = css({
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translate(-50%, 0)",
  width: "90%",
  maxWidth: "30rem",
  height: "auto",
  padding: "1rem",
  backgroundColor: "#fff",
  borderRadius: "0.5rem",
  boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.2)",
});

const CursorPointer = css({
  cursor: "pointer",
});
