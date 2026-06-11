import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@core/services/user.service';
import { User } from '@shared/models/user.model';
import { InputText } from 'primeng/inputtext';
import { Popover } from 'primeng/popover';
import { distinctUntilChanged, debounceTime, tap } from 'rxjs';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Button } from 'primeng/button';
import { UserCard } from '../user-card/user-card';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Router } from '@angular/router';
import { compact } from 'lodash';
import { Store } from '@ngrx/store';
import { editTempUser } from '../../../store/user';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';

@Component({
  selector: 'app-header',
  imports: [
    InputText,
    Popover,
    ReactiveFormsModule,
    OverlayBadgeModule,
    IconFieldModule,
    InputIconModule,
    Button,
    UserCard,
    DragScrollComponent,
    DragScrollItemDirective,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  userService = inject(UserService);
  router = inject(Router);
  store = inject(Store);
  users: User[] = [];
  protected searchForm = new FormControl('');

  notifications = [
    {
      id: 1,
      type: 'like',
      user: { name: 'Adam', pfp: 'bubbles.jpg' },
      message: 'liked your photo',
      time: '2m ago',
    },
    {
      id: 2,
      type: 'follow',
      user: { name: 'Kevin', pfp: 'defaultAvatar.jpg' },
      message: 'started following you',
      time: '1h ago',
    },
    {
      id: 3,
      type: 'comment',
      user: { name: 'Huda', pfp: 'carbet.jpg' },
      message: 'commented: "Stunning shot! 🌻"',
      time: '3h ago',
    },
    {
      id: 4,
      type: 'like',
      user: { name: 'Hussam', pfp: 'snowflake.webp' },
      message: 'liked your reel',
      time: '1d ago',
    },
    {
      id: 5,
      type: 'follow',
      user: { name: 'Ziyad', pfp: 'cookie.jpg' },
      message: 'started following you',
      time: '2d ago',
    },
  ];

  dismissNotification(id: number) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
  }

  clearAllNotifications() {
    this.notifications = this.notifications = [];
  }
  ngOnInit() {
    this.searchForm.valueChanges.pipe(distinctUntilChanged(), debounceTime(500)).subscribe({
      next: async (val) => {
        this.users = (await this.userService.getUsers(val!)) as User[];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  async switchToSelectedUser(username: string) {
    const data = await this.userService.getUsers(username);
    this.store.dispatch(editTempUser(data as User[][0]));
  }
  openSignUpDialog() {
    this.router.navigate([
      ...(compact(this.router.url.replaceAll('/', ' ').split(' ')) as string[]),
      'signup',
    ]);
  }
}
