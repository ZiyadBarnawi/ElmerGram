import { Component, inject, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-profile-delete-dialog-component',
  imports: [ButtonModule, DialogModule],
  templateUrl: './profile-delete-dialog-component.html',
  styleUrl: './profile-delete-dialog-component.css',
})
export class ProfileDeleteDialogComponent implements OnInit {
  userService = inject(UserService);

  ngOnInit(): void {
    this.userService.visibleDeleteDialog = true;
  }

  deleteUser(): void {
    this.userService.deleteUser(this.userService.user()!.username);
    this.userService.user.set(null);
    this.userService.visibleDeleteDialog = false;
  }
}
