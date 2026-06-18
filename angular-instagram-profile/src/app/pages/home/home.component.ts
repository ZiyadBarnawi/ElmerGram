import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { AsyncPipe, DatePipe } from '@angular/common';
import { currentUserSelector } from '../../store/user';
import { User } from '@shared/models/user.model';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { UserCard } from '@shared/components/user-card/user-card';
import { Post } from '@shared/models/post.model';
import { UserService } from '@core/services/user.service';
import { NumbersPipe } from '@shared/pipes/numbers-pipe';
import { shuffle } from 'lodash';
import { Post as PostComp } from '@shared/components/post/post.component';

@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    AvatarModule,
    ImageModule,
    DragScrollComponent,
    DragScrollItemDirective,
    UserCard,
    AsyncPipe,
    DatePipe,
    NumbersPipe,
    PostComp,
  ],
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class Home implements OnInit {
  store = inject(Store<{ counter: number }>);
  user$ = this.store.select(currentUserSelector);
  posts: Post[] = [];
  userService = inject(UserService);
  suggestedUsers: User[] = [];

  async ngOnInit() {
    this.posts = await this.userService.getReels();

    let users: User[] = (await this.userService.getUsers()) as User[];
    this.suggestedUsers = shuffle(users).slice(0, 3);
    this.suggestedUsers = this.suggestedUsers.map((user: User) => {
      return { ...user, followed: false };
    }) as unknown as User[];
  }
}
