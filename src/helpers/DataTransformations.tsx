export function removeEmptyStringElements(obj: any) {
  for (const prop in obj) {
    if (typeof obj[prop] === 'object') {
      removeEmptyStringElements(obj[prop]);
    } else if (obj[prop] === '') {
      delete obj[prop];
    }
  }
  return obj;
}

export function compare(a: any, b: any) {
  if (a.node) {
    if (a.node.student.code < b.node.student.code) {
      return -1;
    }
    if (a.node.student.code > b.node.student.code) {
      return 1;
    }
  } else {
    if (a.code < b.code) {
      return -1;
    }
    if (a.code > b.code) {
      return 1;
    }
  }
  return 0;
}

export function comparePerformanceLevelsTopScore(a: any, b: any) {
  if (a?.node?.topScore < b?.node?.topScore) {
    return -1;
  }
  if (a?.node?.topScore > b?.node?.topScore) {
    return 1;
  }
  return 0;
}


export function comparePerformanceLevelsTopScoreCriteriaRubric(a: any, b: any) {
  if (a?.performanceLevel?.topScore > b?.performanceLevel?.topScore) {
    return -1;
  }
  if (a?.performanceLevel?.topScore < b?.performanceLevel?.topScore) {
    return 1;
  }
  return 0;
}

export function calculateDaysTwoDate(date1: Date, date2: Date) {
  const dif = date2.getTime() - date1.getTime();
  const days = Math.floor(dif / (1000 * 60 * 60 * 24));
  return days;
}