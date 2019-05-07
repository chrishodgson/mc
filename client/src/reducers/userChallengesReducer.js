import { FETCH_USER_CHALLENGE } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USER_CHALLENGE:
      return [...state, action.payload];
    default:
      return state;
  }
}