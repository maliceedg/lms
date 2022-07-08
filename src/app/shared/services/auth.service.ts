import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { signInWithEmailAndPassword } from '@firebase/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
  ) { }

  async login(email:string, password:string) {
    try {
      return await this.angularFireAuth.signInWithEmailAndPassword(email, password); 
    } catch (err) {
      console.log('login error: ', err);
      return null;
    }
  }

  async register(email:string, password:string) {
    try {
      return await this.angularFireAuth.createUserWithEmailAndPassword(email, password); 
    } catch (err) {
      console.log('login error: ', err);
      return null;
    }
  }

  async googleLogin(email:string, password:string) {
    try {
      return await this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); 
    } catch (err) {
      console.log('google login error: ', err);
      return null;
    }
  }

  getLoggedUser() {
    return this.angularFireAuth.authState;
  }

  logout() {
    this.angularFireAuth.signOut();
  }
}
