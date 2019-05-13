import { FETCH_MOUNTAIN_LIST } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MOUNTAIN_LIST:
      return [...state, action.payload]; //will this overwrite existing ?
    default:
      return state;
  }
}