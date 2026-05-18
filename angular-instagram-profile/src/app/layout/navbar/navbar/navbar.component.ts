import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { AutoCompleteModule, AutoComplete, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

import { catchError, firstValueFrom, Observable } from 'rxjs';
import { User, UserService, environment } from './../../components/index';
import { AvatarModule } from 'primeng/avatar';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenuModule,
    Drawer,
    DrawerModule,
    InputGroupAddonModule,
    AutoComplete,
    AutoCompleteModule,
    InputGroupModule,
    RippleModule,
    RouterLink,
    AvatarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class Navbar {
  user = output<User>();
  userService = inject(UserService);
  username = input();
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  visibleDrawer = false;

  users: User[] = [];
  suggestedUsers: User[] = [
    { username: '', pfpUrl: this.userService.Images[1], password: '123456' },
  ];
  routerUsername = signal<string>('');
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: (): void => {},
      routerLink: '/',
    },
    {
      label: 'Search',
      icon: 'pi pi-search',
      command: (): void => {
        this.visibleDrawer = !this.visibleDrawer;
      },
    },
    {
      label: 'Explore',
      icon: 'pi pi-compass',
      command: (): void => {},
      routerLink: 'explore',
    },
    {
      label: 'Reels',
      icon: 'pi pi-video',
      command: (): void => {},
      routerLink: 'reels',
    },
    {
      label: 'Messages',
      icon: 'pi pi-file',
      command: (): void => {},
      routerLink: 'messages',
    },
    {
      label: 'Post',
      icon: 'pi pi-send',
      command: (): void => {},
      routerLink: 'posts',
    },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: async (): Promise<void> => {
        const data: User = (await firstValueFrom(this.userService.GetJsonUser())) as User;

        this.userService.user.set(data);
      },
      routerLink: 'profile/Ziyad',
    },
  ];
  async search(searchWord: any): Promise<void> {
    if (environment.production) {
      let users = (await this.userService.getUsers()) as Observable<Object>;
      let usersObservable = users
        .pipe(
          catchError((err) => {
            console.log(err);

            throw err;
          }),
        )
        .subscribe((data: any) => {
          this.suggestedUsers = data.data.filter((user: any) =>
            user.username.toLowerCase().includes(searchWord.query?.toLowerCase()),
          ) as User[];
        });
      this.destroyRef.onDestroy(() => {
        console.log('Unsubscribing');

        usersObservable.unsubscribe();
      });
    } else {
      this.users = (await this.userService.getUsers()) as User[];
      this.suggestedUsers = this.users?.filter((user) =>
        user.username.toLowerCase().includes(searchWord.query?.toLowerCase()),
      ) as User[];
    }
  }

  async updateCurrentUser(event: AutoCompleteSelectEvent): Promise<void> {
    if (!event?.value?.username) return;

    let user = await this.userService.getUsers(event.value.username);

    if (environment.production) {
      let userObservable = (user as Observable<Object>)
        .pipe(
          catchError((err) => {
            throw err;
          }),
        )
        .subscribe((data: any) => {
          this.user.emit(data.data);
          this.routerUsername.set(data.data.username);
        });
      this.destroyRef.onDestroy(() => {
        console.log('Unsubscribed');

        userObservable.unsubscribe();
      });
    } else {
      user = user as User;
      this.userService.user.set(user);
      this.router.navigate(['profile', `${user.username}`]);
      this.user.emit(user);
    }
  }
}
