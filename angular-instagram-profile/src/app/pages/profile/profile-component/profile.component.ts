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
import { Dialog } from 'primeng/dialog';
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
    Dialog,
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

  isFollowed = signal<boolean>(false);

  userStories: string[] = [];
  activeStoryIndex: number | null = null;
  storyProgress = 0;
  private progressInterval: any = null;

  constructor() {
    effect(async () => {
      const selector =
        this.username()?.toLowerCase() === 'me' ? currentUserSelector : tempUserSelector;

      if (this.username()?.toLowerCase() === 'me') {
        this.user$ = this.store.select(currentUserSelector);
      } else {
        const user = ((await this.userService.getUsers(this.username())) as User[])[0];
        this.store.dispatch(editTempUser(user));
        this.user$ = this.store.select(tempUserSelector);
      }

      this.store.select(selector).subscribe((user) => {
        if (user) {
          console.log(user.stories);

          this.userStories = user.stories || [];
        }
      });
    });
  }

  async ngOnInit(): Promise<void> {
    this.user$ = this.store.select(currentUserSelector);
    this.destroyRef.onDestroy(() => {
      this.closeStory();
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

  openStory(index: number): void {
    this.activeStoryIndex = index;
    this.storyProgress = 0;
    this.startStoryTimer();
  }

  closeStory(): void {
    this.activeStoryIndex = null;
    this.storyProgress = 0;
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  private startStoryTimer(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    this.storyProgress = 0;
    const duration = 5000; // 5 seconds
    const intervalTime = 50; // update every 50ms
    const step = (intervalTime / duration) * 100;

    this.progressInterval = setInterval(() => {
      this.storyProgress += step;
      if (this.storyProgress >= 100) {
        this.storyProgress = 100;
        this.nextStory();
      }
    }, intervalTime);
  }

  nextStory(): void {
    if (this.activeStoryIndex !== null && this.activeStoryIndex < this.userStories.length - 1) {
      this.activeStoryIndex++;
      this.startStoryTimer();
    } else {
      this.closeStory();
    }
  }

  prevStory(): void {
    if (this.activeStoryIndex !== null && this.activeStoryIndex > 0) {
      this.activeStoryIndex--;
      this.startStoryTimer();
    } else {
      this.storyProgress = 0; // restart current
    }
  }
}

export const resolveRouteData: ResolveFn<string> = (snapshot, routeState) =>
  "I'm a dynamic route text!✨";
export const resolveTitle: ResolveFn<string> = (
  routeSnapshot, //  Snapshot form ActivatedRoute
  routeState, //  Route Data
) => `ElmerGram | ${routeSnapshot?.paramMap.get('username')}`;
