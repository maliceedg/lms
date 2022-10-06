import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, NavigationStart } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.url = event.url;
      };
    })
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Cursos',
        icon: 'pi pi-fw pi-book',
        //routerLink: 'courses',
        //routerLinkActiveOptions: { exact: true },
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
        label: 'Buscar',
        icon: 'pi pi-fw pi-search',
        //routerLink: 'search',
        disabled: true,
        routerLinkActiveOptions: { exact: true }
      },
      /* {
        label: 'Salir',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: 'profile',
        routerLinkActiveOptions: { exact: true }
      }, */
    ];
    this.isAdmin();
  }

  logout() {
    this.authService.logout();
    this.overlay = true;
    setTimeout(() => {
      this.overlay = false;
      this.router.navigateByUrl('/auth')
    }, 500);
  }

  isAdmin() {
    this.authService.isAdmin().then((res) => {
      if (res) this.admin = res;      
    });
  }
}


