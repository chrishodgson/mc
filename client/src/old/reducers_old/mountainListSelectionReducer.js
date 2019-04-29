import _ from "lodash";
import { SELECT_MOUNTAIN_LISTS } from "../actions_old/types";

export default function(state = [], action) {
  switch (action.type) {
    case SELECT_MOUNTAIN_LISTS:
      const mountainListId = action.payload["mountainListId"] || null;

      if (mountainListId) {
        const newState = _.filter(state, item => {
          return item._id !== mountainListId;
        });
        return newState;
      }

      return [...state, action.payload];
    default:
      return state;
  }
}
