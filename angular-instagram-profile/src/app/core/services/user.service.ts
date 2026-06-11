import { inject, Injectable, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { catchError, firstValueFrom, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';

import { Router } from '@angular/router';
import { Images } from '@shared/models/images.enum';
import { User } from '@shared/models/user.model';
import { Form } from '@shared/models/form.model';
import { environment } from '@core/environments/environment';
import { Post } from '@shared/models/post.model';
import { Store } from '@ngrx/store';
import { currentUserSelector, editCurrentUser } from '../../store/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  messagesService = inject(MessageService);
  router = inject(Router);
  store = inject(Store);
  visibleEditDialog = true;
  visibleSignupDialog = true;
  visibleDeleteDialog = true;
  currentUser: User | null = null;
  tempUser: User | null = null;
  // user = signal<User | null>(null);
  Images = Images;
  // testSignal = signal(0);
  // computedSignal = computed(() => this.testSignal()); //TIP: computed signals are read-only. They change whenever the inner signal changes
  // computedSignal = this.testSignal.asReadonly(); //TIP: Same as code above, but leaner
  contactToggleOptions = ['Phone', 'Email'];
  today = new Date(Date.now());

  useEmail = true;
  genderOptions = [
    { label: 'Male', value: 'M' },
    { label: 'Female', value: 'F' },
  ];
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

  userForm = new FormGroup<Form>({
    username: new FormControl('', { validators: [Validators.maxLength(20)] }),
    phoneNumber: new FormControl('', {
      validators: [],
    }),
    email: new FormControl('', {
      validators: [Validators.email],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        (control) => {
          if (
            this.userForm?.controls?.username?.value === this.userForm?.controls?.password?.value
          ) {
            return { usernameAndPasswordAreEquals: true };
          } else {
            return null;
          }
        },
      ],
    }),
    confirmPassword: new FormControl('', {
      validators: [
        Validators.required,
        (control) => {
          if (this.userForm?.controls.password.value !== control.value) {
            return { passwordMismatch: true };
          }
          return null;
        },
      ],
    }),
    pfpUrl: new FormControl(),
    bio: new FormControl('', { validators: [Validators.maxLength(100)] }),
    dateOfBirth: new FormControl<string | null>(null),
    gender: new FormControl<'M' | 'F'>('M', { validators: [Validators.required] }),
    city: new FormControl(''),

    otp: new FormControl<string>('', {
      validators: [
        Validators.required,
        (control) => {
          if (control?.value?.length < 4) return { invalidOtp: true };
          if (control.value !== '0000') return { invalidOtp: true };
          return null;
        },
      ],
    }),
  });
  async getInitialUser(): Promise<User> {
    if (environment.production) {
      return (
        (await firstValueFrom(this.http.get(`${environment.apiUrl}/users/jafar`))) as User[]
      )[0];
    } else {
      return (await firstValueFrom(this.http.get('data/user.json'))) as User;
    }
  }
  async getReels(): Promise<Post[]> {
    return firstValueFrom(this.http.get<Post[]>(`${environment.apiUrl}/reels`));
  }
  async getUsers(username?: string): Promise<User[] | User> {
    if (environment?.production) {
      return (await firstValueFrom(
        this.http.get(`${environment?.apiUrl}/users${username ? `/${username}` : ''}`, {
          headers: { 'ngrok-skip-browser-warning': 'true' },
          timeout: 20000,
        }),
      )) as User | User[];
    }
    //Local environment
    else {
      //TODO: finish local node server code
      const users = (await firstValueFrom(
        this.http.get(`${environment.apiUrl}/users${username ? `/${username}` : ''}`),
      )) as User[];

      return users;
    }
  }
  async addUser(): Promise<User> {
    let user;
    if (environment.production) {
      let user: any = this.userForm.value;

      user.posts = [
        { media: 'sunnyDay.jpg', likes: 12 },
        { media: 'desert.jpg', likes: 77 },
        { media: 'sunFlower.jpg', likes: 11 },
        { media: 'carbet.jpg', likes: 8 },
        { media: 'rainnyCar.jpg', likes: 30 },
      ];
      if (!this.userForm.value.pfpUrl) {
        user.pfpUrl = Images[5];
      }

      delete user.otp;
      delete user.confirmPassword;
      this.http.post(environment.apiUrl + '/users', user).subscribe({
        next(value) {
          user = value;
        },
      });
      return user;
    } else {
      // TODO: remove local host usage
      let users: User[] = JSON.parse(localStorage.getItem('users') as string) as User[];
      if (users) {
        let user: any = { ...this.userForm.value };
        user.posts = [
          { media: 'sunnyDay.jpg', likes: 12 },
          { media: 'desert.jpg', likes: 77 },
          { media: 'sunFlower.jpg', likes: 11 },
          { media: 'carbet.jpg', likes: 8 },
          { media: 'rainnyCar.jpg', likes: 30 },
        ];
        delete user.otp;
        delete user.confirmPassword;

        users.push(user);
        localStorage.setItem(`users`, JSON.stringify(users));
      }
      //first user
      else {
        localStorage.setItem('users', JSON.stringify([this.userForm.value]));
      }
      return this.userForm.value as User;
    }
    //! Production Code
  }
  async editUser(): Promise<void> {
    let userFormData = { ...this.userForm.value };

    delete userFormData.confirmPassword;
    delete userFormData.otp;
    let user = await firstValueFrom(this.store.select(currentUserSelector));
    this.http
      .patch(`${environment.apiUrl}/users/${user.username}`, userFormData)
      .pipe(
        catchError((err) => {
          throw err;
        }),
      )
      .subscribe((val) => {
        this.store.dispatch(editCurrentUser(val as User));
        this.router.navigate(['/profile', `${this.store.select(currentUserSelector)}`], {
          replaceUrl: true,
        });
        this.router.navigate(['/profile', `${(val as User).username}`], {
          replaceUrl: true,
        });
      });
  }
  async deleteUser(username: string): Promise<void> {
    //! Back end doesn't have delete at the moment
    if (environment.production) {
      firstValueFrom(this.http.delete(`${environment.apiUrl}/users/${username}`));
    } else {
      let users = JSON.parse(localStorage.getItem('users') as string) as User[];

      const deletedUserIndex = users.findIndex((user) => user.username === username);
      users.splice(deletedUserIndex, 1);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  updateSuggestedCities(event: any) {
    this.suggestedCities = this.cities.filter((city) =>
      city.toLowerCase().includes(event.query.toLowerCase()),
    );
  }

  uploadFile(event: FileUploadEvent, control: FormControl<any>): void {
    let filesCopy: any[] = [];
    event.files.forEach((file: any) => filesCopy.push(URL.createObjectURL(file)));
    control.setValue(filesCopy);
  }

  async updateUserForm(): Promise<void> {
    let user = await firstValueFrom(this.store.select(currentUserSelector));
    Object.entries(this.userForm.controls).forEach((control) => {
      this.userForm.reset();
      this.userForm.patchValue({ ...user });
    });
  }

  previousRoute(options?: { replaceUrl: boolean }) {
    let route = [...this.router.url.split('/')];

    route.pop();

    this.router.navigate(route, { replaceUrl: options?.replaceUrl });
  }
}
