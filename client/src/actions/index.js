import axios from "axios";
// import areas from '../data/areas.js'
// import challenges from '../data/challenges'

import {
  FETCH_USER,
  FETCH_AREAS, 
  FETCH_CHALLENGES,
  FETCH_USER_CHALLENGES,
  FETCH_MOUNTAIN_LIST
} from "./types";

/**
 * Areas - static JSON
 */
// export const fetchAreas = () => dispatch => { 
//   dispatch({ type: FETCH_AREAS, payload: areas });
// };

export const fetchAreas = () => async dispatch => {
  const res = await axios.get("/api/areas");

  dispatch({ type: FETCH_AREAS, payload: res.data });
};

/**
 * Challenges - static JSON
 */
// export const fetchChallenges = () => dispatch => {
//   dispatch({ type: FETCH_CHALLENGES, payload: challenges });
// };

export const fetchChallenges = () => async dispatch => {
  const res = await axios.get("/api/challenges");

  dispatch({ type: FETCH_CHALLENGES, payload: res.data });
};

/**
 * Users
 */
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

/**
 * User Challenges
 */
export const fetchUserChallenges = () => async dispatch => {
  const res = await axios.get("/api/userChallenges");

  dispatch({ type: FETCH_USER_CHALLENGES, payload: res.data });
};

export const addUserChallenge = (challengeId, history) => async dispatch => {
  const res = await axios.post("/api/userChallenges", challengeId);

  history.push("/dashboard");
  dispatch({ type: FETCH_USER, payload: res.data });
};


/**
 * User Mountain List
 */
export const fetchMountainList = mountainListId => async dispatch => {
  const res = await axios.get("/api/mountainList", {
    params: { mountainListId }
  });

  dispatch({ type: FETCH_MOUNTAIN_LIST, payload: res.data });
};
