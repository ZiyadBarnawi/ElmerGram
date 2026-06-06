import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { MenuModule } from 'primeng/menu';
import { PopoverModule } from 'primeng/popover';
import { MenuItem } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';

import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { UserService } from '@core/services/user.service';
import { User } from '@shared/models/user.model';
import { environment } from '@core/environments/environment';
import { InputText } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenuModule,
    DrawerModule,
    PopoverModule,
    RippleModule,
    RouterLink,
    AvatarModule,
    RouterLinkActive,
    CardModule,

    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class Navbar implements OnInit {
  user = output<User>();
  userService = inject(UserService);
  username = input();
  private router = inject(Router);
  protected environment = environment;
  protected searchForm = new FormControl('');
  protected users: User[] = [];
  ngOnInit() {
    this.searchForm.valueChanges.pipe(distinctUntilChanged(), debounceTime(500)).subscribe({
      next: async (val) => {
        const data = await this.userService.getUsers(val!);
        this.users = data as User[];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  routerUsername = signal<string>('');
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: (): void => {},
      routerLink: '/landing',
    },

    {
      label: 'Reels',
      icon: 'pi pi-video',
      command: (): void => {},
      routerLink: 'reels',
    },
    // {
    //   label: 'Messages',
    //   icon: 'pi pi-file',
    //   command: (): void => {},
    //   routerLink: 'messages',
    // },
    // {
    //   label: 'Post',
    //   icon: 'pi pi-send',
    //   command: (): void => {},
    //   routerLink: 'posts',
    // },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: async (): Promise<void> => {
        const data: User = (await this.userService.getInitialUser()) as User;
        this.userService.user.set(data);
      },
      routerLink: `profile/me`,
    },
  ];

  async search(searchWord: any): Promise<void> {
    if (environment.production) {
      let users = (await this.userService.getUsers()) as User[];
    } else {
      this.users = (await this.userService.getUsers()) as User[];
    }
  }
  async switchToSelectedUser(username: string) {
    const data = await this.userService.getUsers(username);
    this.userService.user.set((data as User[])[0]);
  }
}
