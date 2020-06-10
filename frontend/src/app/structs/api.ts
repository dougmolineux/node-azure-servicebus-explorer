import { Observable } from 'rxjs';
import { Connection } from './connection';
import { PostRequestBody } from './postRequestBody';

export interface API {
  getSavedConnections: () => Observable<Connection[]>;
  getTopics: () => Observable<any>;
  postEnv: (env: PostRequestBody) => Observable<any>;
}
