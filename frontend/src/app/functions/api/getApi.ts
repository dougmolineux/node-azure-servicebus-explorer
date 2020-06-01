import { HttpClient } from '@angular/common/http';
import { API, PostRequestBody } from '../../structs';
import { getTopics } from './getTopics';
import { postEnv } from './postEnv';

const defaultUrl = 'http://localhost:3000';

export const getApi = (http: HttpClient, url = defaultUrl): API => ({
  getTopics: () => getTopics({ http, url }),
  postEnv: (env: PostRequestBody) => postEnv({ http, url, env }),
});
