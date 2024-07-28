import { configureStore } from "@reduxjs/toolkit";
import langReducer, { LangState } from "./slices/langSlice";
import modalReducer, { ModalState } from "./slices/modalSlice";
import coursesReducer, { CoursesState } from "./slices/coursesSlice";

export const store = configureStore({
  reducer: {
    lang: langReducer,
    showModal: modalReducer,
    courses: coursesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  lang: LangState;
  showModal: ModalState;
  courses: CoursesState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

