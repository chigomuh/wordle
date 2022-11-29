import CardContainer from "@/components/Wordle/CardContainer";
import { css, keyframes } from "@emotion/react";
import { Words } from "@/types";
import { useCallback, useState } from "react";
import Keyboard from "@/components/Keyboard";
import { KEY_WORDS_ARRAY, NOTICE } from "@/const/wordle";
import { WordsContext } from "@/context";
import {
  getInitWords,
  getRandomWord,
  getWordleResultArray,
} from "@/util/wordle";
import { WORDS } from "@/const/words";
import { useNotice } from "@/hooks";
import { mq } from "@/styles";

const Wordle = () => {
  const INIT_WORDS = getInitWords();
  const [words, setWords] = useState<Words>(INIT_WORDS);
  const [currentWordsIndex, setCurrentWordsIndex] = useState(0);
  const [answer, setAnswer] = useState(getRandomWord().toUpperCase());
  const [gameOver, setGameOver] = useState(false);
  const { notice, setNotice, addNotice } = useNotice();

  const restartGame = () => {
    setWords(getInitWords());
    setCurrentWordsIndex(0);
    setAnswer(getRandomWord().toUpperCase());
    setNotice([]);
    setGameOver(false);
  };

  const enterDownHandler = () => {
    // 더이상 입력할 기회가 없음
    if (currentWordsIndex >= INIT_WORDS.length) return;

    // 유저 입력 단어(소문자)
    const userAnswerWord = words[currentWordsIndex]
      .reduce((acc, { char }) => acc + char, "")
      .toLowerCase();

    // 유저 입력 단어의 길이가 유효하지 않은 경우
    if (userAnswerWord.length !== answer.length) {
      addNotice(NOTICE.NOT_ENOUGH_LETTERS);
      return;
    }

    // 단어 리스트에 없는 경우
    if (!WORDS.includes(userAnswerWord)) {
      addNotice(NOTICE.NOT_IN_WORD_LIST);
      return;
    }

    setWords((prev) => {
      prev[currentWordsIndex] = getWordleResultArray(
        answer,
        prev[currentWordsIndex]
      );

      return [...prev];
    });

    // setTimeout 실행 전 동작 방지
    setCurrentWordsIndex(INIT_WORDS.length);

    setTimeout(() => {
      if (answer.toLowerCase() === userAnswerWord) {
        addNotice(NOTICE.CORRECT[currentWordsIndex], { isPopup: false });
        setCurrentWordsIndex(INIT_WORDS.length);
        setGameOver(true);
        return;
      }

      if (currentWordsIndex === INIT_WORDS.length - 1) {
        addNotice(answer, { isPopup: false });
        setGameOver(true);
      }

      setCurrentWordsIndex(currentWordsIndex + 1);
    }, 2000);
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
        <div>{answer}</div>
        <WordsContext.Provider value={{ words, currentWordsIndex }}>
          <div css={KeySection}>
            <Keyboard
              keyWords={KEY_WORDS_ARRAY}
              keyboardHandler={keyboardHandler}
            />
          </div>
        </WordsContext.Provider>
        {gameOver && (
          <>
            <div css={PopupContainer}>
              <div css={BackPopup}></div>
              <div css={Popup}>
                <button onClick={restartGame}>Replay?</button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Wordle;

const ShowBottom = keyframes({
  "0%": {
    bottom: "-100%",
  },
  "100%": {
    bottom: "0",
  },
});

const PopupContainer = css({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: "999",
});

const BackPopup = css({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "#ffffff",
  opacity: "0.5",
  zIndex: "100",
});

const Popup = css({
  position: "absolute",
  bottom: "0",
  left: "0",
  transform: "none",
  width: "100%",
  height: "80%",
  maxHeight: "35rem",
  backgroundColor: "#ffffff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
  color: "#000000",
  boxShadow: "0 4px 23px 0 rgb(0 0 0 / 20%)",
  border: "1px solid #e2e2e2",
  borderRadius: "0.5rem 0.5rem 0 0",
  animation: `${ShowBottom} 0.8s ease-in-out`,
  zIndex: "999",
  [mq[1]]: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "30rem",
    borderRadius: "0.5rem",
  },
});

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
  alingItems: "center",
  width: "100%",
  height: "100vh",
  padding: "1rem 0",
});
