import { FETCH_MY_CHALLENGES } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MY_CHALLENGES:
      return action.payload;
    default:
      return state;
  }
}
