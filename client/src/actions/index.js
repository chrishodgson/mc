import axios from "axios";
import {
  FETCH_USER, 
  FETCH_CHALLENGES,
  FETCH_USER_CHALLENGE,
  FETCH_ACTIVITIES, 
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
 * User Challenges
 */
export const fetchUserChallenge = challengeId => async dispatch => {
  const res = await axios.get("/api/userChallenge", {
    params: { challengeId }
  });

  dispatch({ type: FETCH_USER_CHALLENGE, payload: res.data });
};

export const addUserChallenge = (challengeId, history) => async dispatch => {
  const res = await axios.post("/api/userChallenges", challengeId);

  history.push("/dashboard");
  dispatch({ type: FETCH_USER, payload: res.data });
};


/**
 * Challenges
 */
 export const fetchChallenges = () => async dispatch => {
  const res = await axios.get("/api/challenges");

  dispatch({ type: FETCH_CHALLENGES, payload: res.data });
};

