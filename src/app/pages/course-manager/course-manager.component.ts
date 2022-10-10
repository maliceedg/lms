import { Component, OnInit } from '@angular/core';
import { categories } from "../../shared/utilities/categories";
import { addDoc, collection, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { Course, CrudService } from 'src/app/shared/services/crud.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AlertsService } from 'src/app/shared/services/alerts.service';

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
  email: string;

  public imageUrl: string;
  courseCover: string;
  lessonDownloadURL: any[] = [];

  display: boolean = false;
  noCourses: boolean = false;
  loading: boolean = false;
  images: any[] = [];

  // Firebase
  storage = getStorage();

  constructor(
    private crudService: CrudService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertsService: AlertsService
  ) {
    this.courseForm = this.formBuilder.group({
      author: this.author,
      authorEmail: this.email,
      category: '',
      description: '',
      lessons: this.formBuilder.array([]),
      members: 1,
      name: '',
      subcategory: '',
      photoURL: '',
      price: Number,
      rating: 1,
      userID: ''
    });
  }

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe((user: any) => {
      if (user) {
        this.author = user.displayName;
        this.email = user.email;
        this.id = user.uid;

        this.getCourses();
      }
    });
    this.editCourseForm = this.formBuilder.group({
      id: '',
      hasTest: false,
      author: '',
      authorEmail: '',
      category: '',
      description: '',
      lessons: [],
      members: '',
      name: '',
      subcategory: '',
      testLink: '',
      photoURL: '',
      price: Number,
      rating: '',
      userID: ''
    });
    console.log(this.authService.getUser().email);
    
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

    this.loading = true;
    const q = query(collection(this.crudService.db, "courses"), where("userID", "==", this.id));

    this.courses = [];
    this.images = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.courses.push({
        id: doc.id,
        photoURL: this.getCourseImage(doc.data()['photoURL']),
        ...doc.data()
      });
    });

    setTimeout(() => {
      if (this.courses.length <= 0) this.noCourses = true;
    }, 100);
    this.loading = false;
  }

  /* Course */
  lessons(): FormArray {
    return this.courseForm.get('lessons') as FormArray;
  }

  newLesson(): FormGroup {
    return this.formBuilder.group({
      name: '',
      url: '',
      lessonURL: ''
    });
  }

  addLesson() {
    this.lessons().push(this.newLesson());
  }

  /* Edit course */
  editLessons(): FormArray {
    return this.editCourseForm.get('lessons') as FormArray;
  }

  editNewLesson(): FormGroup {
    return this.formBuilder.group({
      name: '',
      url: '',
      lessonURL: ''
    });
  }

  editAddLesson() {
    this.editLessons().push(this.editNewLesson());
  }

  removeLesson(index: number) {
    this.lessons().removeAt(index);
  }

  uploadCourse() {
    this.courseForm.patchValue({
      author: this.author,
      userID: this.id,
      photoURL: this.courseCover
    });    
    this.crudService.uploadCourse(this.courseForm.value).then(() => {
      this.alertsService.addAlert({ position: 'bottom-right', severity: 'success', title: 'Operación exitosa', message: 'Curso creado exitosamente' });
    });
  }

  async updateCourse(id: string) {
    const docData = {
      author: this.authService.getUser().name,
      category: this.editCourseForm.value.category,
      description: this.editCourseForm.value.description,
      lessons: this.editCourseForm.value.lessons,
      name: this.editCourseForm.value.name,
      subcategory: this.editCourseForm.value.subcategory,
      photoURL: this.editCourseForm.value.photoURL,
      price: this.editCourseForm.value.price
    }
    this.editCourseForm.patchValue({      
      author: this.authService.getUser().name,
      authorEmail: this.authService.getUser().email
    })
    if (this.editCourseForm.value.testLink != '') {
      this.editCourseForm.patchValue({      
        hasTest: true,
      })
    }
    console.log(this.editCourseForm.value);
    this.crudService.updateCourse(this.editCourseForm.value, id);
    this.display = false;
  }

  showDialog(course: any) {
    this.getSubcategories({ value: course.category });
    this.editCourseForm.patchValue(course);
    this.display = true;
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const storageRef = ref(this.storage, ('images/courses/' + this.getRandomId() + '.' + file.name.split('.').pop()));
    const uploadTask = uploadBytesResumable(storageRef, file);

    // 'file' comes from the Blob or File API
    /* uploadBytes(storageRef, file).then((snapshot) => {
      this.imageUrl = snapshot.metadata.fullPath;
      this.courseCover.push(this.getCourseImage(this.imageUrl));
      console.log(this.courseCover);
    }); */

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
          this.courseCover = downloadURL;
        });
      }
    );
  }

  onLessonFileSelected(i: number, event) {
    const file = event.target.files[0];
    
    const storageRef = ref(this.storage, ('files/' + this.getRandomId() + '.' + file.name.split('.').pop()));
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
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
          this.courseForm.value.lessons[i].lessonURL = downloadURL;
        });
      }
    );
  }

  getCourseImage(photoURL: string) {
    setTimeout(() => {
      if (photoURL != '') {
        getDownloadURL(ref(this.storage, photoURL))
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            this.images.push(url);
          })
          .catch((error) => {
            // Handle any errors
          });
      }
    }, 100);
  }

  getRandomId() {
    return Math.random().toString(36).substr(2, 16);
  }
}
