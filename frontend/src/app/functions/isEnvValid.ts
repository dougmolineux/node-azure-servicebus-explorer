import { PostRequestBody } from '../structs';

export const isEnvValid = (env: PostRequestBody): boolean =>
  Object.values(env).every(Boolean);
