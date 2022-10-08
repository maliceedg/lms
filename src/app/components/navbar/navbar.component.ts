import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, NavigationStart } from '@angular/router';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];
  overlay: boolean = false;
  url: string = '';
  admin: boolean = false;
  teacher: boolean = false;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        this.isAdmin();
        this.isTeacher();
        this.loading = false;
      };
    })
  }

  ngOnInit(): void {
    this.loading = true;
    this.items = [
      {
        label: 'Cursos',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Listado de Cursos',
            icon: 'pi pi-fw pi-list',
            routerLink: 'courses',
            routerLinkActiveOptions: { exact: true }
          },
          {
            label: 'Administrador de Cursos',
            icon: 'pi pi-fw pi-cog',
            routerLink: 'course-manager',
            routerLinkActiveOptions: { exact: true }
          },
        ]
      },
      {
        label: 'Mis Cursos',
        icon: 'pi pi-fw pi-book',
        routerLink: 'my-courses',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Perfil',
        icon: 'pi pi-fw pi-user',
        routerLink: 'profile',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Notificaciones',
        icon: 'pi pi-fw pi-bell',
        routerLink: 'notifications',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Buscar',
        icon: 'pi pi-fw pi-search',
        //routerLink: 'search',
        disabled: true,
        routerLinkActiveOptions: { exact: true }
      },
    ];
    this.isAdmin();
    this.isTeacher();
    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

  logout() {
    this.authService.logout();
    this.overlay = true;
    localStorage.clear();
    setTimeout(() => {
      this.overlay = false;
      this.router.navigateByUrl('/auth')
    }, 500);
    this.admin = false;
    this.teacher = false;
  }

  isAdmin() {
    this.authService.isAdmin().then((res) => {
      if (res) this.admin = res;
    });
  }

  isTeacher() {
    this.authService.isTeacher().then((res) => {
      if (res) this.teacher = res;
    });
  }
}


