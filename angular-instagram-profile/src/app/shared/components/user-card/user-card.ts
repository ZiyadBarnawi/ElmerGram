import { Component, inject, input } from '@angular/core';
import { User } from '@shared/models/user.model';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [CardModule, AvatarModule, Button],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  user = input<User>();
  followableUser?: User & { followed: boolean };
  showBio = input<boolean>(true);
  showFollowButton = input<boolean>(false);
  fluid = input<boolean>(false);
  messageService = inject(MessageService);
  router = inject(Router);
  ngOnInit() {
    this.followableUser = { ...(this.user() as User), followed: false };
  }
  toggleFollow() {
    this.followableUser!.followed = !this.followableUser?.followed;
    this.messageService.add({
      summary: this.followableUser!.followed ? 'Followed' : 'Unfollowed',
      severity: this.followableUser!.followed ? 'success' : 'error',
    });
  }
  switchToSelectedUser(username: string) {
    this.router.navigate(['profile', username]);
  }
}
