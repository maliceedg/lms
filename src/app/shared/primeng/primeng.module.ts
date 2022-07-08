import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Primeng Modules
import { MenuModule } from 'primeng/menu';
import { CardModule } from "primeng/card";
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from "primeng/inputtext";
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { PasswordModule } from 'primeng/password';


const modules = [
  MenuModule,
  CardModule,
  RippleModule,
  ToastModule,
  DialogModule,
  DividerModule,
  ButtonModule,
  InputTextModule,
  MenubarModule,
  TabViewModule,
  PasswordModule
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
