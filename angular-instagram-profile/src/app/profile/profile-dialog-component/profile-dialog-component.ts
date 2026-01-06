import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-profile-dialog-component',
  imports: [Dialog, ButtonModule],
  templateUrl: './profile-dialog-component.html',
  styleUrl: './profile-dialog-component.css',
})
export class ProfileDialogComponent {
  onShowEditDialog() {
    throw new Error('Method not implemented.');
  }
  onUpload($event: Event, arg1: any) {
    throw new Error('Method not implemented.');
  }
  user() {
    throw new Error('Method not implemented.');
  }
  onCitySearch($event: PointerEvent) {
    throw new Error('Method not implemented.');
  }
  onDayCheckboxChange(arg0: any) {
    throw new Error('Method not implemented.');
  }
  onEditClick() {
    throw new Error('Method not implemented.');
  }

  onShowDialog = input<Function>();
  header?: string;
  visibleDialog: boolean = false;
  visibleSkipButton: boolean = false;
  form: any;
  useEmail: any;
  modal: boolean = true;
  today: Date | null | undefined;
  genderOptions: any;
  suggestedCities: any;
  paymentMethodsOptions: any;
  visibleRegisterDialog: any;
}
