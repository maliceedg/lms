import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AlertsService } from "./shared/services/alerts.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { MessagesService } from './shared/services/message.service';

// Firebase
import { AngularFireModule } from "@angular/fire/compat";

// Styles
import { PrimengModule } from './shared/primeng/primeng.module';

// Pages
import { AuthComponent } from './pages/auth/auth.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CoursePlayerComponent } from './pages/course-player/course-player.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { CertificatesComponent } from './pages/certificates/certificates.component';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CrudService } from './shared/services/crud.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    ProfileComponent,
    CoursePlayerComponent,
    MyCoursesComponent,
    FileUploadComponent,
    AdminComponent,
    NotificationComponent,
    CertificatesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCGJDjwoOJPy4ViDaSINZS_bh4WUTCfbyA",
      authDomain: "plataforma-lms-91dc0.firebaseapp.com",
      projectId: "plataforma-lms-91dc0",
      storageBucket: "plataforma-lms-91dc0.appspot.com",
      messagingSenderId: "1061954810129",
      appId: "1:1061954810129:web:4380c69420b56f075d5cb0",
      measurementId: "G-4B52LWEE09"
    }),
    AngularFireStorageModule,
    AppRoutingModule,
    PrimengModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CrudService, AlertsService, ConfirmationService, MessageService, MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
