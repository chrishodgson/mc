import axios from "axios";
import {
  FETCH_USER,
  FETCH_CHALLENGES,
  FETCH_ACTIVITIES,
  SEARCH_MOUNTAINS,
  CLEAR_SEARCH_MOUNTAINS,
  SELECT_MOUNTAINS,
  CLEAR_SELECT_MOUNTAINS,
  SEARCH_MOUNTAIN_LISTS,
  SELECT_MOUNTAIN_LISTS
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

// Challenges
export const submitChallenge = (values, history) => async dispatch => {
  const res = await axios.post("/api/challenges", values);

  history.push("/dashboard");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchChallenges = () => async dispatch => {
  const res = await axios.get("/api/challenges");

  dispatch({ type: FETCH_CHALLENGES, payload: res.data });
};

// Mountains
export const searchMountains = (term, country) => async dispatch => {
  const res = await axios.get("/api/mountains", {
    params: { term: term, country: country }
  });

  dispatch({ type: SEARCH_MOUNTAINS, payload: res.data });
};

export const clearMountainSearch = () => {
  return { type: CLEAR_SEARCH_MOUNTAINS };
};

export const selectMountain = mountain => {
  return { type: SELECT_MOUNTAINS, payload: mountain };
};

export const deSelectMountain = mountainId => {
  return { type: SELECT_MOUNTAINS };
};

export const clearMountainSelection = () => {
  return { type: CLEAR_SELECT_MOUNTAINS };
};

// Mountain Lists
export const searchMountainLists = country => async dispatch => {
  const res = await axios.get("/api/mountainLists", {
    params: { country }
  });

  dispatch({ type: SEARCH_MOUNTAIN_LISTS, payload: res.data });
};

export const selectMountainList = mountainList => {
  return { type: SELECT_MOUNTAIN_LISTS, payload: mountainList };
};

export const deSelectMountainList = mountainListId => {
  return { type: SELECT_MOUNTAIN_LISTS, payload: { mountainListId } };
};

// Activities
export const submitActivity = (
  activityDetails,
  mountains,
  history
) => async dispatch => {
  const res = await axios.post("/api/activities", {
    activityDetails,
    mountains
  });

  history.push("/dashboard");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchActivities = () => async dispatch => {
  const res = await axios.get("/api/activities");

  dispatch({ type: FETCH_ACTIVITIES, payload: res.data });
};
