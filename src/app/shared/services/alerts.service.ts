import { Injectable, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';

type alert = {
  id?: any,
  severity: "success" | "info" | "warn" | "error",
  message: string,
  title?: string,
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' | 'center' | string;
  life?: number;
  sticky?: boolean;
  data?: any
}

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  public _confirm: EventEmitter<any> = new EventEmitter();
  public _reject: EventEmitter<string> = new EventEmitter();

  constructor(
    private messageService: MessageService,
  ) { }

  addAlert(config: alert) {
    this.messageService.add(
      {
        id: config.id || undefined,
        severity: config.severity,
        summary: config.title,
        detail: config.message,
        key: config.position,
        life: config.life,
        sticky: config.sticky ? true : false,
        data: config.data || undefined
      }
    );
  }

  addAlerts(alerts: alert[]) {
    let parseAlerts = alerts.map(el => ({ severity: el.severity, summary: el.title, detail: el.message, key: el.position, life: el.life, sticky: el.sticky ? true : false }))
    this.messageService.addAll(parseAlerts);
  }

  confirm(reference?: string) {
    this._confirm.emit(reference || 'confirm');
    this.clear('confirm');
  }

  reject(reference?: string) {
    this._confirm.emit(reference || 'reject');
    this.clear('confirm');
  }

  clear(key?: string) {
    if (key) {
      this.messageService.clear(key);      
    }
  }
}
