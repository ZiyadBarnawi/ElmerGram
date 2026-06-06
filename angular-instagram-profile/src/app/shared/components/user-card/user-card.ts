import { Component, input } from '@angular/core';
import { User } from '@shared/models/user.model';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-user-card',
  imports: [CardModule, AvatarModule, Button],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  user = input<User>();
  showBio = input<boolean>(true);
  showFollowButton = input<boolean>(false);
  fluid = input<boolean>(false);
  switchToSelectedUser(username: string) {
    //TODO: finish this code
    console.log(username);
  }
}
