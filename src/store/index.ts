import { configureStore } from "@reduxjs/toolkit";
import wordleReducer from "@/store/modules/wordle";
import noticeReducer from "@/store/modules/notice";

const store = configureStore({
  reducer: {
    wordle: wordleReducer,
    notice: noticeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
