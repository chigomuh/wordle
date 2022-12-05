import { createSlice } from "@reduxjs/toolkit";

interface NoticeState {
  notice: string[];
}

const initialState: NoticeState = {
  notice: [],
};

export const notice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    addNotice: (state, action) => {
      state.notice.push(action.payload);
    },
    deleteNotice: (state) => {
      state.notice.pop();
    },
    initNotice: (state) => {
      state.notice = [];
    },
  },
});

export const { addNotice, deleteNotice, initNotice } = notice.actions;

export default notice.reducer;
