import { Component, inject } from '@angular/core';
import { UserService } from '@core/services/user.service';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-profile-delete-dialog-component',
  imports: [ButtonModule, DialogModule],
  templateUrl: './profile-delete-dialog-component.html',
})
export class ProfileDeleteDialogComponent {
  userService = inject(UserService);

  deleteUser() {
    this.userService.deleteUser(this.userService.user()!.username);
    this.userService.user.set(null);
  }
}
