import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Cursos',
        icon: 'pi pi-fw pi-book',
        routerLink: 'courses',
        routerLinkActiveOptions: { exact: true },
        items: [
          {
            label: 'Administrador de Cursos',
            icon: 'pi pi-fw pi-cog',
            routerLink: 'course-manager',
            routerLinkActiveOptions: { exact: true }
          }
        ]
      },
      {
        label: 'Perfil',
        icon: 'pi pi-fw pi-user',
        routerLink: 'profile',
        routerLinkActiveOptions: { exact: true }
      },
      /* {
        label: 'Salir',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: 'profile',
        routerLinkActiveOptions: { exact: true }
      }, */
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}


