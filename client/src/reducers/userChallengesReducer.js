import _ from "lodash";
import { FETCH_USER_CHALLENGE } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USER_CHALLENGE:
      const userChallengeId = (action.payload.userChallenge && action.payload.userChallenge._id) || null;

console.log(userChallengeId, 'userChallengeReducer - userChallengeId');

      if (userChallengeId) {
        const newState = _.filter(state, item => {
          return item._id !== userChallengeId;
        });
        return newState;
      }

      return [...state, action.payload];

      // return action.payload;
    default:
      return state;
  }
}