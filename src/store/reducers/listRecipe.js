import { GET_LIST_RECIPE_PENDING, GET_LIST_RECIPE_SUCCESS, GET_LIST_RECIPE_FAILED } from '../types';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  pagination: [],
  error: null
};

const listRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_RECIPE_PENDING:
      return { ...state, isLoading: true };
    case GET_LIST_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
        pagination: action.payload.pagination
      };
    case GET_LIST_RECIPE_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload
      };
    default:
      return state;
  }
};

export default listRecipeReducer;
