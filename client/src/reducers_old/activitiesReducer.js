import { FETCH_ACTIVITIES } from "../actions_old/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return action.payload;
    default:
      return state;
  }
}
