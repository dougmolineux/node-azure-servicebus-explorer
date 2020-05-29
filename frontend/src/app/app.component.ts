import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { processMessages } from './functions';
import { api } from './structs';
import { emptyPostRequestBody } from './structs/mocks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  public title = 'node-azure-servicebus-explorer-fe';
  public env = emptyPostRequestBody;
  public messages: string[] = [];

  private subscriptions = new Subscription();

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.subscriptions.add(this.getTopics().subscribe(this.handleMessages));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public updateConnection = (): void => {
    this.subscriptions.add(this.postEnv().subscribe(this.handlePostResponse));
  };

  public restartServer = (): void => {
    console.log('restartServer');
  };

  private getTopics = (): Observable<any> =>
    this.http.get(`${api.url}/${api.routes.GET}`);

  private postEnv = (): Observable<any> =>
    this.http.post(`${api.url}/${api.routes.POST}`, this.env);

  private handleMessages = (messages: any[] = []): void => {
    this.messages = processMessages(messages);
  };

  private handlePostResponse = (res: any): void => {
    console.log('POST response', res);
  };
}
