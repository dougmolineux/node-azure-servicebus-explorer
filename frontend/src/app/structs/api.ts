import { Observable } from 'rxjs';
import { Connection } from './connection';

export interface API {
  getSavedConnections: () => Observable<Connection[]>;
  getTopics: () => Observable<any>;
  postEnv: (env: Connection) => Observable<any>;
}
