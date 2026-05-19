import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface Form {
  username: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  pfpUrl: FormControl<string | null>;
  bio: FormControl<string | null>;
  dateOfBirth: FormControl<string | null>;
  gender: FormControl<'M' | 'F' | null>;
  city: FormControl<string | null>;
  commercialPaper: FormControl<string | null>;
  commercialRegistryNumber: FormControl<string | null>;
  iban: FormControl<string | null>;
  accountType: FormControl<'personal' | 'business' | null>;
  paymentMethods: FormControl<string[] | null>;
  newCategory: FormControl<string | null>; // This is used to handle the new category
  newDiscount: FormControl<string | null>; // This is used to handle the new discount
  products: FormArray<
    FormGroup<{
      name: FormControl<string | null>;
      price: FormControl<string | null>;

      categories: FormControl<string | null>;
      discounts: FormControl<string[] | null>;
    }>
  >;
  workHours: FormArray<
    FormGroup<{
      day: FormControl<string | null>;
      available: FormControl<boolean | null>;
      flexible: FormControl<boolean | null>;
      openHours: FormControl;
      closeHours: FormControl;
    }>
  >;
  otp: FormControl<string | null>;
}
