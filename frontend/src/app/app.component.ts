import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'node-azure-servicebus-explorer-fe';
  public messages = null;

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.getTopics().subscribe((msgs) => {
      this.messages = msgs;
    });
  }

  private getTopics() {
    return this.http.get(this.apiUrl + '/peek');
  }
}
