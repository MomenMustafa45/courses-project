import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the slice state
export interface CoursesState {
  courses: [];
  loading: boolean;
}

// Define the initial state using that type
const initialState: CoursesState = {
  courses: [],
  loading: true,
};

// getting data from api
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllCourses = createAsyncThunk<any, void, any>(
  "/getCoureses",
  async () => {
    try {
      const courses = await axios.get(
        "https://senorita.besoftware.net/api/courses/get-all-courses"
      );
      return courses.data.courses;
    } catch (error) {
      console.log(error);
    }
  }
);

export const coursesSlice = createSlice({
  name: "courses",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(getAllCourses.rejected, (state) => {
        state.courses = [];
        state.loading = false;
      });
  },
});

export default coursesSlice.reducer;
