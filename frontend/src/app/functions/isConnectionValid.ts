import { Connection } from '../structs';
import { simplify } from './simplify';

export const isConnectionValid = (connection: Connection): boolean =>
  Object.values(simplify(connection)).every(Boolean);
