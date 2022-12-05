import { KEY_WORDS_ARRAY, WORD_STATE } from "@/const/wordle";
import { WordState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type Map<T, U> = {
  [K in keyof T]: U;
};
type Key = {
  char: string;
  state: WordState;
};
type KeyBoard = Map<typeof KEY_WORDS_ARRAY, Key[]>;

interface KeyState {
  keyboard: KeyBoard;
}

const initialState: KeyState = {
  keyboard: KEY_WORDS_ARRAY.map((keyBox) =>
    keyBox.map((key) => ({ char: key, state: WORD_STATE.INIT.type }))
  ),
};

export const key = createSlice({
  name: "key",
  initialState,
  reducers: {},
});
