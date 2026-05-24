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
    InputText,
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
      label: 'Search',
      icon: 'pi pi-search',
      command: (): void => {},
    },
    // {
    //   label: 'Explore',
    //   icon: 'pi pi-compass',
    //   command: (): void => {},
    //   routerLink: 'explore',
    // },
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
      routerLink: `profile/${environment.production ? 'Jafar' : 'Ziyad'}`,
    },
  ];

  async search(searchWord: any): Promise<void> {
    if (environment.production) {
      let users = (await this.userService.getUsers()) as User[];
    } else {
      this.users = (await this.userService.getUsers()) as User[];
    }
  }
  async searchSelectedUser(username: string) {
    const data = await this.userService.getUsers(username);
    console.log(data);
  }

  //TODO: Update the method below 👇🏽 and the services method it is using if needed. too tired I didn't event look if it needs any changing :)
  async updateCurrentUser(event: AutoCompleteSelectEvent): Promise<void> {
    if (!event?.value?.username) return;

    let user = await this.userService.getUsers(event.value.username);

    if (environment.production) {
      this.user.emit(user as User);
      this.routerUsername.set((user as User).username);
    } else {
      user = user as User;
      this.userService.user.set(user);
      this.router.navigate(['profile', `${user.username}`]);
      this.user.emit(user);
    }
  }
  reset() {
    this.searchForm.setValue('');
  }
}
