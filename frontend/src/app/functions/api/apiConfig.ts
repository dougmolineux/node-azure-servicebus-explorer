import { HttpClient } from '@angular/common/http';
import { Connection, EditSavedConnection } from '../../structs';

export interface ApiConfig {
  http: HttpClient;
  url: string;
}

export interface ApiConnectionConfig extends ApiConfig {
  connection: Connection;
}

export interface ApiEditConfig extends ApiConfig {
  config: EditSavedConnection;
}
