import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { categories } from 'src/app/shared/utilities/categories';
import { courses, course } from "../../../shared/utilities/courses";
import { TreeNode } from 'primeng/api';
import { collection, getDocs, query, where, doc } from 'firebase/firestore';
import { CrudService } from 'src/app/shared/services/crud.service';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

@Component({
  selector: 'app-courses',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  students = Math.round(Math.random() * 20)
  courses: any[] = [];
  categories = categories;
  nodes: TreeNode[];
  loading: boolean = true;
  images: any[] = [];

  // Firebase
  storage = getStorage();

  constructor(
    private http: HttpClient,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.nodes = [
      {
        key: '0',
        label: 'Enseñanza y Académicos',
        children: [
          { key: '0-0', label: 'Anatomía humana', data: 'https://angular.io', type: 'url' },
          { key: '0-1', label: 'Arquitectura', data: 'https://angular.io', type: 'url' },
          { key: '0-2', label: 'Cambio Climático', data: 'https://angular.io', type: 'url' },
          { key: '0-3', label: 'Ciencia', data: 'https://angular.io', type: 'url' },
          { key: '0-4', label: 'Derecho', data: 'https://angular.io', type: 'url' },
          { key: '0-5', label: 'Economía', data: 'https://angular.io', type: 'url' },
          { key: '0-6', label: 'Educación de adultos', data: 'https://angular.io', type: 'url' },
          { key: '0-7', label: 'Enseñanza', data: 'https://angular.io', type: 'url' },
          { key: '0-8', label: 'Geografía', data: 'https://angular.io', type: 'url' },
          { key: '0-9', label: 'Gestión presencial', data: 'https://angular.io', type: 'url' },
          { key: '0-10', label: 'Habilidades de escritura', data: 'https://angular.io', type: 'url' },
          { key: '0-11', label: 'Historia', data: 'https://angular.io', type: 'url' },
          { key: '0-12', label: 'Literatura', data: 'https://angular.io', type: 'url' },
          { key: '0-13', label: 'Matemáticas', data: 'https://angular.io', type: 'url' },
          { key: '0-14', label: 'Motivación', data: 'https://angular.io', type: 'url' },
          { key: '0-15', label: 'Periodismo', data: 'https://angular.io', type: 'url' },
          { key: '0-16', label: 'Psicología', data: 'https://angular.io', type: 'url' },
          { key: '0-17', label: 'Psicología educativa', data: 'https://angular.io', type: 'url' },
          { key: '0-18', label: 'Teoría musical', data: 'https://angular.io', type: 'url' },
        ]
      },
    ];
    this.getCourses();
  }

  async getCourses() {
    this.courses = [];
    this.images = [];

    let i: number = 0;

    const querySnapshot = await getDocs(collection(this.crudService.db, "courses"));
    querySnapshot.forEach((doc) => {
      this.courses.push({
        id: doc.id,
        photoURL: this.getCourseImage(doc.data()['photoURL'], i),
        ...doc.data()
      });
      i++;
    });
    console.log('courses ', this.courses);
    console.log('images ', this.images);
    this.loading = false;
  }

  getCourseImage(photoURL: string, i: number) {
    setTimeout(() => {
      if (photoURL != '') {
        getDownloadURL(ref(this.storage, photoURL))
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            //this.images.push(url);
            this.images.splice(i, 0, url);
          })
          .catch((error) => {
            // Handle any errors
          });
      } else if (photoURL == '') {
        this.images.push('');
      }
    }, 100);
  }

}
