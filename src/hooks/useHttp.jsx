import { useReducer, useCallback } from "react";

const ACTION_TYPES = {
  SEND: "SEND",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};

const httpReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SEND:
      return {
        loading: true,
        error: null
      };
    case ACTION_TYPES.SUCCESS:
      return {
        loading: false,
        error: null
      };
    case ACTION_TYPES.ERROR:
      return {
        loading: false,
        error: action.errorMessage
      };
    default:
      return state;
  }
};

const useHttp = (startAsLoading = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    loading: startAsLoading,
    error: null
  });

  const sendRequest = useCallback(async (request, requestData, callback) => {
    dispatch({ type: ACTION_TYPES.SEND });
    try {
      requestData
        ? await request(requestData, callback)
        : await request(callback);
      dispatch({ type: ACTION_TYPES.SUCCESS });
    } catch (error) {
      dispatch({ type: ACTION_TYPES.ERROR, errorMessage: error.message });
    }
  }, []);

  return [sendRequest, httpState];
};

export default useHttp;
