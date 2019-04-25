import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import activitiesReducer from "./activitiesReducer";
import challengesReducer from "./challengesReducer";
import mountainSearchReducer from "./mountainSearchReducer";
import mountainSelectionReducer from "./mountainSelectionReducer";
import mountainListSearchReducer from "./mountainListSearchReducer";
import mountainListSelectionReducer from "./mountainListSelectionReducer";

export default combineReducers({
  auth: authReducer,
  activities: activitiesReducer,
  challenges: challengesReducer,
  mountainSearch: mountainSearchReducer,
  mountainSelection: mountainSelectionReducer,
  mountainListSearch: mountainListSearchReducer,
  mountainListSelection: mountainListSelectionReducer,
  form: reduxForm
});
