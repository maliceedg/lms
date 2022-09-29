import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { course, courses } from "src/app/shared/utilities/courses";
import { collection, getDocs, doc, setDoc, query, where, getDoc } from "firebase/firestore";
import { CrudService } from 'src/app/shared/services/crud.service';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { render } from "creditcardpayments/creditCardPayments";

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

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    protected _sanitizer: DomSanitizer) {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.loadCourse(param.get('id'));
      this.id = param.get('id');
    });
  }

  ngOnInit() {
    this.bg = this.bgGenerator();
  }

  async loadCourse(id: string) {
    const docRef = doc(this.crudService.db, "courses", id);
    const docSnap = await getDoc(docRef);
    this.course = docSnap.data();
    this.loading = false;
  }

  bgGenerator() {
    return Math.round(Math.random() * (3 - 1) + 1)
  }

  getLesson(url: string) {
    let split = url.split('https://www.youtube.com/watch?v=')[1];
    this.lessonURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + split);
    console.log(split);
  }

  showDialog() {
    this.display = true;

    setTimeout(() => {
      render(
        {
          id: '#myPaypalButtons',
          currency: 'USD',
          value: '10',
          onApprove: (details) => {
            alert('Transaccion exitosa');
          }
        }
      )
    }, 500);
  }

}
