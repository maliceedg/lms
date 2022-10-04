import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as firebase from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  private basePath = '/uploads';

  constructor() {}

  uploadFile() {

  }
}
