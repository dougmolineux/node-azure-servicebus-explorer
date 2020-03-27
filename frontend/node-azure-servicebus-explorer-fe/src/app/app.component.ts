import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'node-azure-servicebus-explorer-fe';

  topics = [
    {name: 'example topic 1'},
    {name: 'example topic 2'},
    {name: 'example topic 3'},
    {name: 'example topic 4'},
  ];

  constructor() {
  }

}
