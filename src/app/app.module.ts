import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// Firebase
import { AngularFireModule } from "@angular/fire/compat";

// Styles
import { PrimengModule } from './shared/primeng/primeng.module';

// Pages
import { AuthComponent } from './pages/auth/auth.component';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CrudService } from './shared/services/crud.service';
import { CoursePlayerComponent } from './pages/course-player/course-player.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    ProfileComponent,
    CoursePlayerComponent,
    MyCoursesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    PrimengModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
