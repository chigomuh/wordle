import { Words } from "@/types";

const KEY_WORDS_ARRAY = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

const INIT_WORDS: Words = Array(6)
  .fill("")
  .map((_) =>
    Array(5)
      .fill("")
      .map((_) => ({
        char: "",
        state: "INIT",
      }))
  );

const WORD_STATE = {
  ANSWER: {
    type: "ANSWER",
    color: "#6aaa64",
  },
  EXIST: {
    type: "EXIST",
    color: "#c9b458",
  },
  NONE: {
    type: "NONE",
    color: "#787c7e",
  },
  INIT: {
    type: "INIT",
    color: "#ffffff",
  },
} as const;

const NOTICE = {
  NOT_IN_WORD_LIST: "Not in word list",
  NOT_ENOUGH_LETTERS: "Not enough letters",
  CORRECT: ["Genius", "Magnificent", "Impressive", "Splendid", "Great", "Phew"],
} as const;

export { KEY_WORDS_ARRAY, INIT_WORDS, WORD_STATE, NOTICE };
