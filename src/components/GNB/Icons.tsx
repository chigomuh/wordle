// import Setting from "@/assets/svg/Setting";
import Question from "@/assets/svg/Question";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import HowToPlay from "../Wordle/HowToPlay";

const Icons = () => {
  const [open, setOpen] = useState(false);

  const onClickQuestionIcon = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const isFirstViewHowToPlay = localStorage.getItem("howToPlay");

    if (isFirstViewHowToPlay) return;

    setOpen(true);
    localStorage.setItem("howToPlay", "true");
  }, []);

  return (
    <>
      <div css={CursorPointer} onClick={onClickQuestionIcon}>
        <Question width={32} height={32} />
      </div>
      {open && <HowToPlay onClickClose={() => setOpen(false)} />}
      {/* <div css={CursorPointer}>
        <Setting width={30} height={30} />
      </div> */}
    </>
  );
};

export default Icons;

const CursorPointer = css({
  cursor: "pointer",
});
