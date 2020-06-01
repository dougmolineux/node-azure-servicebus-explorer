import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';
import { noteError } from './noteError';

export const getTopics = ({ http, url }: ApiConfig): Observable<any> =>
  http.get(`${url}/${ApiRoutes.peek}`).pipe(
    catchError((error: any) => {
      noteError('load messages', error);
      return of([]);
    })
  );
