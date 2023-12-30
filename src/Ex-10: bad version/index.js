function firstBadVersion(isBad) {
	// firstBadVersion receive a check function isBad
  // and should return a closure which accepts a version number(integer)
  return (version) => {
    const badVersion = findFirstVersion(0, version, isBad);
    return badVersion;
  }
}

function findFirstVersion(lowerPossibleVersion, upperPossibleVersion, isBad) {
    if(lowerPossibleVersion >= upperPossibleVersion) {
        if(isBad(lowerPossibleVersion)) {
          return lowerPossibleVersion;
        } else {
          return -1
        }
    }
    const midWay = Math.floor((lowerPossibleVersion + upperPossibleVersion) / 2);
    const isMidWayBadVersion = isBad(midWay);
    if(isMidWayBadVersion) {
        return findFirstVersion(lowerPossibleVersion, midWay, isBad);
    } else {
        return findFirstVersion(midWay + 1, upperPossibleVersion, isBad);
    }
}

firstBadVersion((i) => i >= 4)(100) 