import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

const defaultNumRetries = 4;
const defaultMsDelay = 500;
const defaultAction = 'Operation';

export const retryWithLimitAndDelay = ({
  error,
  index,
  numRetries = defaultNumRetries,
  msDelay = defaultMsDelay,
  action = defaultAction,
}: {
  error: any;
  index: number;
  numRetries?: number;
  msDelay?: number;
  action?: string;
}): Observable<any> => {
  const numRetry = index + 1;
  if (numRetry <= numRetries) {
    console.log(`${action} failed. Retry`, numRetry, 'of', numRetries);
    return of(error).pipe(delay(msDelay));
  }
  return throwError(error);
};
