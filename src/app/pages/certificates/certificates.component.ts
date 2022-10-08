import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { collection, getDocs, query, where } from "firebase/firestore";
import { MessageService } from 'primeng/api';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CrudService } from 'src/app/shared/services/crud.service';

interface Names { name: string }

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {

  certificateForm: FormGroup;
  loading: boolean = false;
  empty: boolean;
  courses: any[] = [];
  names: any[] = [];

  constructor(
    private crudService: CrudService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private alertsService: AlertsService,
  ) {
    this.certificateForm = this.formBuilder.group({
      studentName: '',
      courseName: '',
    })
  }

  ngOnInit(): void {
    this.myCourses();
  }

  async myCourses() {
    this.loading = true;
    const q = query(collection(this.crudService.db, "courses"), where("userID", "==", this.authService.getUser().id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.courses.push({
        id: doc.id,
        ...doc.data()
      });
      this.names.push({
        name: doc.data()['name']
      })
    });

    this.loading = false;
  }

  exportCertificate() {
    if (this.certificateForm.value.studentName != '' && this.certificateForm.value.courseName != '') {
      import("jspdf").then(jsPDF => {
        const doc: any = new jsPDF.default({ orientation: 'landscape', unit: "cm" });
        // Background image 
        doc.addImage("./assets/certificate-landscape.png", "PNG", null, null, 29.7, 21, "NONE", null);
        // Title 
        doc.setFont("times", "italic", "bold");
        doc.setFontSize(28)
        doc.text("Certificado de completación", 14.85, 9, null, null, "center");

        // Text 
        doc.setFont("helvetica", "normal");
        doc.setFontSize(16)
        doc.text("La plataforma Learnerize hace entrega de este certificado a ", 14.85, 12, null, null, "center");

        // User data 
        doc.setFontSize(24)
        doc.text((this.certificateForm.value.studentName), 14.85, 13.5, null, null, "center")

        // Participation text 
        doc.setFontSize(16)
        doc.text(('Un certificado de completación en'), 14.85, 16, null, null, "center")

        // Group data doc.setFontSize(24) 
        doc.text((this.certificateForm.value.courseName), 14.85, 17.5, null, null, "center")
        doc.save('Certificado para ' + this.certificateForm.value.studentName + '.pdf');
      });
      
      this.alertsService.addAlert({ position: 'bottom-right', severity: 'success', title: 'Éxito', message: 'Certificado creado' });
    } else {
      this.alertsService.addAlert({ position: 'bottom-right', severity: 'error', title: 'Error', message: 'Hay campos vacíos' });
    }
  }

}
