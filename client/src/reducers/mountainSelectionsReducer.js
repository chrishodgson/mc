
import _ from "lodash";
import { SELECT_MOUNTAIN, DESELECT_MOUNTAIN, CLEAR_SELECTED_MOUNTAINS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case SELECT_MOUNTAIN:
      return [...state, action.payload];

    case DESELECT_MOUNTAIN:
      const mountainId = action.payload || null;

      if (!mountainId) {
        return state;
      }  

      const newState = _.filter(state, item => {
        return item._id !== mountainId;
      });
      return newState;

    case CLEAR_SELECTED_MOUNTAINS:
      return [];

    default:
      return state;
  }
}