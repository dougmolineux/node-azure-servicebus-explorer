import { Connection } from '../structs';

export const isEnvValid = (env: Connection): boolean =>
  Object.values(env).every(Boolean);
