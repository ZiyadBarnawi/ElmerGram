import { Component, inject, input, OnInit } from '@angular/core';

import { TabsModule } from 'primeng/tabs';

import { Avatar } from 'primeng/avatar';
import { shuffle } from 'lodash';
import { Post as PostModel } from '@shared/models/post.model';
import { Post } from '../post/post.component';
import { User } from '@shared/models/user.model';
import { Store } from '@ngrx/store';
import { currentUserSelector, tempUserSelector } from '../../../store/user';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-profile-body',
  imports: [TabsModule, Avatar, Post, AsyncPipe],
  templateUrl: './profileBody.component.html',
  styleUrl: './profileBody.component.css',
})
export class ProfileBodyComponent implements OnInit {
  store = inject(Store);
  user$: Observable<User> | null = null;
  username = input<string>();
  shuffledSavedPosts: Array<PostModel> = [];
  shuffledPosts: Array<PostModel> = [];

  async ngOnInit() {
    console.log(this.username());
    if (this.username()?.toLowerCase() === 'me') {
      this.user$ = this.store.select(currentUserSelector);
    } else {
      this.user$ = this.store.select(tempUserSelector);
    }
    this.user$.subscribe((user) => {
      if (user?.posts) {
        this.shuffledSavedPosts = shuffle([...user?.posts!]);
        this.shuffledPosts = shuffle([...user.posts!]);
      }
    });
  }
}
