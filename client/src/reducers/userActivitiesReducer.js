import { FETCH_USER_ACTIVITIES } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USER_ACTIVITIES:
      return action.payload;
    default:
      return state;
  }
}
