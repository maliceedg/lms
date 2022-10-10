import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user = {
    email: 'maliceedg@gmail.com',
    password: 'Maliceedg12++'
  }
  viewValue: string = 'login';
  passwordValue: string = '';
  samePass: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
  }

  view(value: string) {
    return this.viewValue = value;
  }

  verifyPassword() {
    let password = this.user.password;
    let newPassword = this.passwordValue;

    if (password == newPassword) {
      this.samePass = true;
    } else {
      this.samePass = false
    }

  }

  login() {
    const { email, password } = this.user;
    this.authService.login(email, password).then((res: any) => {
      if (this.authService.checkToken()) {
        this.alertsService.addAlert({ severity: "success", title: "Operación exitosa", message: "Usuario logeado exitosamente", life: 3000 });
        this.router.navigateByUrl('courses');
      }
    });
  }

  register() {
    const { email, password } = this.user;
    this.authService.register(email, password).then(res => {
      this.alertsService.addAlert({ severity: "success", title: "Operación exitosa", message: "Usuario registrado exitosamente", life: 3000 });
      this.router.navigateByUrl('courses');
    })
  }

  googleLogin() {
    const { email, password } = this.user;
    this.authService.googleLogin(email, password).then(res => {
      if (this.authService.checkToken()) {
        this.alertsService.addAlert({ severity: "success", title: "Operación exitosa", message: "Usuario logeado exitosamente", life: 3000 });
        this.router.navigateByUrl('courses');
      }
    })
  }

  getLoggedUser() {
    this.authService.getLoggedUser().subscribe(res => {
    });
  }

}
