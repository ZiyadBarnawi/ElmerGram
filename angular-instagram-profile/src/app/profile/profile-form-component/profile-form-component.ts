import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit, signal } from '@angular/core';

import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-form-component',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './profile-form-component.html',
  styleUrl: './profile-form-component.css',
})
export class ProfileFormComponent {
  form: FormGroup = new FormGroup({});
  contactToggleOptions = ['Phone', 'Email'];
  useEmail = true;
  genderOptions = [
    { label: 'Male', value: 'M' },
    { label: 'female', value: 'F' },
  ];
  accountOptions = [
    { label: 'Personal', value: 'personal' },
    { label: 'Business', value: 'business' },
  ];
  categories: string[] = ['Cloths', 'Glasses'];
  discounts: string[] = ['Random Discount'];
  salaryOption = ['Fixed', 'Hourly', 'Negotiable'];
  paymentMethodsOptions: string[] = ['Mada', 'ApplePay', 'GooglePay', 'StcPay'];
  cities = [
    'Madinah',
    'Mecca',
    'Riyadh',
    'Asir',
    'Buraydah',
    'Tabuk',
    'Baha',
    'Hail',
    'Najran',
    'Northern Borders',
    'Eastern Province',
    'Al-Qassim',
    'AL-Jouf',
  ];
  suggestedCities: string[] = [];
  uploadedFiles?: any[] = [];
  otp = new FormControl<string>('', {
    validators: [
      Validators.required,
      (control) => {
        if (control.value.length < 4) return { invalidOtp: true };
        if (control.value !== '0000') return { invalidOtp: true };
        return null;
      },
    ],
  });
}
