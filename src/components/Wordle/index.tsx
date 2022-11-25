import CardContainer from "@/components/Wordle/CardContainer";
import { css } from "@emotion/react";
import { Words } from "@/types";
import { useCallback, useState } from "react";
import Keyboard from "@/components/Keyboard";
import { INIT_WORDS, KEY_WORDS_ARRAY } from "@/const/wordle";
import { WordsContext } from "@/context";

const Wordle = () => {
  const [words, setWords] = useState<Words>(INIT_WORDS);
  const [currentWordsIndex, setCurrentWordsIndex] = useState(0);

  const enterDownHandler = () => {
    setCurrentWordsIndex((prev) => {
      if (words[prev][INIT_WORDS[0].length - 1] === "") return prev;
      return prev < INIT_WORDS.length ? prev + 1 : prev;
    });
  };

  const backspaceDownHandler = () => {
    setWords((prev) => {
      const targetIndex = prev[currentWordsIndex].findLastIndex((char) => char);
      if (targetIndex === -1) return prev;

      prev[currentWordsIndex][targetIndex] = "";
      return [...prev];
    });
  };

  const charDownHandler = (key: string) => {
    setWords((prev) => {
      const targetIndex = prev[currentWordsIndex].findIndex((char) => !char);
      if (targetIndex === -1) return prev;

      prev[currentWordsIndex][targetIndex] = key;
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
    [currentWordsIndex]
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
