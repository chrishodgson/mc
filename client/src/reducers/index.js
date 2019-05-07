import { combineReducers } from "redux";
import authReducer from "./authReducer";
import activitiesReducer from "./activitiesReducer";
import challengesReducer from "./challengesReducer";
import userChallengesReducer from "./userChallengesReducer";

// import { reducer as reduxForm } from "redux-form";
// import mountainSearchReducer from "./mountainSearchReducer";
// import mountainSelectionReducer from "./mountainSelectionReducer";
// import mountainListSearchReducer from "./mountainListSearchReducer";
// import mountainListSelectionReducer from "./mountainListSelectionReducer";

export default combineReducers({
  auth: authReducer,
  activities: activitiesReducer,
  challenges: challengesReducer,
  userChallenges: userChallengesReducer
  
  // mountainSearch: mountainSearchReducer,
  // mountainSelection: mountainSelectionReducer,
  // mountainListSearch: mountainListSearchReducer,
  // mountainListSelection: mountainListSelectionReducer,
  // form: reduxForm
});
