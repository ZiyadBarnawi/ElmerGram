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

import { Observable, catchError, firstValueFrom, interval } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Avatar } from 'primeng/avatar';
import { MessageService } from 'primeng/api';
import { gsap } from 'gsap';

import { UserService } from '@core/services/user.service';
import { environment } from '@environments/environment';
import { Images } from '@shared/models/images.enum';
import type { User } from '@shared/models/user.model';

import { PostsComponent } from './components/posts/posts.component';

@Component({
  selector: 'app-profile',
  imports: [Avatar, ReactiveFormsModule, RouterOutlet, RouterLinkWithHref, PostsComponent],
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
  Images = Images;

  username = input<string>();
  text = input();

  readonly storyImagePool = [
    Images[0],
    Images[1],
    Images[2],
    Images[3],
    Images[4],
  ];

  randomStoryCount = signal(Math.floor(Math.random() * 7));
  displayedStories = signal<string[]>([]);
  activeStoryIndex = signal<number | null>(null);
  isFollowed = signal<boolean>(false);

  interval$ = interval(1000);
  signalObserver = toSignal(this.interval$, {
    initialValue: 0,
    equal: (a, b) => a === b,
    injector: inject(Injector),
    manualCleanup: true,
  });

  private storiesInitialized = false;

  constructor() {
    effect(() => {
      const user = this.userService.user();
      if (user && !this.storiesInitialized) {
        this.storiesInitialized = true;
        if (this.randomStoryCount() > 0) {
          this.displayedStories.set(this.buildStories(this.randomStoryCount()));
        }
      }
    });

    effect(async () => {
      const user =
        this.username()?.toLowerCase() === 'ziyad'
          ? await firstValueFrom(this.userService.GetJsonUser())
          : await this.userService.getUsers(this.username());
      if (environment.production) {
        const userObservable = (user as Observable<object>)
          .pipe(catchError((err) => {
            throw err;
          }))
          .subscribe((data: any) => {
            this.userService.user.set(data.data);
          });
        this.destroyRef.onDestroy(() => {
          userObservable.unsubscribe();
        });
      } else {
        this.userService.user.set(user as User);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.destroyRef.onDestroy(() => {
      console.log('Destroyed');
    });
    console.log(this.text());
  }

  isOwnProfile(): boolean {
    const profileUsername = this.username()?.toLowerCase();
    const currentUsername = this.userService.user()?.username?.toLowerCase();
    return !!profileUsername && profileUsername === currentUsername;
  }

  postCount(): number {
    return this.userService.user()?.posts?.length ?? 0;
  }

  toggleFollow(): void {
    this.isFollowed.set(!this.isFollowed());
    this.messagesService.add({
      summary: this.isFollowed() ? 'Followed!' : 'Un-Followed',
      severity: this.isFollowed() ? 'success' : 'error',
    });
  }

  refreshStories(): void {
    const count = Math.floor(Math.random() * 7) + 1;
    this.randomStoryCount.set(count);
    this.displayedStories.set(this.buildStories(count));
  }

  openStory(index: number): void {
    this.activeStoryIndex.set(index);
    requestAnimationFrame(() => {
      const viewer = document.querySelector('.story-viewer');
      if (viewer) {
        gsap.fromTo(viewer, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      }
    });
  }

  closeStory(): void {
    this.activeStoryIndex.set(null);
  }

  nextStory(event: Event): void {
    event.stopPropagation();
    const current = this.activeStoryIndex();
    const stories = this.displayedStories();
    if (current === null || stories.length === 0) {
      return;
    }
    const next = (current + 1) % stories.length;
    this.activeStoryIndex.set(next);
  }

  prevStory(event: Event): void {
    event.stopPropagation();
    const current = this.activeStoryIndex();
    const stories = this.displayedStories();
    if (current === null || stories.length === 0) {
      return;
    }
    const prev = (current - 1 + stories.length) % stories.length;
    this.activeStoryIndex.set(prev);
  }

  storyLabel(index: number): string {
    const labels = ['Travel', 'Food', 'Nature', 'Daily', 'Vibes'];
    return labels[index % labels.length];
  }

  private buildStories(count: number): string[] {
    if (count <= 0) {
      return [];
    }
    const pool = [...this.storyImagePool];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, Math.min(count, pool.length));
  }
}

export const resolveRouteData: ResolveFn<string> = () => "I'm a dynamic route text!✨";

export const resolveTitle: ResolveFn<string> = (routeSnapshot) =>
  `ElmerGram | ${routeSnapshot?.paramMap.get('username')}`;
