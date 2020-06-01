import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from './apiRoutes';

export const killServer = ({
  http,
  url,
}: {
  http: HttpClient;
  url: string;
}): Observable<any> => http.post(`${url}/${ApiRoutes.kill}`, null);
