import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  getApi,
  isConnectionValid,
  isDefined,
  isPopulated,
  processMessages,
} from './functions';
import { API, ApiResponse, Connection } from './structs';
import { emptyApiResponse, emptyConnection } from './structs/mocks';

const removeMessage = (connectionName: string): string =>
  `Remove saved connection?\n\n${connectionName}`;

const failureMessage = 'Operation failed.';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  public title = 'node-azure-servicebus-explorer-fe';
  public connection = { ...emptyConnection };
  public isLoadingSavedConnections = false;
  public savedConnections: Connection[] = [];
  public isActiveSavedConnection = false;
  public isLoadingMessages = false;
  public messages: string[] = [];
  public isEditing = false;

  private subscriptions = new Subscription();
  private api: API;
  private shouldResetMessages = false;
  private shouldGetMessages = false;
  private shouldKillServer = false;
  private connectionToEdit = { ...emptyConnection };

  constructor(private http: HttpClient) {
    this.api = getApi(this.http);
  }

  public ngOnInit(): void {
    this.getSavedConnectionsAndGetMessages();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public addSavedConnection = (): void => {
    if (!isConnectionValid(this.connection)) {
      alert('Connection info is incomplete or invalid.');
      return;
    }
    const subscription = this.subscriptions.add(
      this.api
        .addSavedConnection(this.connection)
        .subscribe((response): void => {
          this.handleAddSavedConnectionResponse(response);
          this.unsubscribe(subscription);
        })
    );
  };

  public connectionName = (connection: Connection): string =>
    `${connection.topic} - ${connection.sub}`;

  public selectSavedConnection = (connection: Connection): void => {
    if (connection.isActive) {
      return;
    }
    const subscription = this.subscriptions.add(
      this.api.selectSavedConnection(connection).subscribe((response): void => {
        this.handleSelectSavedConnectionResponse(response);
        this.unsubscribe(subscription);
      })
    );
  };

  public toggleEdit = (connection: Connection = null): void => {
    this.isEditing = connection !== null;
    this.connectionToEdit = { ...(connection || emptyConnection) };
    this.connection = { ...this.connectionToEdit };
  };

  public editConnection = (): void => {
    if (![this.connection, this.connectionToEdit].every(isConnectionValid)) {
      alert('Connection info is incomplete or invalid.');
      return;
    }
    console.log('submitting edit', this.connectionToEdit, this.connection);
  };

  public removeSavedConnection = (connection: Connection): void => {
    if (!confirm(removeMessage(this.connectionName(connection)))) {
      return;
    }
    this.shouldResetMessages = connection.isActive;
    const subscription = this.subscriptions.add(
      this.api.removeSavedConnection(connection).subscribe((response): void => {
        this.handleRemoveSavedConnectionResponse(response);
        this.unsubscribe(subscription);
      })
    );
  };

  private unsubscribe = (subscription: Subscription): void => {
    subscription.unsubscribe();
    this.subscriptions.remove(subscription);
  };

  private getSavedConnections = (): void => {
    this.isLoadingSavedConnections = true;
    const subscription = this.subscriptions.add(
      this.api.getSavedConnections().subscribe((savedConnections): void => {
        this.isLoadingSavedConnections = false;
        this.handleSavedConnections(savedConnections);
        this.unsubscribe(subscription);
      })
    );
  };

  private getSavedConnectionsAndGetMessages = (): void => {
    this.shouldGetMessages = true;
    this.getSavedConnections();
  };

  private getSavedConnectionsAndKillServer = (): void => {
    this.shouldKillServer = true;
    this.getSavedConnections();
  };

  private handleSavedConnections = (
    savedConnections: Connection[] = []
  ): void => {
    this.savedConnections = savedConnections;
    this.isActiveSavedConnection = isDefined(
      this.savedConnections.find((x) => x.isActive)
    );
    this.handleSavedConnectionsAfterEffects();
  };

  private handleSavedConnectionsAfterEffects = (): void => {
    if (this.shouldResetMessages) {
      this.messages = [];
    }
    if (this.shouldKillServer) {
      this.killServer();
    } else if (this.shouldGetMessages && this.isActiveSavedConnection) {
      this.getMessages();
    }
    this.shouldResetMessages = false;
    this.shouldGetMessages = false;
    this.shouldKillServer = false;
  };

  private getMessages = (): void => {
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

  private handleAddSavedConnectionResponse = (
    response: ApiResponse = emptyApiResponse
  ): void => {
    const { succeeded, message } = response;
    if (!succeeded) {
      alert(isPopulated(message) ? message : failureMessage);
      return;
    }
    this.selectSavedConnection(this.connection);
    this.connection = { ...emptyConnection };
  };

  private handleSelectSavedConnectionResponse = (
    response: ApiResponse = emptyApiResponse
  ): void => {
    const { succeeded, message } = response;
    if (!succeeded) {
      alert(isPopulated(message) ? message : failureMessage);
      return;
    }
    this.getSavedConnectionsAndKillServer();
  };

  private killServer = (): void => {
    const subscription = this.subscriptions.add(
      this.api.killServer().subscribe((response): void => {
        this.handleKillServerResponse(response);
        this.unsubscribe(subscription);
      })
    );
  };

  private handleKillServerResponse = (
    response: ApiResponse = emptyApiResponse
  ): void => {
    const { succeeded, message } = response;
    if (!succeeded) {
      alert(isPopulated(message) ? message : failureMessage);
      return;
    }
    this.getMessages();
  };

  private handleRemoveSavedConnectionResponse = (
    response: ApiResponse = emptyApiResponse
  ): void => {
    const { succeeded, message } = response;
    if (!succeeded) {
      alert(isPopulated(message) ? message : failureMessage);
      this.shouldResetMessages = false;
      return;
    }
    this.getSavedConnections();
  };
}
