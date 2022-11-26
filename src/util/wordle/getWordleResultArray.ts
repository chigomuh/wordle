import { WORD_STATE } from "@/const/wordle";
import { Word } from "@/types";

const getWordleResultArray = (answer: string, word: Word) => {
  const answerCharArr = [...answer];

  // 정답 먼저 우선순위 채우기
  const userAnswerCharArr = word.map(({ char }, index) => {
    const isAnswer = [...answer][index] === char;
    if (isAnswer) {
      answerCharArr.splice(answerCharArr.indexOf(char), 1);
    }

    return {
      char,
      state: isAnswer ? WORD_STATE.ANSWER.type : WORD_STATE.NONE.type,
    };
  });

  return userAnswerCharArr.map(({ char, state }) => {
    // 정답인 경우 return
    if (state === WORD_STATE.ANSWER.type) return { char, state };

    // 포함 X
    const charIncludeIndex = answerCharArr.indexOf(char);
    if (charIncludeIndex === -1) {
      return {
        char,
        state: WORD_STATE.NONE.type,
      };
    }

    // 포함 O & 정답 X
    answerCharArr.splice(charIncludeIndex, 1);

    return {
      char,
      state: WORD_STATE.EXIST.type,
    };
  });
};

export { getWordleResultArray };
