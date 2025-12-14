import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';
import { Posts } from '../components/posts/posts';
import { ButtonModule } from 'primeng/button';
import { Navbar } from '../components/navbar/navbar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DrawerModule, Drawer } from 'primeng/drawer';
import { User } from '../models/user.model';
import { Images } from '../models/images.enum';
import { Users } from '../Data/users';

@Component({
  selector: 'app-profile',
  imports: [ButtonModule, Posts, Navbar, AutoCompleteModule, Drawer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  stories = signal<[{ src: string }]>([{ src: 'sunnyDay.jpg' }]);
  follow = signal<boolean>(false);
  user = signal<User>(Users[0]);
  onUserChange(user: any): void {
    this.user.set(user);
  }
  onClick(): void {
    this.follow.set(!this.follow());
  }
}
