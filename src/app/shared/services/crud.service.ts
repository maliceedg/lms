import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { getDatabase, ref, set, update } from "firebase/database";
import { AlertsService } from './alerts.service';

export interface Course { id?: string, author: string, authorEmail: string, category: any[], subcategory: string, description: string, lessons: any[], members: number, name: string, photoURL: string, price: number, rating: number, userID: string }
export interface SalesOrder { authorId: string, courseId: string, courseName: string, date: string, price: number, userID: string }
export interface Message { recipientName: string, recipientEmail: string, createdAt: Date, senderName: string, senderEmail: string, subject: string, message: string }

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

  constructor(
    private alertsService: AlertsService
  ) { }

  async uploadCourse(course: Course) {
    const docRef = await addDoc(collection(this.db, 'courses'), {
      author: course.author,
      authorEmail: course.authorEmail,
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
    
    return docRef
  }

  async updateCourse(course: Course, id: string) {
    const docRef = doc(this.db, "courses", id);
    console.log('course ', course);

    await updateDoc(docRef, {
      author: course.author,
      authorEmail: course.authorEmail,
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

  async updateStatus(id: string, status: boolean) {
    const docRef = doc(this.db, "courses", id);

    if (status) {
      await updateDoc(docRef, { active: false }).then(res => {
        this.alertsService.addAlert({ position: 'bottom-right', severity: 'success', title: 'Operación exitosa', message: 'Curso deshabilitado exitosamente' });
      });
    } else if (!status) {
      await updateDoc(docRef, { active: true }).then(res => {
        this.alertsService.addAlert({ position: 'bottom-right', severity: 'success', title: 'Operación exitosa', message: 'Curso habilitado exitosamente' });
      });
    }
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

  async sendMessage(message: Message) {
    const docRef = await addDoc(collection(this.db, 'messages'), {
      recipientName: message.recipientName,
      recipientEmail: message.recipientEmail,
      senderName: message.senderName,
      senderEmail: message.senderEmail,
      subject: message.subject,
      message: message.message,
      createdAt: message.createdAt,
      read: false
    }).then(() => {
      this.alertsService.addAlert({ position: 'bottom-right', severity: 'success', title: 'Operación exitosa', message: 'Mensaje enviado exitosamente' });
    })
  }
}
