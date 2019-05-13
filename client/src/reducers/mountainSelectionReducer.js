
import _ from "lodash";
import { SELECT_MOUNTAINS, CLEAR_SELECTED_MOUNTAINS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case SELECT_MOUNTAINS:
      const mountainId = action.payload["mountainId"] || null;

      if (mountainId) {
        const newState = _.filter(state, item => {
          return item._id !== mountainId;
        });
        return newState;
      }

      return [...state, action.payload];
    case CLEAR_SELECTED_MOUNTAINS:
      return [];
    default:
      return state;
  }
}