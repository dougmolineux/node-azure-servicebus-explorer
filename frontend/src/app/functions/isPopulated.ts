import { isDefined } from './isDefined';

export const isPopulated = (val: string): boolean =>
  isDefined(val) && val !== '';
