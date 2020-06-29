import { Observable } from 'rxjs';
import { Connection } from './connection';

export interface API {
  addSavedConnection: (connection: Connection) => Observable<any>;
  getSavedConnections: () => Observable<Connection[]>;
  getTopics: () => Observable<any>;
}
