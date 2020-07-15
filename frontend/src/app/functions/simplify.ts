import { Connection } from '../structs';

/** Removes metadata. */
export const simplify = (connection: Connection): Connection => {
  const { isActive, ...simplified } = connection;
  return simplified;
};
