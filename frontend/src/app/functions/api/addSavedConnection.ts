import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../../structs';
import { ApiConnectionConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { noteError } from './noteError';

const handleError = (error: any): Observable<ApiResponse> => {
  const message = noteError({ action: 'add saved connection', error });
  return of({ succeeded: false, message });
};

export const addSavedConnection = ({
  http,
  url,
  connection,
}: ApiConnectionConfig): Observable<ApiResponse> =>
  http
    .post<ApiResponse>(`${url}/${ApiRoutes.env}`, connection)
    .pipe(catchError(handleError));
