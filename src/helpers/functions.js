import { VK_TOKEN_KEY } from './const';

export const getAuthorisationData = () => JSON.parse(localStorage.getItem(VK_TOKEN_KEY));

export const setAuthorisationData = data => localStorage.setItem(VK_TOKEN_KEY, JSON.stringify(data));

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

export function chunkise(arr, CHUNK_SIZE = 100) {
  return Array(Math.ceil(arr.length / CHUNK_SIZE))
    .fill([])
    .map((_, i) => arr.slice(CHUNK_SIZE * i, CHUNK_SIZE * (i + 1)));
}

export function urlise(uri, params) {
  return `${uri}?${Object.entries(params).map(entry => entry.join('=')).join('&')}`
}

export function flatMap(arr) {
  return arr.reduce((a, e) => [...a, ...e], []);
}