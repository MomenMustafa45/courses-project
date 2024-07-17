import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
export interface ModalState {
  value: boolean;
}

// Define the initial state using that type
const initialState: ModalState = {
  value: false,
};

export const modalSlice = createSlice({
  name: "showModal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectedModal = (state: RootState) => state.lang.value;

export default modalSlice.reducer;
