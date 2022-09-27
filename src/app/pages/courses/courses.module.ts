import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from "../../shared/primeng/primeng.module";
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

export const routes: Routes = [
  { path: '', component: CourseListComponent, pathMatch: 'full' },
  { path: 'detail/:id', component: CourseDetailComponent }
]

@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class CoursesModule { }
