import { configureStore } from "@reduxjs/toolkit";
import langReducer, { LangState } from "./slices/langSlice";
import modalReducer, { ModalState } from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    lang: langReducer,
    showModal: modalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  lang: LangState;
  showModal: ModalState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
