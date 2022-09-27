import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Primeng Modules
import { TreeModule } from 'primeng/tree';
import { MenuModule } from 'primeng/menu';
import { CardModule } from "primeng/card";
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from "primeng/inputtext";
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';


const modules = [
  TreeModule,
  MenuModule,
  CardModule,
  ToastModule,
  DialogModule,
  RatingModule,
  ButtonModule,
  RippleModule,
  DividerModule,
  MenubarModule,
  TabViewModule,
  DropdownModule,
  PasswordModule,
  DataViewModule,
  InputTextModule,
  FileUploadModule,
  InputNumberModule,
  MultiSelectModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ],
  exports: [
    modules
  ]
})
export class PrimengModule { }
