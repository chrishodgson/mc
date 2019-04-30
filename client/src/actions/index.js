import axios from "axios";
import {
  FETCH_USER, 
  FETCH_ACTIVITIES, 
  FETCH_CHALLENGES
} from "./types";

/**
 * Users
 */
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};


/**
 * Activities
 */
export const fetchActivities = () => async dispatch => {
  const res = await axios.get("/api/activities");

  dispatch({ type: FETCH_ACTIVITIES, payload: res.data });
};


/**
 * Challenges
 */
export const fetchChallenges = () => async dispatch => {
  const res = await axios.get("/api/challenges");

  dispatch({ type: FETCH_CHALLENGES, payload: res.data });
};
