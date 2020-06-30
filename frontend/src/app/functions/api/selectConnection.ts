import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../../structs';
import { ApiConnectionConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { noteError } from './noteError';

const handleError = (error: any): Observable<any> => {
  noteError('select connection', error);
  return of();
};

export const selectConnection = ({
  http,
  url,
  connection,
}: ApiConnectionConfig): Observable<ApiResponse> =>
  http.put(`${url}/${ApiRoutes.env}`, connection).pipe(catchError(handleError));
