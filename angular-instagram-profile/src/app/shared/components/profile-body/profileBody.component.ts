import { AfterViewInit, Component, inject, input, signal } from '@angular/core';

import { TabsModule } from 'primeng/tabs';

import { Post } from '../post/post.component';
import { UserService } from '@core/services/user.service';
import { Avatar } from 'primeng/avatar';
@Component({
  standalone: true,
  selector: 'app-profile-body',
  imports: [TabsModule, Post, Avatar],
  templateUrl: './profileBody.component.html',
  styleUrl: './profileBody.component.css',
})
export class ProfileBodyComponent {
  randomNum = signal<number>(Math.floor(Math.random() * 7));
  userService = inject(UserService);
  user = this.userService.user;
  updateRandomValue(): void {
    this.randomNum.set(Math.floor(Math.random() * 7) + 1);
  }
}
