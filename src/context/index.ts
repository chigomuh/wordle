import { Words } from "@/types";
import { createContext } from "react";

const WordsContext = createContext<{
  words: Words;
  currentWordsIndex: number;
} | null>(null);

const KeyboardContext = createContext<{
  keyboardHandler: (key: string) => void;
} | null>(null);

export { WordsContext, KeyboardContext };
