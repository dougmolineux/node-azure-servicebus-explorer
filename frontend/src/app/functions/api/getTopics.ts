import { Observable } from 'rxjs';
import { ApiConfig } from './apiConfig';
import { ApiRoutes } from './apiRoutes';

export const getTopics = ({ http, url }: ApiConfig): Observable<any> =>
  http.get(`${url}/${ApiRoutes.peek}`);
