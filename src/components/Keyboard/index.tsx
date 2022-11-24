import KeyBox from "@/components/Keyboard/KeyBox";
import { WordsContext } from "@/components/Wordle";
import { css } from "@emotion/react";
import { useContext, useEffect } from "react";

const KEY_WORDS_ARRAY = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

const Keyboard = () => {
  const WordsController = useContext(WordsContext);

  useEffect(() => {
    const keydownHandler =
      (controller: typeof WordsController) =>
      ({ key }: KeyboardEvent) => {
        if (!controller) return;

        const { words, setWords, currentWordsIndex, setCurrentWordsIndex } =
          controller;

        if (currentWordsIndex >= words.length) return;
        if (!KEY_WORDS_ARRAY.flat().includes(key.toUpperCase())) return;

        console.log(words, currentWordsIndex);

        if (key === "Enter") {
          if (words[currentWordsIndex][4] === "") return;

          setCurrentWordsIndex((prev) => prev + 1);
          return;
        }

        const currentTargetIndex = words[currentWordsIndex].findIndex(
          (char) => char === ""
        );

        if (key === "Backspace") {
          words[currentWordsIndex][currentTargetIndex] = "";
          setWords([...words]);
          return;
        }

        if (currentTargetIndex === -1) return;

        words[currentWordsIndex][currentTargetIndex] = key.toUpperCase();

        setWords([...words]);
      };

    window.addEventListener("keydown", keydownHandler(WordsController));

    return () => {
      window.removeEventListener("keydown", keydownHandler(WordsController));
    };
  }, []);

  return (
    <>
      <div css={Container}>
        {KEY_WORDS_ARRAY.map((keys, index) => (
          <div key={index}>
            <KeyBox keys={keys} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Keyboard;

const Container = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.4rem",
  width: "100%",
  height: "auto",
});
