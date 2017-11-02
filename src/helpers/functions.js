const isUndefinedOrNull = obj => obj === undefined || obj === null;

export function getProperty(obj, ...props) {
  let result = obj;

  for (let prop of props) {
    if (isUndefinedOrNull(result) || isUndefinedOrNull(prop)) {
      return undefined;
    }

    result = result[prop];
  }

  return result;
}

export function combineGetters(obj, ...fs) {
  let result = obj;

  for (let f of fs) {
    if (isUndefinedOrNull(result) || isUndefinedOrNull(f)) {
      return undefined;
    }

    result = f(result);
  }

  return result;
}