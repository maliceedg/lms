import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CertificatesComponent } from './pages/certificates/certificates.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  { path: 'auth', component: AuthComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },  
  { path: 'notifications', canActivate: [AuthGuard], component: NotificationComponent },
  { path: 'certificates', canActivate: [AuthGuard], component: CertificatesComponent },
  { path: 'my-courses', canActivate: [AuthGuard], component: MyCoursesComponent },
  { path: 'admin', canActivate: [AuthGuard], component: AdminComponent },
  { path: 'courses', canActivate: [AuthGuard], loadChildren: () => import('./pages/courses/courses.module').then(mod => mod.CoursesModule) },
  { path: 'course-manager', canActivate: [AuthGuard], loadChildren: () => import('./pages/course-manager/course-manager.module').then(mod => mod.CourseManagerModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
