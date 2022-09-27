import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { course, courses } from "src/app/shared/utilities/courses";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  id: string = '';
  course: course = undefined;
  bg: number;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.loadCourse(param.get('id'))
    })
  }

  ngOnInit() {
    this.bg = this.bgGenerator();
  }

  loadCourse(id: string) {
    if (id) {
      this.course = courses.find(el => el.id == id);
    }
  }

  bgGenerator() {
    return Math.round(Math.random() * (3 - 1) + 1)
  }

}
