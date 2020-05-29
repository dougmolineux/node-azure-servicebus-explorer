import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { processMessages } from './functions';
import { API, getApi } from './structs';
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
  private api: API;

  constructor(private http: HttpClient) {
    this.api = getApi(this.http);
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.api.getTopics().subscribe(this.handleMessages));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public updateConnection = (): void => {
    this.subscriptions.add(
      this.api.postEnv(this.env).subscribe(this.handlePostResponse)
    );
  };

  public restartServer = (): void => {
    console.log('restartServer');
  };

  private handleMessages = (messages: any[] = []): void => {
    this.messages = processMessages(messages);
  };

  private handlePostResponse = (res: any): void => {
    console.log('POST response', res);
  };
}
