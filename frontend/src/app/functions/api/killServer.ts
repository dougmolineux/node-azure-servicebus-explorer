import { Observable } from 'rxjs';
import { ApiConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';

export const killServer = ({ http, url }: ApiConfig): Observable<any> =>
  http.post(`${url}/${ApiRoutes.kill}`, null);
