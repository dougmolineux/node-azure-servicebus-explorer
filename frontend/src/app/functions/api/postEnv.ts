import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ApiConnectionConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { killServer } from './killServer';
import { noteError } from './noteError';

const handleError = (error: any): Observable<any> => {
  noteError('update environment', error);
  return of();
};

export const postEnv = ({
  http,
  url,
  connection,
}: ApiConnectionConfig): Observable<any> =>
  http.post(`${url}/${ApiRoutes.env}`, connection).pipe(
    catchError(handleError),
    mergeMap((response: any) => killServer({ http, url }))
  );
