import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../../structs';
import { ApiConnectionConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { noteError } from './noteError';
import { simplify } from './simplify';

const handleError = (error: any): Observable<ApiResponse> => {
  const message = noteError({ action: 'select connection', error });
  return of({ succeeded: false, message });
};

export const selectConnection = ({
  http,
  url,
  connection,
}: ApiConnectionConfig): Observable<ApiResponse> =>
  http
    .put<ApiResponse>(`${url}/${ApiRoutes.env}`, simplify(connection))
    .pipe(catchError(handleError));
