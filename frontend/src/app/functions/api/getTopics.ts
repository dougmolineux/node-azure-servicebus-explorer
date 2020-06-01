import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from './apiRoutes';

export const getTopics = ({
  http,
  url,
}: {
  http: HttpClient;
  url: string;
}): Observable<any> => http.get(`${url}/${ApiRoutes.peek}`);
