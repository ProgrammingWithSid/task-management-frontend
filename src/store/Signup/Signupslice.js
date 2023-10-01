import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SignupResp: undefined,
  SignupUserResp: undefined,
  SignupErrorResp: undefined,
};

export const SignupSlice = createSlice({
  name: "Signup", // The name of the slice
  initialState, // The initial state
  reducers: {
    setSignupAct: (state, action) => {
      state.SignupResp = action.payload; // Corrected the property name
    },
    setSignupUserAct: (state, action) => {
      state.SignupUserResp = action.payload; // Corrected the property name
    },
    setSignupErrorAct: (state, action) => {
      state.SignupErrorResp = action.payload; // Corrected the property name
    },
  },
});

export default SignupSlice.reducer;
export const { setSignupAct, setSignupUserAct, setSignupErrorAct } = SignupSlice.actions; // Corrected the action names
