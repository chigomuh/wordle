import Share from "@/assets/svg/Share";
import { WORD_STATE } from "@/const/wordle";
import { useWordle } from "@/hooks";
import { css } from "@emotion/react";
import PopupModal from "@/components/common/PopupModal";
import Card from "@/components/Wordle/Card";

const GameOver = () => {
  const { answer, onClickShare, onRestart } = useWordle();

  return (
    <PopupModal>
      <span css={Title}>Wordle</span>
      <div css={AnswerBox}>
        {[...answer].map((char, index) => (
          <div css={CardBox} key={index}>
            <Card
              char={{ char, state: WORD_STATE.ANSWER.type }}
              index={index}
            />
          </div>
        ))}
      </div>
      <div css={ButtonBox}>
        <button onClick={onRestart} css={Button("#f7da21", "#000000")}>
          <span>Replay?</span>
          <img css={ImageIcon} src={"./wordle-favicon.ico"} alt="wordle-icon" />
        </button>
        <button
          onClick={onClickShare}
          css={Button(WORD_STATE.ANSWER.color, "#ffffff")}
        >
          <span>Share</span>
          <Share />
        </button>
      </div>
    </PopupModal>
  );
};

export default GameOver;

const CardBox = css({
  width: "4rem",
  height: "4rem",
});

const Title = css({
  fontSize: "2rem",
  fontWeight: "900",
});

const AnswerBox = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.4rem",
  width: "100%",
  maxWidth: "30rem",
  height: "auto",
});

const ImageIcon = css({
  width: "1.5rem",
  height: "1.5rem",
});

const ButtonBox = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "auto",
  gap: "1rem",
});

const Button = (backgroundColor: string, color: string) =>
  css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "20rem",
    height: "3rem",
    fontSize: "1rem",
    fontWeight: "900",
    backgroundColor,
    color,
    gap: "1rem",
    padding: "0 1rem",
    borderRadius: "1.5rem",
  });
