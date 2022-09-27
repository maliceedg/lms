import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-player',
  templateUrl: './course-player.component.html',
  styleUrls: ['./course-player.component.scss']
})
export class CoursePlayerComponent implements OnInit {

  id: string;
  course: any;

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.paramMap
  }

  ngOnInit(): void {
  }

}
