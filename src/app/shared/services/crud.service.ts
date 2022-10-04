import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { getDatabase, ref, set } from "firebase/database";

export interface Course { author: string, category: any[], subcategory: string, description: string, lessons: any[], members: number, name: string, rating: number, userID: string }
export interface SalesOrder { authorId: string, courseId: string, courseName: string, date: string, price: number, userID: string }

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);
  database = getDatabase();
  coursesRef = collection(this.db, 'courses')

  constructor() { }

  async uploadCourse(course: Course) {
    const docRef = await addDoc(collection(this.db, 'courses'), {
      author: course.author,
      category: course.category,
      subcategory: course.subcategory,
      description: course.description,
      lessons: course.lessons,
      members: course.members,
      name: course.name,
      rating: course.rating,
      userID: course.userID
    })
  }

  async buyCourse(saleOrder: SalesOrder) {
    const docRef = await addDoc(collection(this.db, 'sales-order'), {
      authorId: saleOrder.authorId,
      courseId: saleOrder.courseId,
      courseName: saleOrder.courseName,
      date: saleOrder.date,
      price: saleOrder.price,
      userID: saleOrder.userID,
    })
  }
}
