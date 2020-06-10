import { Observable } from 'rxjs';
import { retryWithLimitAndDelay } from './retryWithLimitAndDelay';

export const retryGet = (error: any, index: number): Observable<any> =>
  retryWithLimitAndDelay({ error, index, action: 'GET' });
