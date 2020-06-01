import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { PostRequestBody } from '../../structs';
import { ApiRoutes } from './apiRoutes';
import { killServer } from './killServer';

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
    .pipe(flatMap((response: any) => killServer({ http, url })));
