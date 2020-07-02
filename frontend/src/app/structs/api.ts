import { Observable } from 'rxjs';
import { Connection } from './connection';

export interface ApiResponse {
  succeeded: boolean;
  message: string;
}

export interface API {
  addSavedConnection: (connection: Connection) => Observable<ApiResponse>;
  getSavedConnections: () => Observable<Connection[]>;
  getTopics: () => Observable<any[]>;
  killServer: () => Observable<ApiResponse>;
  removeSavedConnection: (connection: Connection) => Observable<ApiResponse>;
  selectSavedConnection: (connection: Connection) => Observable<ApiResponse>;
}
