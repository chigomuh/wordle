import CardContainer from "@/components/Wordle/CardContainer";
import { css } from "@emotion/react";
import { Words } from "@/types";
import { useCallback, useState } from "react";
import Keyboard from "@/components/Keyboard";
import { INIT_WORDS, KEY_WORDS_ARRAY, WORD_STATE } from "@/const/wordle";
import { WordsContext } from "@/context";

const Wordle = () => {
  const [words, setWords] = useState<Words>(INIT_WORDS);
  const [currentWordsIndex, setCurrentWordsIndex] = useState(0);
  const [answer, setAnswer] = useState<string>("mourn".toUpperCase());

  const enterDownHandler = () => {
    if (words[currentWordsIndex][INIT_WORDS[0].length - 1]["char"] === "")
      return;
    if (currentWordsIndex >= INIT_WORDS.length) return;

    setWords((prev) => {
      const answerCharArr = [...answer];

      const userAnswerCharArr = prev[currentWordsIndex].map(
        ({ char }, index) => {
          const isAnswer = [...answer][index] === char;
          if (isAnswer) {
            answerCharArr.splice(answerCharArr.indexOf(char), 1);
          }

          return {
            char,
            state: isAnswer ? WORD_STATE.ANSWER.type : WORD_STATE.NONE.type,
          };
        }
      );

      prev[currentWordsIndex] = userAnswerCharArr.map(
        ({ char, state }, index) => {
          if (state === WORD_STATE.ANSWER.type) return { char, state };

          // 포함 X
          const charIncludeIndex = answerCharArr.indexOf(char);
          if (charIncludeIndex === -1) {
            return {
              char,
              state: WORD_STATE.NONE.type,
            };
          }

          // 포함 O & 위치 O
          if (answer[index] === char) {
            answerCharArr.splice(charIncludeIndex, 1);

            return {
              char,
              state: WORD_STATE.ANSWER.type,
            };
          }

          // 포함 O & 위치 X
          answerCharArr.splice(charIncludeIndex, 1);

          return {
            char,
            state: WORD_STATE.EXIST.type,
          };
        }
      );

      return [...prev];
    });

    setCurrentWordsIndex((prev) => prev + 1);
  };

  const backspaceDownHandler = () => {
    setWords((prev) => {
      const targetIndex = prev[currentWordsIndex].findLastIndex(
        ({ char }) => char
      );
      if (targetIndex === -1) return prev;

      prev[currentWordsIndex][targetIndex]["char"] = "";
      return [...prev];
    });
  };

  const charDownHandler = (key: string) => {
    setWords((prev) => {
      const targetIndex = prev[currentWordsIndex].findIndex(
        ({ char }) => !char
      );
      if (targetIndex === -1) return prev;

      prev[currentWordsIndex][targetIndex]["char"] = key;
      return [...prev];
    });
  };

  const keyboardHandler = useCallback(
    (key: string) => {
      if (currentWordsIndex === INIT_WORDS.length) return;
      if (!KEY_WORDS_ARRAY.flat().includes(key)) return;
      if (key === "ENTER") {
        enterDownHandler();
        return;
      }
      if (key === "BACKSPACE") {
        backspaceDownHandler();
        return;
      }

      charDownHandler(key);
    },
    [currentWordsIndex, answer]
  );

  return (
    <>
      <WordsContext.Provider
        value={{
          words,
          setWords,
          currentWordsIndex,
          setCurrentWordsIndex,
        }}
      >
        <div css={Container}>
          <div css={WordleSection}>
            {words.map((word, index) => (
              <CardContainer key={index} word={word} />
            ))}
          </div>
          <div>{answer}</div>
          <div css={KeySection}>
            <Keyboard
              keyWords={KEY_WORDS_ARRAY}
              keyboardHandler={keyboardHandler}
            />
          </div>
        </div>
      </WordsContext.Provider>
    </>
  );
};

export default Wordle;

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
  alingItems: "center",
  width: "100%",
  height: "100vh",
  padding: "1rem 0",
});
