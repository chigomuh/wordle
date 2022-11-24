import Setting from "@/assets/svg/Setting";
import Question from "@/assets/svg/Question";
import { css } from "@emotion/react";

const Icons = () => {
  return (
    <>
      <div css={CursorPointer}>
        <Question width={32} height={32} />
      </div>
      <div css={CursorPointer}>
        <Setting width={30} height={30} />
      </div>
    </>
  );
};

export default Icons;

const CursorPointer = css({
  cursor: "pointer",
});
