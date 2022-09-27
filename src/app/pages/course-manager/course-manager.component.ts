import { Component, OnInit } from '@angular/core';
import { categories } from "../../shared/utilities/categories";
import { collection, getDocs, doc, setDoc, query, where } from "firebase/firestore";
import { Course, CrudService } from 'src/app/shared/services/crud.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface Category {
  name: string,
  value: string
}

@Component({
  selector: 'app-course-manager',
  templateUrl: './course-manager.component.html',
  styleUrls: ['./course-manager.component.scss']
})

export class CourseManagerComponent implements OnInit {

  selectedCategories: any;
  selectedCategory: any[];
  selectedSubcategories: any;
  categories = categories;
  subcategories: any[];

  create = false;
  view: string = 'view';

  currentLessons: number = 1;
  courses: any[] = [];
  course: Course;
  coursesRef = collection(this.crudService.db, 'courses');

  id: string;
  courseForm: FormGroup;
  editCourseForm: FormGroup;
  author: string;

  display: boolean = false;

  constructor(
    private crudService: CrudService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.courseForm = this.formBuilder.group({
      author: this.author,
      category: '',
      description: '',
      lessons: this.formBuilder.array([]),
      members: 1,
      name: '',
      subcategory: '',
      rating: 1,
      userID: ''
    });
  }

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe((user: any) => {
      if (user) {
        this.author = user.displayName;
        this.id = user.uid;

        this.getCourses();
      }
    });

    this.editCourseForm = this.formBuilder.group({
      author: '',
      category: '',
      description: '',
      lessons: [],
      members: '',
      name: '',
      subcategory: '',
      rating: '',
      userID: ''
    });

    this.paVe();
  }

  viewToggle(window: string) {
    if (window == 'create') {
      this.view = window;
    } else {
      this.view = 'view';
    }
  }

  getSubcategories(category) {
    this.subcategories = this.categories.find(el => el.value == category.value).options;
  }

  async getCourses() {
    /* const querySnapshot = await getDocs(collection(this.crudService.db, "courses"));
    querySnapshot.forEach((doc) => {
      this.courses.push(doc.data());
    }); */

    const q = query(collection(this.crudService.db, "courses"), where("userID", "==", this.id));

    this.courses = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.courses.push({
        id: doc.id,
        ...doc.data()
      });
    });
  }

  lessons(): FormArray {
    return this.courseForm.get('lessons') as FormArray;
  }

  newLesson(): FormGroup {
    return this.formBuilder.group({
      name: '',
      url: ''
    });
  }

  addLesson() {
    this.lessons().push(this.newLesson());
  }

  removeLesson(index: number) {
    this.lessons().removeAt(index);
  }

  uploadCourse() {
    this.courseForm.patchValue({
      author: this.author,
      userID: this.id
    });
    this.crudService.uploadCourse(this.courseForm.value);
  }
  
  paVe() {
    this.authService.getUserId();
    console.log(localStorage.getItem('id'));
  }

  showDialog(course: any) {
    this.getSubcategories({ value: course.category });
    this.editCourseForm.patchValue(course);
    this.display = true;
  }

}
