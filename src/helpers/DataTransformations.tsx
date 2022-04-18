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
  if (a.code < b.code) {
    return -1;
  }
  if (a.code > b.code) {
    return 1;
  }
  return 0;
}
