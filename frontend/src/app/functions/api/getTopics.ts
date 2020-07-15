import { Observable, of } from 'rxjs';
import { catchError, mergeMap, retryWhen } from 'rxjs/operators';
import { ApiConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { noteError } from './noteError';
import { retryGet } from './retryGet';

const handleError = (error: any): Observable<any> => {
  noteError('load messages', error);
  return of([]);
};

export const getTopics = ({ http, url }: ApiConfig): Observable<any> =>
  http.get(`${url}/${ApiRoutes.peek}`).pipe(
    retryWhen((errors) => errors.pipe(mergeMap(retryGet))),
    catchError(handleError)
  );
