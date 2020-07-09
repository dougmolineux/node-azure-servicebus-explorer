import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, EditSavedConnection } from '../../structs';
import { simplify } from '../simplify';
import { ApiEditConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { noteError } from './noteError';

const simplifyConfig = (config: EditSavedConnection): EditSavedConnection => ({
  oldVersion: simplify(config.oldVersion),
  newVersion: simplify(config.newVersion),
});

const handleError = (error: any): Observable<ApiResponse> => {
  const message = noteError({ action: 'edit saved connection', error });
  return of({ succeeded: false, message });
};

export const editSavedConnection = ({
  http,
  url,
  config,
}: ApiEditConfig): Observable<ApiResponse> =>
  http
    .patch<ApiResponse>(`${url}/${ApiRoutes.env}`, simplifyConfig(config))
    .pipe(catchError(handleError));
