import axios from "axios";
import {
  FETCH_USER, 
  FETCH_MY_ACTIVITIES, 
  FETCH_MY_CHALLENGES
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
export const fetchMyActivities = () => async dispatch => {
  const res = await axios.get("/api/myactivities");

  dispatch({ type: FETCH_MY_ACTIVITIES, payload: res.data });
};


/**
 * Challenges
 */
export const fetchMyChallenges = () => async dispatch => {
  const res = await axios.get("/api/mychallenges");

  dispatch({ type: FETCH_MY_CHALLENGES, payload: res.data });
};
