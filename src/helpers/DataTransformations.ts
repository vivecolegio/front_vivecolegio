export function removeEmptyStringElements(obj: any) {
    for (const prop in obj) {
      if (typeof obj[prop] === 'object') {
        removeEmptyStringElements(obj[prop]);
      } else if (obj[prop] === '') {
        // delete elements that are empty strings
        delete obj[prop];
      }
    }
    return obj;
  }