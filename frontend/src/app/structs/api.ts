import { Observable } from 'rxjs';
import { PostRequestBody } from './postRequestBody';

export interface API {
  getTopics: () => Observable<any>;
  postEnv: (env: PostRequestBody) => Observable<any>;
}
