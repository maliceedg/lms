import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, finalize } from 'rxjs/operators';

// Firebase Storage
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { CrudService } from 'src/app/shared/services/crud.service';
import { DomSanitizer } from '@angular/platform-browser';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})

export class ProfileComponent implements OnInit {

  display: boolean = false;
  loading: boolean = false;
  uploadedFiles: any[] = [];
  selectedFile: ImageSnippet;
  userInfo: any;
  fb;

  public currentImage;
  public image;
  imageUrl: string;
  newUser: boolean = true;

  updateInfo = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    photoURL: new FormControl('')
  })

  // Firebase
  storage = getStorage();
  profilePic: string;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    public afAuth: AngularFireAuth,
    private crudService: CrudService,
    private _sanitizer: DomSanitizer,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.loading = true;
    this.authService.getLoggedUser().subscribe((user: any) => {
      /* if (user._delegate.photoURL) {
        this.userInfo = user._delegate;
        //this.currentImage = this._sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + user.photoURL);
        this.currentImage = user.photoURL;
        localStorage.setItem('photoURL', this.currentImage);
      } else if (user.photoURL = null || user.displayName == null) {
        this.userInfo = user._delegate;
        this.currentImage = user.photoURL;
        localStorage.setItem('photoURL', this.currentImage);
      } */
      if (user._delegate.photoURL == null || user._delegate.displayName == null) {
        this.newUser = true;
      } else {
        this.newUser = false;
      }
      this.userInfo = user._delegate;
    });
    this.loading = false;
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const storageRef = ref(this.storage, ('images/users/' + this.authService.getUserId() + '.' + file.name.split('.').pop()));
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.profilePic = downloadURL;
        });
      }
    );
  }

  async updateProfile() {
    this.loading = true;
    this.authService.UpdateProfile(this.updateInfo.value.name, this.profilePic).then(res => {
      this.loading = false;
    })

    this.getLoggedUser();
  }

  showDialog() {
    this.display = true;
  }

}
