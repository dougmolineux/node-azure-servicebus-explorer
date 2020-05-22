import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  public title = 'node-azure-servicebus-explorer-fe';
  public messages = null;

  private subscriptions = new Subscription();
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.subscriptions.add(this.getTopics().subscribe(this.handleMessages));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getTopics = (): Observable<any> =>
    this.http.get(`${this.apiUrl}/peek`);

  private handleMessages = (msgs: any[] = []): void => {
    this.messages = msgs;
  };
}
