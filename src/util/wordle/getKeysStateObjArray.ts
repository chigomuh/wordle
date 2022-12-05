import { WORD_STATE } from "@/const/wordle";
import { Words, WordState } from "@/types";

const getKeyCurrentState = (key: string, words: Words) => {
  let keyState: WordState = WORD_STATE.INIT.type;

  words.flat().forEach(({ char, state }) => {
    if (!char) return; // char 빈 값
    if (char !== key) return; // char와 key가 다름

    switch (state) {
      case WORD_STATE.ANSWER.type:
        keyState = WORD_STATE.ANSWER.type;
        break;
      case WORD_STATE.EXIST.type:
        if (keyState !== WORD_STATE.ANSWER.type) {
          keyState = WORD_STATE.EXIST.type;
        }
        break;
      default:
        break;
    }
  });

  return keyState;
};

const getKeysStateObjArray = (keys: string[], words: Words) => {
  const keyStateInfoArray = keys.map((key) => {
    return {
      key,
      state: getKeyCurrentState(key, words),
    };
  });

  return keyStateInfoArray;
};

export { getKeysStateObjArray };
