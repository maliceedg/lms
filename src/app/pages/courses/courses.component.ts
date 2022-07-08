import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { course } from "../../shared/utilities/courses";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  rating: number = 4;
  students = Math.round(Math.random() * 20)
  courses = course;

  constructor() { }

  ngOnInit(): void {
  }

}
