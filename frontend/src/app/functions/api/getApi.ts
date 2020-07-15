import { HttpClient } from '@angular/common/http';
import { API, Connection, EditSavedConnection } from '../../structs';
import { addSavedConnection } from './addSavedConnection';
import { editSavedConnection } from './editSavedConnection';
import { getSavedConnections } from './getSavedConnections';
import { getTopics } from './getTopics';
import { killServer } from './killServer';
import { removeSavedConnection } from './removeSavedConnection';
import { selectSavedConnection } from './selectSavedConnection';

const defaultUrl = 'http://localhost:3000';

export const getApi = (http: HttpClient, url = defaultUrl): API => ({
  addSavedConnection: (connection: Connection) =>
    addSavedConnection({ http, url, connection }),
  editSavedConnection: (config: EditSavedConnection) =>
    editSavedConnection({ http, url, config }),
  getSavedConnections: () => getSavedConnections({ http, url }),
  getTopics: () => getTopics({ http, url }),
  killServer: () => killServer({ http, url }),
  removeSavedConnection: (connection: Connection) =>
    removeSavedConnection({ http, url, connection }),
  selectSavedConnection: (connection: Connection) =>
    selectSavedConnection({ http, url, connection }),
});
