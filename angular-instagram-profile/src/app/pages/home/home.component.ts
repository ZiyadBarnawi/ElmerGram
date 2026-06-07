import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { decrement, increment, selectCounter } from '../../store/counter';
import { editUser, userSelector } from '../../store/user';
import { User } from '@shared/models/user.model';
import { firstValueFrom } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { UserCard } from '@shared/components/user-card/user-card';
import { Post } from '@shared/models/post.model';
import { UserService } from '@core/services/user.service';
import { NumbersPipe } from '@shared/pipes/numbers-pipe';
import { shuffle } from 'lodash';

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
    NumbersPipe,
  ],
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class Home implements OnInit {
  store = inject(Store<{ counter: number }>);
  user$ = this.store.select(userSelector);
  posts: Post[] = [];
  userService = inject(UserService);
  suggestedUsers: User[] = [];

  async ngOnInit() {
    this.posts = await this.userService.getReels();
    let users: User[] = (await this.userService.getUsers()) as User[];
    this.suggestedUsers = shuffle(users.slice(0, 3));
    this.suggestedUsers = this.suggestedUsers.map((user: User) => {
      return { ...user, followed: false };
    }) as unknown as User[];
  }
}
