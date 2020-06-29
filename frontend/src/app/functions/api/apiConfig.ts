import { HttpClient } from '@angular/common/http';
import { Connection } from '../../structs';

export interface ApiConfig {
  http: HttpClient;
  url: string;
}

export interface ApiConnectionConfig extends ApiConfig {
  connection: Connection;
}
