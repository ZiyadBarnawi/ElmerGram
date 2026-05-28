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
  otp: FormControl<string | null>;
}
