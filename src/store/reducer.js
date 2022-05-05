import { combineReducers } from "redux";

// reducer import
import characterReducer from "./reducers/character.reducer";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  character: characterReducer,
});

export default reducer;
