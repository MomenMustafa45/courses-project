import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
export interface LangState {
  value: string;
}

// Define the initial state using that type
const initialState: LangState = {
  value: "arabic",
};

export const languageSlice = createSlice({
  name: "lang",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeLang: (state) => {
      if (state.value === "arabic") {
        state.value = "hebrew";
      } else {
        state.value = "arabic";
      }
    },
  },
});

export const { changeLang } = languageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLanguage = (state: RootState) => state.lang.value;

export default languageSlice.reducer;

