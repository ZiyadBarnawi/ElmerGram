import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit, signal } from '@angular/core';
import { Posts } from '../components/posts/posts';
import { ButtonModule } from 'primeng/button';
import { Navbar } from '../components/navbar/navbar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DrawerModule, Drawer } from 'primeng/drawer';
import { MessageModule, Message } from 'primeng/message';
import { DialogModule, Dialog } from 'primeng/dialog';
import { FloatLabelModule, FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Http } from '../services/http';
import { User } from '../models/user.model';
import { Images } from '../models/images.enum';
import { Users } from '../Data/users';
import { environment } from './../../environments/environment';
import { TextareaModule, Textarea } from 'primeng/textarea';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-profile',
  imports: [
    ButtonModule,
    Posts,
    Navbar,
    AutoCompleteModule,
    Drawer,
    Message,
    Dialog,
    FloatLabel,
    InputTextModule,
    ReactiveFormsModule,
    Textarea,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  http = inject(Http);
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    bio: new FormControl(''),
  });

  stories = signal<[{ src: string }]>([{ src: 'sunnyDay.jpg' }]);
  follow = signal<boolean>(false);
  showMessage = signal<boolean>(false);
  user = signal<User>(
    localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users') as string)[0]
      : Users[0]
  );
  visibleRegisterDialog = false;
  visibleEditDialog = false;

  onUserChange(user: any): void {
    this.user.set(user);
  }
  onFollowClick(): void {
    this.showMessage.set(true);

    this.follow.set(!this.follow());
    setTimeout(() => {
      this.showMessage.set(false);
    }, 1500);
  }
  onFormSubmit(): void {
    let user: User = {
      username: this.form.controls.username.value!,
      password: this.form.controls.password.value!,
      pfp_url: Images[1],
    };
    this.http.register(user);
  }
  async onEditClick() {
    const user = await this.http.edit({
      username: this.user().username,
      bio: this.form.controls.bio.value,
    } as User);
    if (!user) return;
    if (typeof user === typeof Users) this.user.set(user as User);
    if (typeof user === typeof Object)
      //TODO: finish this for the API
      user as Observable<Object>;
    this.user.set(user as User);
  }
  async ngOnInit(): Promise<void> {
    console.log(environment);
  }
}
