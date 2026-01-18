import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  inject,
  signal,
  input,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterLinkWithHref, ResolveFn } from '@angular/router';

import {
  Observable,
  catchError,
  fromEvent,
  interval,
  map,
  mergeMap,
  of,
  retry,
  skip,
  switchMap,
  take,
  timeout,
} from 'rxjs';
import { Button } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { MessageService } from 'primeng/api';

import { PostsComponent } from '../../components/posts/posts.component';
import { UserService, environment, type User } from './../../components/index';
import { InputText } from 'primeng/inputtext';
@Component({
  selector: 'app-profile',
  imports: [
    Button,
    Avatar,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLinkWithHref,
    PostsComponent,
    InputText,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  userService = inject(UserService);
  http = inject(HttpClient);
  userForm = this.userService.userForm;
  private router = inject(Router);
  messagesService = inject(MessageService);
  username = input<string>(); // TIP: this get its value form the url
  user = this.userService.user;
  Images = this.userService.Images;
  text = input(); // TIP: This text is read as a static route data
  stories = signal<[{ src: string }]>([{ src: this.Images[6] }]);
  isFollowed = signal<boolean>(false);
  message = '';
  messageSeverity = 'success';

  toggleFollow(): void {
    this.isFollowed.set(!this.isFollowed());
    this.messagesService.add({
      summary: this.isFollowed() ? 'Followed!' : 'Un-Followed',
      severity: this.isFollowed() ? 'success' : 'error',
    });
  }

  constructor() {
    effect(async () => {
      let data = await this.userService.getUsers(this.username());
      if (environment.production) {
        data = data as Observable<Object>;
        data
          .pipe(
            catchError((err) => {
              throw err;
            }),
          )
          .subscribe((data: any) => {
            this.user.set(data.data);
          });
      } else {
        this.userService.user.set(data as User);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    const user = await this.userService.getUsers(this.username());
    const mySwitchMap = interval(1000).pipe(
      // map((val) => {
      //   console.log(val);
      //   return val * 2;
      // }),
      // // timeout({ first: 10 }),
      // skip(5),
      // take(2), // take the first <num> value from the source observable
      // retry(3),
      switchMap((val) => {
        return of(val);
      }),
    );

    const myMergeMap = interval(1000).pipe(
      mergeMap((val) => {
        return of(val);
      }),
    );

    const input1 = document.querySelector('.test-input-1');
    const input2 = document.querySelector('.test-input-2');
    fromEvent(input2!, 'input')
      .pipe(switchMap((val) => of(input1)))
      .subscribe({
        next(val) {
          console.log(val);
        },
      });

    // fromEvent(input!, 'input')
    //   .pipe(mergeMap((val) => of(val)))
    //   .subscribe({ next: (val) => console.log(val.target) });
    console.log(input);

    // myMergeMap.subscribe({ next: (val) => console.log(`MergeMap: ${val}`) });
    // mySwitchMap.subscribe({ next: (val) => console.log(`SwitchMap: ${val}`) });

    console.log(this.text());
  }
}

export const resolveRouteData: ResolveFn<string> = (snapshot, routeState) =>
  "I'm a dynamic route text!✨";
export const resolveTitle: ResolveFn<string> = (
  routeSnapshot, //  Snapshot form ActivatedRoute
  routeState, //  Route Data
) => `ElmerGram | ${routeSnapshot?.paramMap.get('username')}`;
