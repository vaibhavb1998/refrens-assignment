import { createSlice } from "@reduxjs/toolkit";

// project imports
import { apiCallBegan } from "../api";

// ==============================|| CHARACTER REDUCER ||============================== //

const slice = createSlice({
  name: "character",

  initialState: {
    results: [],
    info: {},
    error: {},
    loading: false,
  },

  reducers: {
    // character list
    characterListRequestedAction: (state) => {
      state.loading = true;
    },

    characterListSuccessAction: (state, action) => {
      state.loading = false;
      state.results = action.payload.results;
      state.info = action.payload.info;
    },

    characterListFailedAction: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  // character list
  characterListRequestedAction,
  characterListSuccessAction,
  characterListFailedAction,
} = slice.actions;

export const getCharactersList = (payload) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: payload.url,
      method: "GET",
      onStart: characterListRequestedAction.type,
      onSuccess: characterListSuccessAction.type,
      onError: characterListFailedAction.type,
    }),
  );
};
