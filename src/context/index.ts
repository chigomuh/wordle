import { Words } from "@/types";
import { createContext, Dispatch } from "react";

const WordsContext = createContext<{
  words: Words;
  setWords: Dispatch<React.SetStateAction<Words>>;
  currentWordsIndex: number;
  setCurrentWordsIndex: Dispatch<React.SetStateAction<number>>;
} | null>(null);

const KeyboardContext = createContext<{
  keyboardHandler: (key: string) => void;
} | null>(null);

export { WordsContext, KeyboardContext };
