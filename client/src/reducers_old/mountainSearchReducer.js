import { SEARCH_MOUNTAINS, CLEAR_SEARCH_MOUNTAINS } from "../actions_old/types";

export default function(state = [], action) {
  switch (action.type) {
    case SEARCH_MOUNTAINS:
      return action.payload;
    case CLEAR_SEARCH_MOUNTAINS:
      return [];
    default:
      return state;
  }
}
