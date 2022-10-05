import { Injectable, EventEmitter } from '@angular/core';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  send: EventEmitter<boolean> = new EventEmitter();
  openDialog: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private alertsService: AlertsService
  ) { }

  sendMessage() {
    setTimeout(() => {
      this.alertsService.addAlert({severity: 'success', message:'Message sent!'})
      this.send.emit(true)
    }, 2000);
  }

  showDialog(){
    this.openDialog.emit(true)
  }

}
