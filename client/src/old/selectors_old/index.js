import _ from "lodash";
import { createSelector } from "reselect";

const mountainsSelector = state => state.mountains;
const selectedMountainIdsSelector = state => state.selectedMountainIds;

export const getSelectedMountains = createSelector(
  [mountainsSelector, selectedMountainIdsSelector],
  (mountains, selectedMountainIds) => {
    return _.filter(mountains, mountain => {
      return _.indexOf(selectedMountainIds, mountain._id) > -1;
    });
  }
);
