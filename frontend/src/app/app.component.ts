import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { getApi, isEnvValid, processMessages } from './functions';
import { API, Connection } from './structs';
import { emptyPostRequestBody } from './structs/mocks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  public title = 'node-azure-servicebus-explorer-fe';
  public env = emptyPostRequestBody;
  public isLoadingSavedConnections = false;
  public savedConnections: Connection[] = [];
  public isLoadingMessages = false;
  public messages: string[] = [];

  private subscriptions = new Subscription();
  private api: API;

  constructor(private http: HttpClient) {
    this.api = getApi(this.http);
  }

  public ngOnInit(): void {
    this.fetchSavedConnections();
    this.fetchMessages();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public updateConnection = (): void => {
    if (!isEnvValid(this.env)) {
      alert('Connection info is incomplete or invalid.');
      return;
    }
    this.submitEnv();
  };

  private unsubscribe = (subscription: Subscription): void => {
    subscription.unsubscribe();
    this.subscriptions.remove(subscription);
  };

  private fetchSavedConnections = (): void => {
    this.savedConnections = [];
    this.isLoadingSavedConnections = true;
    const subscription = this.subscriptions.add(
      this.api.getSavedConnections().subscribe((savedConnections): void => {
        this.handleSavedConnections(savedConnections);
        this.unsubscribe(subscription);
        this.isLoadingSavedConnections = false;
      })
    );
  };

  private handleSavedConnections = (
    savedConnections: Connection[] = []
  ): void => {
    this.savedConnections = savedConnections;
  };

  private fetchMessages = (): void => {
    this.messages = [];
    this.isLoadingMessages = true;
    const subscription = this.subscriptions.add(
      this.api.getTopics().subscribe((messages): void => {
        this.handleMessages(messages);
        this.unsubscribe(subscription);
        this.isLoadingMessages = false;
      })
    );
  };

  private handleMessages = (messages: any[] = []): void => {
    this.messages = processMessages(messages);
  };

  private submitEnv = (): void => {
    const subscription = this.subscriptions.add(
      this.api.postEnv(this.env).subscribe((response): void => {
        this.handlePostResponse(response);
        this.unsubscribe(subscription);
      })
    );
  };

  private handlePostResponse = (response: any): void => {
    this.fetchMessages();
  };
}
