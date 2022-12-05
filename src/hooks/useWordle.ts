import { KEY_WORDS_ARRAY, NOTICE } from "@/const/wordle";
import { WORDS } from "@/const/words";
import {
  setCurrentWordsIndex,
  setAnswer,
  setGameOver,
  initWords,
  setWord,
  updateChar,
} from "@/store/modules/wordle";
import { CharObj } from "@/types";
import {
  copyClipboard,
  getConvertWordsResultToShare,
  getRandomWord,
  getWordleResultArray,
} from "@/util/wordle";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector, useNotice } from ".";

const useWordle = () => {
  const { notice, setNotice, addNotice } = useNotice();
  const { words, currentWordsIndex, answer, gameOver } = useAppSelector(
    ({ wordle }) => wordle
  );
  const dispatch = useAppDispatch();

  const onRestart = useCallback(() => {
    dispatch(initWords());
    dispatch(setAnswer(getRandomWord().toUpperCase()));
    dispatch(setCurrentWordsIndex(0));
    dispatch(setGameOver(false));
    setNotice([]);
  }, [dispatch, setNotice]);

  const changeWord = useCallback(
    (word: CharObj[], index = currentWordsIndex) => {
      dispatch(setWord({ word, index }));
    },
    [dispatch]
  );

  const changeChar = useCallback(
    (char: string, index = 0) => {
      dispatch(updateChar({ char, index }));
    },
    [dispatch]
  );

  const changeCurrentWordsIndex = useCallback(
    (value: number) => {
      dispatch(setCurrentWordsIndex(value));
    },
    [dispatch]
  );

  const changeGameOver = useCallback(
    (isGameOver = true) => {
      dispatch(setGameOver(isGameOver));
    },
    [dispatch]
  );

  const onClickShare = useCallback(() => {
    const convertWordsResult = getConvertWordsResultToShare(words);
    const shareText = `Wordle <${answer}>\n${convertWordsResult}`;

    const successHandle = () => {
      addNotice(NOTICE.COPY_SUCCESSED);
    };

    const failHandle = () => {
      addNotice(NOTICE.COPY_FAILED);
    };

    copyClipboard(shareText, successHandle, failHandle);
  }, [words, answer, addNotice]);

  const enterDownHandler = useCallback(() => {
    // 더이상 입력할 기회가 없음
    if (currentWordsIndex >= words.length) return;

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

    const resultWord = getWordleResultArray(answer, words[currentWordsIndex]);

    changeWord(resultWord, currentWordsIndex);

    // setTimeout 실행 전 동작 방지
    changeCurrentWordsIndex(words.length);

    setTimeout(() => {
      if (answer.toLowerCase() === userAnswerWord) {
        addNotice(NOTICE.CORRECT[currentWordsIndex]);
        changeCurrentWordsIndex(words.length);
        changeGameOver(true);
        return;
      }

      if (currentWordsIndex === words.length - 1) {
        addNotice(answer);
        changeGameOver(true);
      }

      changeCurrentWordsIndex(currentWordsIndex + 1);
    }, 2000);
  }, [currentWordsIndex, words, answer, addNotice]);

  const backspaceDownHandler = useCallback(() => {
    const targetIndex = words[currentWordsIndex].findLastIndex(
      ({ char }) => char
    );
    if (targetIndex === -1) return;
    changeChar("", targetIndex);
  }, [words, currentWordsIndex, changeChar]);

  const charDownHandler = useCallback(
    (key: string) => {
      const targetIndex = words[currentWordsIndex].findIndex(
        ({ char }) => !char
      );
      if (targetIndex === -1) return;
      changeChar(key, targetIndex);
    },
    [words, currentWordsIndex, changeChar]
  );

  const keyboardHandler = useCallback(
    (key: string) => {
      if (currentWordsIndex === words.length) return;
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
    [currentWordsIndex, words]
  );

  useEffect(() => {
    dispatch(setAnswer(getRandomWord().toUpperCase()));
  }, [dispatch]);

  return {
    answer,
    notice,
    addNotice,
    onRestart,
    words,
    currentWordsIndex,
    gameOver,
    keyboardHandler,
    onClickShare,
  };
};

export default useWordle;
