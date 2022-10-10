import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { collection, getDocs, doc, setDoc, query, where, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { CrudService } from 'src/app/shared/services/crud.service';
import { DomSanitizer } from '@angular/platform-browser';
import { render } from "creditcardpayments/creditCardPayments";
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SalesOrder } from "../../../shared/services/crud.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/shared/services/alerts.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})


export class CourseDetailComponent implements OnInit {

  id: string = '';
  course: any;
  bg: number;
  lessonURL: any = '';
  loading: boolean = true;
  display = false;
  message = false;
  saleOrder: SalesOrder;
  images: any[] = [];
  boughtCourse: boolean = false;
  admin: boolean = false;
  test: boolean = false;
  testLink: any;
  messageForm: FormGroup;

  // Firebase
  storage = getStorage();

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private authService: AuthService,
    protected _sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private alertsService: AlertsService) {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.loadCourse(param.get('id'));
      this.id = param.get('id');
    });
    this.messageForm = this.formBuilder.group({
      recipientName: '',
      recipientEmail: '',
      createdAt: formatDate(new Date(), 'medium', 'en'),
      senderName: [this.authService.getUser().name, [Validators.required]],
      senderEmail: [this.authService.getUser().email, [Validators.email, Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this.bg = this.bgGenerator();
    this.isBought();
    this.isAdmin();
  }

  async loadCourse(id: string) {
    const docRef = doc(this.crudService.db, "courses", id);
    const docSnap = await getDoc(docRef);
    this.course = docSnap.data();

    if (this.course.hasTest) {
      let split = this.course.testLink.split('/view')[0] + 'viewform?embedded=true';
      this.testLink = this._sanitizer.bypassSecurityTrustResourceUrl(split);
      console.log(this.testLink);
    }
    
    this.loading = false;
  }

  bgGenerator() {
    return Math.round(Math.random() * (3 - 1) + 1)
  }

  getLesson(url: string) {
    let split = url.split('https://www.youtube.com/watch?v=')[1];
    this.lessonURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + split);
    console.log(this.lessonURL);
  }

  showDialog(price: number) {
    this.display = true;

    setTimeout(() => {
      render(
        {
          id: '#myPaypalButtons',
          currency: 'USD',
          value: price.toString(),
          onApprove: (details) => {
            if (details.status == 'COMPLETED') {
              this.buyCourse();
              this.isBought();
              this.display = false;
              this.alertsService.addAlert({ position: 'bottom-right', severity: 'success', title: 'Operación exitosa', message: 'Curso adquirido exitosamente' });
            }
          }
        }
      )
    }, 500);
  }

  buyCourse() {
    this.saleOrder = {
      authorId: this.course.userID,
      courseId: this.id,
      courseName: this.course.name,
      date: formatDate(new Date(), 'dd/MM/yyy', 'en'),
      price: this.course.price,
      userID: this.authService.getUserId()
    }
    this.crudService.buyCourse(this.saleOrder);
  }

  async isBought() {
    const q = query(collection(this.crudService.db, "sales-order"), where("userID", "==", this.authService.getUser().id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data()['userID'] == this.authService.getUserId() && doc.data()['courseId'] == this.id) {
        this.boughtCourse = true;
      } else if (doc.data()['userID'] == this.authService.getUserId() && doc.data()['authorID'] == this.authService.getUser().id && doc.data()['courseId'] == this.id) {
        this.boughtCourse = true;
      } else if (this.authService.getUserId() == 'SxsocYeCA6Q2JfYPXw1vwXZPDrE2') {
        this.boughtCourse = true;
      } else if (doc.data()['userID'] != this.authService.getUserId() && doc.data()['authorID'] != this.authService.getUser().id) {
        this.boughtCourse = false;
      }
    });
    console.log(this.boughtCourse);

  }

  isAdmin() {
    this.authService.isAdmin().then((res) => {
      if (res) this.admin = res;
    });
  }

  sendMessage() {
    this.messageForm.patchValue({
      recipientName: this.course.author,
      recipientEmail: this.course.authorEmail
    })
    this.crudService.sendMessage(this.messageForm.value);
  }

  showTest() {
    this.test = true;
  }

}
