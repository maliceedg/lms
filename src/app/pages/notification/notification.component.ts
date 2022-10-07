import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthService } from 'src/app/shared/services/auth.service';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  loading: boolean = false;
  display: boolean = false;
  notifications: any[] = [];
  name: string = this.authService.getUser().name;
  background: string = '';
  color: string;
  recipient = {
    name: '',
    email: ''
  }

  messageForm: FormGroup;

  constructor(
    private crudService: CrudService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.messageForm = this.formBuilder.group({
      recipientName: '',
      recipientEmail: '',
      createdAt: formatDate(new Date(), 'medium', 'en'),
      senderName: ['', [Validators.required]],
      senderEmail: ['', [Validators.email, Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.myNotifications();
    this.background = this.getRandomColor();
  }

  async myNotifications() {
    this.loading = true;
    const q = query(collection(this.crudService.db, "messages"), where("recipientEmail", "==", this.authService.getUser().email));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.notifications.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log('notification ', this.notifications);
    
    setTimeout(() => {
      this.loading = false;
    }, 300);

  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    this.color = '#'; // <-----------
    for (var i = 0; i < 6; i++) {
      this.color += letters[Math.floor(Math.random() * 16)];
    }
    return this.color;
  }

  replyMessage(recipientName: string, recipientEmail: string) {    
    this.messageForm.patchValue({
      recipientName: recipientEmail,
      recipientEmail: recipientName
    })
  }

  sendMessage() {
    console.log(this.messageForm.value);
    this.crudService.sendMessage(this.messageForm.value);
  }
}

