import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from '@firebase/util';
import { catchError, finalize } from 'rxjs/operators';

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
  uploadedFiles: any[] = [];
  selectedFile: ImageSnippet;
  userInfo: any;
  fb;
  public currentImage: string = 'https://picsum.photos/id/1025/200/200';
  downloadURL: any;

  updateInfo = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    photoURL: new FormControl('')
  })

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    public afAuth: AngularFireAuth,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.authService.getLoggedUser().subscribe((user: any) => {
      if (user) this.userInfo = user;
      if (user.photoURL) {
        this.currentImage = user.photoURL;
      }
    });
  }

  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  async updateProfile() {
    const profile = {
      displayName: this.updateInfo.value.name,
      phoneNumber: this.updateInfo.value.phone,
      photoURL: this.updateInfo.value.photoURL
    };
    return (await this.afAuth.currentUser).updateProfile(profile);
  }

  submitInfo() {
    console.log(this.updateInfo.value);
  }

  showDialog() {
    this.display = true
  }

}
