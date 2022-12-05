import CardContainer from "@/components/Wordle/CardContainer";
import { css } from "@emotion/react";
import Keyboard from "@/components/Keyboard";
import { useWordle } from "@/hooks";
import GameOver from "@/components/Wordle/GameOver";

const Wordle = () => {
  const { words, gameOver, notice } = useWordle();

  return (
    <>
      <div css={Container}>
        <div css={NoticeSection}>
          {notice.map((notice, index) => (
            <div key={index} css={NoticeBox}>
              {notice}
            </div>
          ))}
        </div>
        <div css={WordleSection}>
          {words.map((word, index) => (
            <CardContainer key={index} word={word} />
          ))}
        </div>
        <div css={KeySection}>
          <Keyboard />
        </div>
        {gameOver && <GameOver />}
      </div>
    </>
  );
};

export default Wordle;

const NoticeBox = css({
  width: "auto",
  height: "3rem",
  wordBreak: "keep-all",
  padding: "0.5rem",
  backgroundColor: "#000000",
  color: "#ffffff",
  borderRadius: "0.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "900",
  fontSize: "0.8rem",
});

const NoticeSection = css({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "5rem",
  gap: "1rem",
  zIndex: "100",
});

const KeySection = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  width: "100%",
  height: "auto",
});

const WordleSection = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alingItems: "center",
  gap: "0.4rem",
  width: "100%",
  height: "100%",
});

const Container = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "baseline",
  width: "100%",
  height: "calc(100vh - 4rem)",
  padding: "1rem 0",
  gap: "1rem",
});
