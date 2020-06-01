import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { PostRequestBody } from '../../structs';
import { ApiRoutes } from './apiRoutes';

export const postEnv = ({
  http,
  url,
  env,
}: {
  http: HttpClient;
  url: string;
  env: PostRequestBody;
}): Observable<any> =>
  http
    .post(`${url}/${ApiRoutes.setEnv}`, env)
    .pipe(
      flatMap(
        (response: any): Observable<any> =>
          http.post(`${url}/${ApiRoutes.kill}`, null)
      )
    );
