import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { processMessages } from './functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  public title = 'node-azure-servicebus-explorer-fe';
  public messages: string[] = [];

  private subscriptions = new Subscription();
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.subscriptions.add(this.getTopics().subscribe(this.handleMessages));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public updateConnection = (): void => {
    console.log('updateConnection');
  };

  public restartServer = (): void => {
    console.log('restartServer');
  };

  private getTopics = (): Observable<any> =>
    this.http.get(`${this.apiUrl}/peek`);

  private handleMessages = (messages: any[] = []): void => {
    this.messages = processMessages(messages);
  };
}
