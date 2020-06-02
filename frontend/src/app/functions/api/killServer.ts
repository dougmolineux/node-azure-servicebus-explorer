import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { noteError } from './noteError';

const handleError = (error: any): Observable<any> => {
  noteError('restart server', error);
  return of();
};

export const killServer = ({ http, url }: ApiConfig): Observable<any> =>
  http.post(`${url}/${ApiRoutes.kill}`, null).pipe(catchError(handleError));
