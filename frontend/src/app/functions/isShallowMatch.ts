import { isDefined } from './isDefined';

const hasSameNumKeys = <T>(a: T, b: T): boolean =>
  Object.keys(a).length === Object.keys(b).length;

export const isShallowMatch = <T>(a: T, b: T): boolean =>
  isDefined(a) &&
  isDefined(b) &&
  Object.keys(a).every((key) => a[key] === b[key]) &&
  hasSameNumKeys<T>(a, b);
