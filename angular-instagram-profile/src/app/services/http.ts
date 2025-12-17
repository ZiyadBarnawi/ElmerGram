import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Users } from '../Data/users';
import { environment } from '../../environments/environment';
import { catchError, Observable } from 'rxjs';
import { Images } from '../models/images.enum';

@Injectable({
  providedIn: 'root',
})
export class Http {
  http = inject(HttpClient);
  async getUsers(username?: number) {
    if (environment?.production) {
      return this.http.get(`${environment?.apiUrl}/api/v1/users${username ? `/${username}` : ''}`, {
        headers: { 'ngrok-skip-browser-warning': 'true' },
        timeout: 2000,
      });
    } else {
      return JSON.parse(localStorage.getItem('users') as string) as User[];
    }

    // this.http
    //   .get('http://192.168.7.58:8080/api/v1/users', {
    //     headers: { 'ngrok-skip-browser-warning': 'true' },
    //   })
    //   .subscribe({
    //     next: (data) => console.log(data),
    //     error: (err) => console.error(err),
    //   });
  }
  async register(user: User): Promise<void> {
    console.log(environment.production);

    if (environment.production) {
      await this.http.post(`${environment?.apiUrl}/api/v1/users`, user, { timeout: 2000 });
    } else {
      let users: any = localStorage.getItem('users');
      if (users) {
        console.log(users);

        users = JSON.parse(users);
        console.log(users);
        users.push(user);

        localStorage.setItem(`users`, JSON.stringify(users));
      }
      //First user in localStorage
      else {
        localStorage.setItem(
          'users',
          JSON.stringify([
            {
              username: user.username,
              password: user.password,
              pfp_url: Images[Math.floor(Math.random() * 5)],
            } as User,
          ])
        );
      }
    }
  }
  async edit(newUser: User): Promise<User | Observable<Object> | null> {
    if (environment.production) {
      return await this.http.patch(`${environment.apiUrl}/users/${newUser.username}`, newUser);
    } else {
      let users = localStorage.getItem('users')
        ? (JSON.parse(localStorage.getItem('users') as string) as User[])
        : null;

      if (!users) return null;
      let oldUserIndex = users.findIndex((user) => user.username === newUser.username);
      if (oldUserIndex < 0) return null;
      users[oldUserIndex].bio = newUser.bio;
      users[oldUserIndex].username = newUser.username;
      localStorage.setItem('users', JSON.stringify(users));
      return users[oldUserIndex];
    }
  }
}
