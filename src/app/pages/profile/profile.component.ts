import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, finalize } from 'rxjs/operators';

// Firebase Storage
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

  updateInfo = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    photoURL: new FormControl('')
  })

  // Firebase
  storage = getStorage();

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
    this.getUserImage();
  }

  getLoggedUser() {
    this.loading = true;
    this.authService.getLoggedUser().subscribe((user: any) => {
      if (user.photoURL) {
        this.userInfo = user._delegate;
        //this.currentImage = this._sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + user.photoURL);
        this.currentImage = user.photoURL;
        localStorage.setItem('photoURL', this.currentImage);
      }
    });
    this.loading = false;
  }

  onFileSelected(event) {

    var n = Date.now();
    const file = event.target.files[0];

    const storageRef = ref(this.storage, ('images/users/' + this.authService.getUser().id + '.' + file.name.split('.').pop()));
    localStorage.setItem('photoURL', 'images/users/' + this.authService.getUser().id + '.' + file.name.split('.').pop());

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      this.imageUrl = snapshot.metadata.fullPath;
    });
  }

  async updateProfile() {
    this.loading = true;
    this.authService.UpdateProfile(this.updateInfo.value.name, this.imageUrl).then(res => {
      this.loading = false;
    })

    setTimeout(() => {
      this.authService.getLoggedUser().subscribe((user: any) => {
        if (user.photoURL) {
          this.currentImage = user.photoURL;
          this.userInfo = user;
        } else if (!user.photoURL) {
          this.currentImage = 'https://picsum.photos/id/237/200/300';
        }
      });
    }, 300);

    this.getLoggedUser();
  }

  showDialog() {
    this.display = true
  }

  getUserImage() {
    this.loading = true;
    setTimeout(() => {
      getDownloadURL(ref(this.storage, localStorage.getItem('photoURL')))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
          this.image = url;
          this.loading = false;
        })
        .catch((error) => {
          // Handle any errors
        });

    }, 100);
  }
    

}
