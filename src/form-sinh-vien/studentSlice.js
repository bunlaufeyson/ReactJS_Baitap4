import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  selectedStudent: null,
  searchKeyword: "",
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.maSV !== action.payload
      );
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student.maSV === action.payload.maSV
      );
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    selectStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
    clearSelectedStudent: (state) => {
      state.selectedStudent = null;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
  },
});

export const {
  addStudent,
  deleteStudent,
  updateStudent,
  selectStudent,
  clearSelectedStudent,
  setSearchKeyword,
} = studentSlice.actions;

export default studentSlice.reducer;
