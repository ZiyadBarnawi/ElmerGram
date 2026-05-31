import { AfterViewInit, Component, inject, input, signal } from '@angular/core';

import { TabsModule } from 'primeng/tabs';

import { UserService } from '@core/services/user.service';
import { Avatar } from 'primeng/avatar';
import { shuffle } from 'lodash';
import { Post as PostModel } from '@shared/models/post.model';
import { Post } from '../post/post.component';
@Component({
  standalone: true,
  selector: 'app-profile-body',
  imports: [TabsModule, Avatar, Post],
  templateUrl: './profileBody.component.html',
  styleUrl: './profileBody.component.css',
})
export class ProfileBodyComponent {
  userService = inject(UserService);
  user = this.userService.user;
  shuffledSavedPosts: Array<PostModel> = [];
  shuffledPosts: Array<PostModel> = [];

  ngOnInit() {
    if (this.user()?.posts) {
      this.shuffledSavedPosts = shuffle([...this.user()?.posts!]).slice(
        0,
        Math.floor(Math.random() * 7) + 1,
      );
      this.shuffledPosts = shuffle([...this.user()?.posts!]).slice(
        0,
        Math.floor(Math.random() * 7) + 1,
      );
    }
  }
}
