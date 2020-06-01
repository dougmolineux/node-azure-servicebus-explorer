import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { PostRequestBody } from '../../structs';
import { ApiConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { killServer } from './killServer';

interface PostConfig extends ApiConfig {
  env: PostRequestBody;
}

export const postEnv = ({ http, url, env }: PostConfig): Observable<any> =>
  http
    .post(`${url}/${ApiRoutes.setEnv}`, env)
    .pipe(flatMap((response: any) => killServer({ http, url })));
