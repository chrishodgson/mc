import { FETCH_AREAS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_AREAS:
      return action.payload;
    default:
      return state;
  }
}