import { Component, inject, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { environment } from '@core/environments/environment';
import { UserService } from '@core/services/user.service';
import { User } from '@shared/models/user.model';
import { InputText } from 'primeng/inputtext';
import { Popover } from 'primeng/popover';
import { Card } from 'primeng/card';
import { Avatar } from 'primeng/avatar';
import { distinctUntilChanged, debounceTime, tap } from 'rxjs';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Button } from 'primeng/button';
import { UserCard } from '../user-card/user-card';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

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
  ],
  templateUrl: './header.html',
})
export class Header {
  userService = inject(UserService);
  users: User[] = [];
  protected searchForm = new FormControl('');
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
    this.userService.user.set((data as User[])[0]);
  }
  test(event: any) {
    console.log(event);
  }
}
