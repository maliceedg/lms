import { Component } from '@angular/core';
import { AlertsService } from './shared/services/alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lms';

  constructor(private alertsService: AlertsService) {

  }

  confirm(id?: any) {
    this.alertsService.confirm(id);
  }

  reject(id?: any) {
    this.alertsService.reject(id);
  }
}
