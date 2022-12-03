const KEY_WORDS_ARRAY = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

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

const CORRECT = [
  "Genius",
  "Magnificent",
  "Impressive",
  "Splendid",
  "Great",
  "Phew",
] as const;

const NOTICE = {
  NOT_IN_WORD_LIST: "Not in word list",
  NOT_ENOUGH_LETTERS: "Not enough letters",
  COPY_SUCCESSED: "Copied results to clipboard",
  COPY_FAILED: "Failed to copy results to clipboard",
  CORRECT,
} as const;

const EXAMPLE_WORDS = [
  {
    id: 1,
    word: "WEARY",
    correctIndex: 0,
    state: WORD_STATE.ANSWER.type,
    description: "W is in the word and in the correct spot.",
  },
  {
    id: 2,
    word: "PILLS",
    correctIndex: 1,
    state: WORD_STATE.EXIST.type,
    description: "I is in the word but in the wrong spot.",
  },
  {
    id: 3,
    word: "VAGUE",
    correctIndex: 3,
    state: WORD_STATE.NONE.type,
    description: "U is not in the word in any spot.",
  },
];

export { KEY_WORDS_ARRAY, WORD_STATE, NOTICE, EXAMPLE_WORDS };
