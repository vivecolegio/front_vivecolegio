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