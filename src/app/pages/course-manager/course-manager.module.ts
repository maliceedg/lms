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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule
  ]
})
export class CourseManagerModule { }
