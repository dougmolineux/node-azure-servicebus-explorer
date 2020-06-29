import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Connection } from '../../structs';
import { ApiConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { killServer } from './killServer';
import { noteError } from './noteError';

interface PostConfig extends ApiConfig {
  env: Connection;
}

const handleError = (error: any): Observable<any> => {
  noteError('update environment', error);
  return of();
};

export const postEnv = ({ http, url, env }: PostConfig): Observable<any> =>
  http.post(`${url}/${ApiRoutes.env}`, env).pipe(
    catchError(handleError),
    mergeMap((response: any) => killServer({ http, url }))
  );
