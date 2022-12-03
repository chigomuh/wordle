import Close from "@/assets/svg/Close";
import { EXAMPLE_WORDS } from "@/const/wordle";
import { css } from "@emotion/react";
import ExampleWord from "@/components/Wordle/HowToPlay/ExampleWord";

interface Props {
  onClickClose: () => void;
}

const HowToPlay = ({ onClickClose }: Props) => {
  return (
    <>
      <div css={Container}>
        <div css={CloseBox} onClick={onClickClose}>
          <Close />
        </div>
        <div>
          <h1 css={Text("1.5rem", "900")}>How To Play</h1>
          <h2 css={Text("1.2rem", "500")}>Guess the Wordle in 6 tries.</h2>
        </div>
        <ul css={UlBox}>
          <li>Each guess must be a valid 5-letter word.</li>
          <li>
            The color of the tiles will change to show how close your guess was
            to the word.
          </li>
        </ul>
        <div css={ExampleContainer}>
          <h3 css={Text("1rem", "900")}>Examples</h3>
          {EXAMPLE_WORDS.map((word) => (
            <ExampleWord key={word.id} wordInfo={word} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HowToPlay;

const CloseBox = css({
  position: "absolute",
  top: "0",
  right: "0",
  margin: "1rem",
  cursor: "pointer",
});

const ExampleContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "1rem",
  fontSize: "1rem",
});

const UlBox = css({
  listStyleType: "disc",
  paddingLeft: "1rem",
  wordBreak: "keep-all",
  lineHeight: "1rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "0.5rem",
  fontSize: "1rem",
});

const Text = (fontSize: string, fontWeight: string) =>
  css({
    fontSize,
    fontWeight,
  });

const Container = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
  height: "100%",
  gap: "1rem",
  padding: "1rem",
});
