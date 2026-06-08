import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  inject,
  signal,
  input,
  effect,
  DestroyRef,
  Injector,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLinkWithHref, ResolveFn } from '@angular/router';
import { firstValueFrom, interval, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Button } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { MessageService } from 'primeng/api';
import { UserService } from '@core/services/user.service';
import { User } from '@shared/models/user.model';
import { ProfileBodyComponent } from '@shared/components/profile-body/profileBody.component';
import { Store } from '@ngrx/store';
import { currentUserSelector, editTempUser, tempUserSelector } from '../../../store/user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    Button,
    Avatar,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLinkWithHref,
    ProfileBodyComponent,
    AsyncPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  userService = inject(UserService);
  messagesService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  userForm = this.userService.userForm;
  user$: Observable<User> | null = null;
  store = inject(Store);
  Images = this.userService.Images;

  username = input<string>(); // TIP: this get its value form the url
  text = input(); // TIP: This text is read as a static route data

  stories = signal<[{ src: string }]>([{ src: this.Images[3] }]);
  isFollowed = signal<boolean>(false);

  interval$ = interval(1000);
  signalObserver = toSignal(this.interval$, {
    initialValue: 0,
    equal: (
      a, // curr val
      b, // new val
    ) => {
      return a === b;
    },
    injector: inject(Injector),
    manualCleanup: true,
  });

  constructor() {
    effect(async () => {
      if (this.username()?.toLowerCase() === 'me') {
        this.user$ = this.store.select(currentUserSelector);
      } else {
        let user = ((await this.userService.getUsers(this.username())) as User[])[0];
        console.log(user);

        this.store.dispatch(editTempUser(user));
        this.user$ = this.store.select(tempUserSelector);
      }
    });
  }
  async ngOnInit(): Promise<void> {
    this.user$ = this.store.select(currentUserSelector);
    this.destroyRef.onDestroy(() => {
      console.log('Destroyed');
    });
    console.log(this.text());
  }
  toggleFollow(): void {
    this.isFollowed.set(!this.isFollowed());
    this.messagesService.add({
      summary: this.isFollowed() ? 'Followed!' : 'Un-Followed',
      severity: this.isFollowed() ? 'success' : 'error',
    });
  }
}

export const resolveRouteData: ResolveFn<string> = (snapshot, routeState) =>
  "I'm a dynamic route text!✨";
export const resolveTitle: ResolveFn<string> = (
  routeSnapshot, //  Snapshot form ActivatedRoute
  routeState, //  Route Data
) => `ElmerGram | ${routeSnapshot?.paramMap.get('username')}`;
