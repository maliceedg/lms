import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { collection, getDocs, doc, setDoc, query, where, getDocFromCache, getDoc } from "firebase/firestore";
import { CrudService } from 'src/app/shared/services/crud.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {

  loading: boolean = false;
  salesOrders: any[] = [];
  courses: any[] = [];
  id: string;

  constructor(
    private apiService: ApiService,
    private crudService: CrudService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.id = this.authService.getUserId();
    this.myCourses();
  }

  async myCourses() {
    this.loading = true;
    const q = query(collection(this.crudService.db, "sales-order"), where("userID", "==", this.id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.salesOrders.push({
        id: doc.id,
        ...doc.data()
      });
    });

    for (let i = 0; i < this.salesOrders.length; i++) {
      this.getCourses(this.salesOrders[i].courseId)
    }

    setTimeout(() => {
      this.loading = false;
    }, 300);

  }

  async getCourses(documentId: string) {
    const docRef = doc(this.crudService.db, 'courses', documentId);
    const docu = await getDoc(docRef);

    this.courses.push(docu.data());
    this.courses.map(el => ({
      ...el,
      ['id']: el.id = documentId
    }))
    console.log(this.courses);
  }

}
