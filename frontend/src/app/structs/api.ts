import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostRequestBody } from './postRequestBody';

const defaultUrl = 'http://localhost:3000';

enum ApiRoutes {
  GET = 'peek',
  POST = 'set-env',
}

export interface API {
  getTopics: () => Observable<any>;
  postEnv: (env: PostRequestBody) => Observable<any>;
}

export const getApi = (http: HttpClient, url = defaultUrl): API => ({
  getTopics: (): Observable<any> => http.get(`${url}/${ApiRoutes.GET}`),

  postEnv: (env: PostRequestBody): Observable<any> =>
    http.post(`${url}/${ApiRoutes.POST}`, env),
});
