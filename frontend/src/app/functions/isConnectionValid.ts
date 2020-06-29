import { Connection } from '../structs';

export const isConnectionValid = (connection: Connection): boolean =>
  Object.values(connection).every(Boolean);
