import _ from "lodash";

export const findUserChallengeByChallengeIdSelector = (challengeId, userChallenges) => {
  return _.find(userChallenges, item => { 
    return item._challengeId === challengeId; 
  });
}

export const groupMountainsByAreaSelector = (mountains, areas) => {
  if (mountains.length === 0) {
    return [];
  }
  return _.compact(areas.map(area => {
      const filteredMountains = _.filter(mountains, {_areaId: area._id});
      return filteredMountains.length !== 0 ? {_id: area._id, name: area.name, mountains: filteredMountains} : null;
  }));
}

export const percentageCompleteSelector = userChallenge => {
  const climbedCount = userChallenge.climbedCount || 0,
        mountainCount = userChallenge.mountainCount || 0;
  if (climbedCount === 0 || mountainCount === 0) {
    return 0;
  }
  return Math.floor(climbedCount / mountainCount * 100);
};

// export const flagMountainsClimbedSelectror(mountains, climbedIds) {
//   return mountains.map(mountain => {
//       // const climbed = _.find(climbedIds, mountain._id);
//       const mountainNew = mountain.climbed = true;
//       return mountainNew;
//   });
// }
