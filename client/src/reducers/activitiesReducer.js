import { FETCH_MY_ACTIVITIES } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MY_ACTIVITIES:
      return action.payload;
    default:
      return state;
  }
}
