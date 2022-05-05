import axios from "axios";

// project imports
import * as actions from "../api";

// ==============================|| AXIOS ||============================== //

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, params, onStart, onSuccess, onError } =
      action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      const response = await axios.request({
        url,
        method,
        data,
        params,
      });
      // General
      dispatch(actions.apiCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // General
      let message = "";
      if (error.response) {
        const { errorData } = error.response;
        message = errorData.message;
      }
      if (message) dispatch(actions.apiCallFailed(message));
      // Specific
      if (onError) dispatch({ type: onError, payload: message });
    }

    return null;
  };

export default api;
