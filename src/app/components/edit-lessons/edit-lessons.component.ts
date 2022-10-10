import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-edit-lessons',
  templateUrl: './edit-lessons.component.html',
  styleUrls: ['./edit-lessons.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => EditLessonsComponent
      ),
      multi: true
    }
  ]
})
export class EditLessonsComponent implements ControlValueAccessor {

  public changed: (value: any) => void;
  @Input() lessons: { name: string, url: string, lessonURL: string }[] = [];

  constructor() { }

  writeValue(obj: any): void {
    this.lessons = obj || [];
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {

  }

  setDisabledState?(isDisabled: boolean): void {

  }

  editLesson() {
    this.changed(this.lessons);
  }

}
