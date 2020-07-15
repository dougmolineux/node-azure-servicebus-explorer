import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../../structs';
import { simplify } from '../simplify';
import { ApiConnectionConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { noteError } from './noteError';

const handleError = (error: any): Observable<ApiResponse> => {
  const message = noteError({ action: 'select saved connection', error });
  return of({ succeeded: false, message });
};

export const selectSavedConnection = ({
  http,
  url,
  connection,
}: ApiConnectionConfig): Observable<ApiResponse> =>
  http
    .put<ApiResponse>(`${url}/${ApiRoutes.env}`, simplify(connection))
    .pipe(catchError(handleError));
