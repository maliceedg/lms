import { Component, OnInit } from '@angular/core';
import { getDocs, collection } from 'firebase/firestore';
import { CrudService } from 'src/app/shared/services/crud.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  loading: boolean = true;
  images: any[] = [];
  courses: any[] = [];
  isApproved: boolean;
  display: boolean = false;
  display2: boolean = false;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
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
        ...doc.data()
      });
      i++;
    });
    this.loading = false;
  }

  showDialog(dialog: number, id: string, status: boolean) {

    if (status) {
      this.display = true;
      this.updateStatus(id, true);
    }
    else {
      this.display2 = true;
      this.updateStatus(id, false);
    }
  }

  async updateStatus(id: string, status: boolean) {
    this.crudService.updateStatus(id, status);
  }

}
