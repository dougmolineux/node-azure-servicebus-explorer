import { HttpClient } from '@angular/common/http';
import { API, Connection } from '../../structs';
import { getSavedConnections } from './getSavedConnections';
import { getTopics } from './getTopics';
import { postEnv as addSavedConnection } from './postEnv';

const defaultUrl = 'http://localhost:3000';

export const getApi = (http: HttpClient, url = defaultUrl): API => ({
  addSavedConnection: (connection: Connection) =>
    addSavedConnection({ http, url, env: connection }),
  getSavedConnections: () => getSavedConnections({ http, url }),
  getTopics: () => getTopics({ http, url }),
});
