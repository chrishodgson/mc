import { FETCH_USER_CHALLENGES } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USER_CHALLENGES:
    return action.payload;
    default:
      return state;
  }
}