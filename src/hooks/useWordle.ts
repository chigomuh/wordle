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
import { useCallback } from "react";
import { useAppDispatch, useAppSelector, useNotice } from ".";

const useWordle = () => {
  const { notice, addNoticeAndTimeoutPopWithDelay, resetNotice } = useNotice();
  const { words, currentWordsIndex, answer, gameOver } = useAppSelector(
    ({ wordle }) => wordle
  );
  const dispatch = useAppDispatch();

  const onRestart = useCallback(() => {
    dispatch(initWords());
    dispatch(setAnswer(getRandomWord().toUpperCase()));
    dispatch(setCurrentWordsIndex(0));
    dispatch(setGameOver(false));
    resetNotice();
  }, [dispatch]);

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
      addNoticeAndTimeoutPopWithDelay(NOTICE.COPY_SUCCESSED);
    };

    const failHandle = () => {
      addNoticeAndTimeoutPopWithDelay(NOTICE.COPY_FAILED);
    };

    copyClipboard(shareText, successHandle, failHandle);
  }, [words, answer]);

  const enterDownHandler = useCallback(() => {
    // ????????? ????????? ????????? ??????
    if (currentWordsIndex >= words.length) return;

    // ?????? ?????? ??????(?????????)
    const userAnswerWord = words[currentWordsIndex]
      .reduce((acc, { char }) => acc + char, "")
      .toLowerCase();

    // ?????? ?????? ????????? ????????? ???????????? ?????? ??????
    if (userAnswerWord.length !== answer.length) {
      addNoticeAndTimeoutPopWithDelay(NOTICE.NOT_ENOUGH_LETTERS);
      return;
    }

    // ?????? ???????????? ?????? ??????
    if (!WORDS.includes(userAnswerWord)) {
      addNoticeAndTimeoutPopWithDelay(NOTICE.NOT_IN_WORD_LIST);
      return;
    }

    const resultWord = getWordleResultArray(answer, words[currentWordsIndex]);

    changeWord(resultWord, currentWordsIndex);

    // setTimeout ?????? ??? ?????? ??????
    changeCurrentWordsIndex(words.length);

    setTimeout(() => {
      if (answer.toLowerCase() === userAnswerWord) {
        addNoticeAndTimeoutPopWithDelay(NOTICE.CORRECT[currentWordsIndex]);
        changeCurrentWordsIndex(words.length);
        changeGameOver(true);
        return;
      }

      if (currentWordsIndex === words.length - 1) {
        addNoticeAndTimeoutPopWithDelay(answer);
        changeGameOver(true);
      }

      changeCurrentWordsIndex(currentWordsIndex + 1);
    }, 2000);
  }, [currentWordsIndex, words, answer]);

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

  return {
    answer,
    notice,
    onRestart,
    words,
    currentWordsIndex,
    gameOver,
    keyboardHandler,
    onClickShare,
  };
};

export default useWordle;
