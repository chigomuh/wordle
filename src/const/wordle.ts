import { Words } from "@/types";

const KEY_WORDS_ARRAY = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

const INIT_WORDS: Words = Array(6)
  .fill("")
  .map((_) => Array(5).fill(""));

export { KEY_WORDS_ARRAY, INIT_WORDS };
