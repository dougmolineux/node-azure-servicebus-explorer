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
  public connectionString = '';
  public topicName = '';
  public subscriptionName = '';
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
    this.postEnv().subscribe((res) => console.log('res', res));
  };

  public restartServer = (): void => {
    console.log('restartServer');
  };

  private getTopics = (): Observable<any> =>
    this.http.get(`${this.apiUrl}/peek`);

  private postEnv = (): Observable<any> => {
    const {
      connectionString: connString,
      topicName: topic,
      subscriptionName: sub,
    } = this;
    const body: any = { connString, topic, sub };
    return this.http.post(`${this.apiUrl}/set-env`, body);
  };

  private handleMessages = (messages: any[] = []): void => {
    this.messages = processMessages(messages);
  };
}
