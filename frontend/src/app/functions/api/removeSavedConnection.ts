import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../../structs';
import { ApiConnectionConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { noteError } from './noteError';
import { simplify } from './simplify';

const handleError = (error: any): Observable<ApiResponse> => {
  const message = noteError({ action: 'remove saved connection', error });
  return of({ succeeded: false, message });
};

export const removeSavedConnection = ({
  http,
  url,
  connection,
}: ApiConnectionConfig): Observable<ApiResponse> =>
  http
    .request<ApiResponse>('DELETE', `${url}/${ApiRoutes.env}`, {
      body: simplify(connection),
    })
    .pipe(catchError(handleError));
