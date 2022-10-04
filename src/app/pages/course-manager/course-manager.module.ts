import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CourseManagerComponent } from './course-manager.component';
import { EditLessonsComponent } from 'src/app/components/edit-lessons/edit-lessons.component';

// Firebase
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from 'src/environments/environment';

export const routes: Routes = [
  { path: '', component: CourseManagerComponent, pathMatch: 'full' },
]

@NgModule({
  declarations: [
    CourseManagerComponent,
    EditLessonsComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    RouterModule.forChild(routes),
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCGJDjwoOJPy4ViDaSINZS_bh4WUTCfbyA",
      authDomain: "plataforma-lms-91dc0.firebaseapp.com",
      projectId: "plataforma-lms-91dc0",
      storageBucket: "plataforma-lms-91dc0.appspot.com",
      messagingSenderId: "1061954810129",
      appId: "1:1061954810129:web:4380c69420b56f075d5cb0",
      measurementId: "G-4B52LWEE09"
    }),
    ReactiveFormsModule
  ]
})
export class CourseManagerModule { }
