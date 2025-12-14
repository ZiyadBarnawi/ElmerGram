import { Component, CUSTOM_ELEMENTS_SCHEMA, output } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Circle } from '../../shared/circle/circle';
import { Button } from 'primeng/button';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { AutoCompleteModule, AutoComplete } from 'primeng/autocomplete';
import { Images } from '../../models/images.enum';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { Users } from '../../Data/users';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenuModule, Drawer, DrawerModule, AutoComplete, AutoCompleteModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  user = output<User>();

  visible = false;
  formControl = new FormControl();
  users: User[] = Users;
  suggestedUsers: User[] = [{ username: '', profilePic: Images[1] }];

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: (): void => {},
    },
    {
      label: 'Search',
      icon: 'pi pi-search',
      command: (): void => {
        this.visible = !this.visible;
      },
    },
    {
      label: 'Explore',
      icon: 'pi pi-compass',
      command: (): void => {},
    },
    {
      label: 'Reels',
      icon: 'pi pi-video',
      command: (): void => {},
    },
    {
      label: 'Messages',
      icon: 'pi pi-file',
      command: (): void => {},
    },
    {
      label: 'Post',
      icon: 'pi pi-send',
      command: (): void => {},
    },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: (): void => {},
    },
  ];
  onSearch(searchWord: any): void {
    this.suggestedUsers = this.users.filter((user) =>
      user.username.toLowerCase().includes(searchWord.query?.toLowerCase())
    ) as User[];
  }
  onUserClick(user: any): void {
    console.log(user);

    this.user.emit(user);
  }
}
