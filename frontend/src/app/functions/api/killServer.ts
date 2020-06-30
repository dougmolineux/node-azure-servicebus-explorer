import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../../structs';
import { ApiConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { noteError } from './noteError';

const handleError = (error: any): Observable<ApiResponse> => {
  const message = noteError({ action: 'restart server', error });
  return of({ succeeded: false, message });
};

export const killServer = ({ http, url }: ApiConfig): Observable<ApiResponse> =>
  http
    .post<ApiResponse>(`${url}/${ApiRoutes.kill}`, null)
    .pipe(catchError(handleError));
