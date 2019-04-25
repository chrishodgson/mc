import { SEARCH_MOUNTAIN_LISTS } from "../actions_old/types";

export default function(state = [], action) {
  switch (action.type) {
    case SEARCH_MOUNTAIN_LISTS:
      return action.payload;
    default:
      return state;
  }
}
