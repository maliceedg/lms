import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { getAuth, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import firebase from 'firebase/compat/app';
import { map, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  id: string;
  token: string;
  user: any[] = [];

  constructor(
    private angularFireAuth: AngularFireAuth,
  ) { }

  async login(email: string, password: string) {
    const auth = getAuth();

    try {
      return await this.angularFireAuth.signInWithEmailAndPassword(email, password).then((res: any) => {
        const token = res.user._delegate.accessToken;
        const { displayName, email, uid } = res.user._delegate;
        this.setUser({ id: uid, name: displayName, email });
        this.setToken(token);
      });
    } catch (err) {
      console.log('login error: ', err);
      return null;
    }
  }

  async register(email: string, password: string) {
    try {
      return await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log('login error: ', err);
      return null;
    }
  }

  async googleLogin(email: string, password: string) {
    try {
      return await this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (err) {
      console.log('google login error: ', err);
      return null;
    }
  }

  getLoggedUser() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('id', user.uid);
      }
    })
    return this.angularFireAuth.authState;
  }

  getUserId(): string {
    return localStorage.getItem('id');
  }

  getUser(): {name: string, email: string, id: string} {
    return this.user ? this.user : JSON.parse(localStorage.getItem('user'))
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', JSON.stringify(token))
  }

  getToken() {
    this.token = this.token ? this.token : JSON.parse(localStorage.getItem('token'))
    return this.token;
  }

  setUser(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  checkToken(): boolean {
    return this.token ? true : localStorage.getItem('token') ? true : false
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then((res: any) => {
      // Sign-out successful.      
      localStorage.clear();
    }).catch((error) => {
      // An error happened.
      console.log('Hubo un error al cerrar sesión')
    });
  }
}
