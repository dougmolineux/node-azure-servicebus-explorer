import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API, PostRequestBody } from '../structs';

const defaultUrl = 'http://localhost:3000';

enum ApiRoutes {
  GET = 'peek',
  POST = 'set-env',
}

export const getApi = (http: HttpClient, url = defaultUrl): API => ({
  getTopics: (): Observable<any> => http.get(`${url}/${ApiRoutes.GET}`),

  postEnv: (env: PostRequestBody): Observable<any> =>
    http.post(`${url}/${ApiRoutes.POST}`, env),
});
