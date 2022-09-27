import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/course-manager/course-manager.module').then(mod => mod.CourseManagerModule)},
  { path: 'auth', component: AuthComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'courses',  canActivate: [AuthGuard], loadChildren: () => import('./pages/courses/courses.module').then(mod => mod.CoursesModule) },
  { path: 'course-manager', canActivate: [AuthGuard], loadChildren: () => import('./pages/course-manager/course-manager.module').then(mod => mod.CourseManagerModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
