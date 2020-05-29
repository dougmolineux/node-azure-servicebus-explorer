import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { API, PostRequestBody } from '../structs';

const defaultUrl = 'http://localhost:3000';

enum ApiRoutes {
  peek = 'peek',
  setEnv = 'set-env',
  kill = 'kill',
}

export const getApi = (http: HttpClient, url = defaultUrl): API => ({
  getTopics: (): Observable<any> => http.get(`${url}/${ApiRoutes.peek}`),

  postEnv: (env: PostRequestBody): Observable<any> =>
    http
      .post(`${url}/${ApiRoutes.setEnv}`, env)
      .pipe(
        flatMap(
          (response: any): Observable<any> =>
            http.post(`${url}/${ApiRoutes.kill}`, null)
        )
      ),
});
