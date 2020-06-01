import { HttpClient } from '@angular/common/http';

export interface ApiConfig {
  http: HttpClient;
  url: string;
}
