const isUndefinedOrNull = obj => obj === undefined || obj === null;

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