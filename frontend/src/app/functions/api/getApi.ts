import { HttpClient } from '@angular/common/http';
import { API, Connection } from '../../structs';
import { addSavedConnection } from './addSavedConnection';
import { getSavedConnections } from './getSavedConnections';
import { getTopics } from './getTopics';

const defaultUrl = 'http://localhost:3000';

export const getApi = (http: HttpClient, url = defaultUrl): API => ({
  addSavedConnection: (connection: Connection) =>
    addSavedConnection({ http, url, connection }),
  getSavedConnections: () => getSavedConnections({ http, url }),
  getTopics: () => getTopics({ http, url }),
});
