import { Observable, of } from 'rxjs';
import { catchError, mergeMap, retryWhen } from 'rxjs/operators';
import { Connection } from '../../structs';
import { ApiConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { noteError } from './noteError';
import { retryGet } from './retryGet';

const handleError = (error: any): Observable<Connection[]> => {
  noteError({ action: 'get saved connections', error, shouldAlert: true });
  return of([]);
};

export const getSavedConnections = ({
  http,
  url,
}: ApiConfig): Observable<Connection[]> =>
  http.get<Connection[]>(`${url}/${ApiRoutes.env}`).pipe(
    retryWhen((errors) => errors.pipe(mergeMap(retryGet))),
    catchError(handleError)
  );
