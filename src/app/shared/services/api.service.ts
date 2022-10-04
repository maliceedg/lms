import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { collection, getDocs, doc, setDoc, query, where } from "firebase/firestore";
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  courses: any[] = [];
  id: string;

  constructor(
    private crudService: CrudService,
    private authService: AuthService
  ) {
    this.authService.getLoggedUser().subscribe((user: any) => {
      if (user) {
        this.id = user.uid;
        this.aquiredCourses();
      }
    });
  }

  async aquiredCourses() {
    const q = query(collection(this.crudService.db, "sales-oder"), where("user-id", "==", this.id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.courses.push({
        id: doc.id,
        ...doc.data()
      });
      console.log('Cursos adquiridos ', this.courses);
    });
  }
}
