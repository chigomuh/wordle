import { EXAMPLE_WORDS, WORD_STATE } from "@/const/wordle";
import { css } from "@emotion/react";
import Card from "@/components/Wordle/Card";

interface Props {
  wordInfo: typeof EXAMPLE_WORDS[0];
}

const ExampleWord = ({ wordInfo }: Props) => {
  const { word, correctIndex, description, state } = wordInfo;

  return (
    <div>
      <div css={CardContainer}>
        {word.split("").map((char, idx) => (
          <div key={idx} css={CardBox}>
            <Card
              char={{
                char,
                state: idx === correctIndex ? state : WORD_STATE.INIT.type,
              }}
              index={idx}
            />
          </div>
        ))}
      </div>
      <h5>
        <strong>{description.slice(0, 1)}</strong>
        {description.slice(1)}
      </h5>
    </div>
  );
};

export default ExampleWord;

const CardBox = css({
  width: "2rem",
  height: "2rem",
  fontSize: "1.5rem",
});

const CardContainer = css({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "0.4rem",
  width: "100%",
  height: "auto",
});
