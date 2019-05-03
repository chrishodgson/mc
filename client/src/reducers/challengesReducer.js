import { FETCH_CHALLENGES } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CHALLENGES:
      return action.payload;
    default:
      return state;
  }
}
