import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { getDatabase, ref, set } from "firebase/database";

export interface Course { id?: string, author: string, category: any[], subcategory: string, description: string, lessons: any[], members: number, name: string, photoURL:string, price: number, rating: number, userID: string }
export interface SalesOrder { authorId: string, courseId: string, courseName: string, date: string, price: number, userID: string }

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  app = initializeApp({
    apiKey: "AIzaSyCGJDjwoOJPy4ViDaSINZS_bh4WUTCfbyA",
    authDomain: "plataforma-lms-91dc0.firebaseapp.com",
    projectId: "plataforma-lms-91dc0",
    storageBucket: "plataforma-lms-91dc0.appspot.com",
    messagingSenderId: "1061954810129",
    appId: "1:1061954810129:web:4380c69420b56f075d5cb0",
    measurementId: "G-4B52LWEE09"
  });
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
      photoURL: course.photoURL,
      price: course.price,
      rating: course.rating,
      userID: course.userID
    })
  }

  async updateCourse(course: Course, id: string) {
    const docRef = doc(this.db, "courses", id);
    console.log('course ', course);
    
    await updateDoc(docRef, {
      author: course.author,
      category: course.category,
      subcategory: course.subcategory,
      description: course.description,
      lessons: course.lessons,
      members: course.members,
      name: course.name,
      photoURL: course.photoURL,
      price: course.price,
      rating: course.rating,
      userID: course.userID
    }).then(res => {
      // display message service
    });
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
