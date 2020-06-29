import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../../structs';
import { ApiConnectionConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { noteError } from './noteError';

const handleError = (error: any): Observable<any> => {
  noteError('add saved connection', error);
  return of();
};

export const addSavedConnection = ({
  http,
  url,
  connection,
}: ApiConnectionConfig): Observable<ApiResponse> =>
  http
    .post(`${url}/${ApiRoutes.env}`, connection)
    .pipe(catchError(handleError));
