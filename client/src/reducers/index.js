import { combineReducers } from "redux";
import authReducer from "./authReducer";
import areasReducer from "./areasReducer";
import challengesReducer from "./challengesReducer";
import userChallengesReducer from "./userChallengesReducer";
// import { reducer as reduxForm } from "redux-form";

export default combineReducers({
  auth: authReducer,
  areas: areasReducer,
  challenges: challengesReducer,
  userChallenges: userChallengesReducer  
  // form: reduxForm
});
