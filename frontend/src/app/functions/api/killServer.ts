import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { noteError } from './noteError';

export const killServer = ({ http, url }: ApiConfig): Observable<any> =>
  http.post(`${url}/${ApiRoutes.kill}`, null).pipe(
    catchError((error: any) => {
      noteError('restart server', error);
      return of();
    })
  );
