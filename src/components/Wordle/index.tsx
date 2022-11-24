import CardContainer from "@/components/Wordle/CardContainer";
import { css } from "@emotion/react";
import { Words } from "@/types";
import { createContext, Dispatch, useState } from "react";
import Keyboard from "@/components/Keyboard";

const INIT_WORDS: Words = Array(6)
  .fill("")
  .map((_) => Array(5).fill(""));
export const WordsContext = createContext<{
  words: Words;
  setWords: Dispatch<React.SetStateAction<Words>>;
  currentWordsIndex: number;
  setCurrentWordsIndex: Dispatch<React.SetStateAction<number>>;
} | null>(null);

const Wordle = () => {
  const [words, setWords] = useState<Words>(INIT_WORDS);
  const [currentWordsIndex, setCurrentWordsIndex] = useState(0);
  // 키보드에서는 키 입력만 받아오자
  // 하나의 단어 박스가 가득차고 enter를 입력 받으면 다음 단어로 넘어가기
  // 키보드에서도 입력된 단어들로 스타일을 변경해야 한다 -> words만 넘기기
  // 실제 검증 로직은 cardcontainer에서 각각 하기 -> 해당 box에 대한 검증
  // 여기에서는 words만 넘기고 현재 어떤 박스인지만 확인

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
            <Keyboard />
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
