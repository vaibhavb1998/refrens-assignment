import { createSlice } from "@reduxjs/toolkit";

// project imports
import { apiCallBegan } from "../api";

// ==============================|| CHARACTER REDUCER ||============================== //

const slice = createSlice({
  name: "character",

  initialState: {
    results: [],
    info: {},
    characterData: {},
    episodeList: [],
    episodeMasterList: [],
    // This are the ids for which the data has been fetched already
    episodeIdsFetched: [],
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

    // character by id
    characterByIdRequestedAction: (state) => {
      state.loading = true;
    },

    characterByIdSuccessAction: (state, action) => {
      state.loading = false;
      state.characterData = action.payload;
    },

    characterByIdFailedAction: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // episode by id
    episodeListRequestedAction: (state) => {
      state.loading = true;
    },

    episodeListSuccessAction: (state, action) => {
      state.loading = false;
      state.episodeList = action.payload;
    },

    episodeListFailedAction: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // episode master list
    episodeMasterListRequestedAction: (state) => {
      state.loading = true;
    },

    episodeMasterListSuccessAction: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.loading = false;
        state.episodeMasterList = [
          ...state.episodeMasterList,
          ...action.payload,
        ];
      } else {
        state.loading = false;
        state.episodeMasterList = [...state.episodeMasterList, action.payload];
      }
    },

    episodeMasterListFailedAction: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // episode ids fetched (this reducer sets all the ids has been fetched)
    episodeIdsFetchedSuccessAction: (state, action) => {
      state.loading = false;
      state.episodeIdsFetched = [...state.episodeIdsFetched, ...action.payload];
    },
  },
});

export default slice.reducer;

export const {
  // character list
  characterListRequestedAction,
  characterListSuccessAction,
  characterListFailedAction,

  // character by id
  characterByIdRequestedAction,
  characterByIdSuccessAction,
  characterByIdFailedAction,

  // character by id
  episodeListRequestedAction,
  episodeListSuccessAction,
  episodeListFailedAction,

  // episode master list
  episodeMasterListRequestedAction,
  episodeMasterListSuccessAction,
  episodeMasterListFailedAction,

  // episode ids fetched
  episodeIdsFetchedSuccessAction,
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

export const getCharacterById = (payload) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: payload.url,
      method: "GET",
      onStart: characterByIdRequestedAction.type,
      onSuccess: characterByIdSuccessAction.type,
      onError: characterByIdFailedAction.type,
    }),
  );
};

export const getEpisodeListOfCharacter = (payload) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: payload.url,
      method: "GET",
      onStart: episodeListRequestedAction.type,
      onSuccess: episodeListSuccessAction.type,
      onError: episodeListFailedAction.type,
    }),
  );
};

export const getAllEpisodeList = (payload) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: payload.url,
      method: "GET",
      onStart: episodeMasterListRequestedAction.type,
      onSuccess: episodeMasterListSuccessAction.type,
      onError: episodeMasterListFailedAction.type,
    }),
  );
};
