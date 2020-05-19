import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'node-azure-servicebus-explorer-fe';

  messages = null;

  apiUrl = 'http://localhost:3000';

  getTopics() {
    return this.http.get(this.apiUrl + '/peek');
  }

  constructor(private http: HttpClient) {
    this.getTopics().subscribe((msgs) => {
      this.messages = msgs;
    });
  }
}
