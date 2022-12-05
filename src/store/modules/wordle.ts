import { Words } from "@/types";
import { getInitWords, getRandomWord } from "@/util/wordle";
import { createSlice } from "@reduxjs/toolkit";

interface WordleState {
  words: Words;
  currentWordsIndex: number;
  answer: string;
  gameOver: boolean;
}

const initialState: WordleState = {
  words: getInitWords(),
  currentWordsIndex: 0,
  answer: getRandomWord().toUpperCase(),
  gameOver: false,
};

export const wordleSlice = createSlice({
  name: "wordle",
  initialState,
  reducers: {
    initWords: (state) => {
      state.words = getInitWords();
    },
    setWords: (state, action) => {
      state.words = action.payload;
    },
    setCurrentWordsIndex: (state, action) => {
      state.currentWordsIndex = action.payload;
    },
    incrementCurrentWordsIndex: (state) => {
      state.currentWordsIndex += 1;
    },
    setAnswer: (state, action) => {
      state.answer = action.payload;
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload;
    },
    setWord: (state, action) => {
      state.words[action.payload.index] = action.payload.word;
    },
    updateChar: (state, action) => {
      const { index, char } = action.payload;
      state.words[state.currentWordsIndex][index].char = char;
    },
  },
});

export const {
  setWord,
  setWords,
  setCurrentWordsIndex,
  incrementCurrentWordsIndex,
  setAnswer,
  setGameOver,
  initWords,
  updateChar,
} = wordleSlice.actions;

export default wordleSlice.reducer;
