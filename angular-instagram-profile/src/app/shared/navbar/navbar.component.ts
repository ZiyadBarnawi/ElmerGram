import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AvatarModule } from 'primeng/avatar';
import { Observable, catchError, firstValueFrom, of } from 'rxjs';

import { UserService } from '@core/services/user.service';
import { environment } from '@environments/environment';
import type { User } from '@shared/models/user.model';

type RecentProfile = Pick<User, 'username'> & { pfpUrl?: string };

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AvatarModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class Navbar {
  private static readonly MAX_RECENT = 12;
  private readonly recentStorageKey = 'elmergram-recent-profile-searches';

  userService = inject(UserService);
  searchOpen = signal(false);
  searchQuery = signal('');
  cachedUsers = signal<User[]>([]);
  recentProfiles = signal<RecentProfile[]>([]);
  usersLoadError = signal<string | null>(null);
  isLoadingUsers = signal(false);

  filteredUsers = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) {
      return [];
    }
    return this.cachedUsers().filter(
      (u) => u.username && u.username.toLowerCase().includes(q),
    );
  });

  private router = inject(Router);

  navProfileImageSrc(): string | null {
    const pfp = this.userService.user()?.pfpUrl?.trim();
    return pfp ? `/${pfp}` : null;
  }

  navProfileLabel(): string {
    return this.userService.user()?.username ?? 'Profile';
  }

  profileRoute(): string {
    const currentUser = this.userService.user()?.username ?? 'Ziyad';
    return `/profile/${currentUser}`;
  }

  toggleSearch(): void {
    const opening = !this.searchOpen();
    this.searchOpen.set(opening);
    if (opening) {
      this.readRecentFromStorage();
      void this.loadUsersCatalog();
    } else {
      this.searchQuery.set('');
    }
  }

  closeSearch(): void {
    this.searchOpen.set(false);
    this.searchQuery.set('');
  }

  openSignup(): void {
    this.userService.visibleSignupDialog = true;
    this.router.navigate(['/profile', this.userService.user()?.username ?? 'Ziyad', 'signup']);
  }

  onSearchInputEvent(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    if (this.cachedUsers().length === 0 && !this.isLoadingUsers()) {
      void this.loadUsersCatalog();
    }
  }

  suggestUserAvatarUrl(user: RecentProfile): string {
    const fallback = String(this.userService.Images[5]);
    return user.pfpUrl ? `/${user.pfpUrl}` : `/${fallback}`;
  }

  onUserPicked(user: RecentProfile): void {
    this.pushRecent(user);
    this.closeSearch();
  }

  private readRecentFromStorage(): void {
    try {
      const raw = sessionStorage.getItem(this.recentStorageKey);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      this.recentProfiles.set(Array.isArray(parsed) ? (parsed as RecentProfile[]) : []);
    } catch {
      this.recentProfiles.set([]);
    }
  }

  private pushRecent(user: RecentProfile): void {
    if (!user.username) {
      return;
    }
    const next = [
      { username: user.username, pfpUrl: user.pfpUrl },
      ...this.recentProfiles().filter((r) => r.username !== user.username),
    ].slice(0, Navbar.MAX_RECENT);
    this.recentProfiles.set(next);
    try {
      sessionStorage.setItem(this.recentStorageKey, JSON.stringify(next));
    } catch {
      /* ignore quota / private mode */
    }
  }

  private async loadUsersCatalog(): Promise<void> {
    if (this.isLoadingUsers() || this.cachedUsers().length > 0) {
      return;
    }
    this.isLoadingUsers.set(true);
    this.usersLoadError.set(null);
    try {
      const raw = await this.userService.getUsers();
      if (environment.production) {
        const resp = await firstValueFrom(
          (raw as Observable<{ data: User[] }>).pipe(
            catchError(() => of({ data: [] as User[] })),
          ),
        );
        this.cachedUsers.set(Array.isArray(resp.data) ? resp.data : []);
      } else {
        const list = raw as User[] | null | undefined;
        this.cachedUsers.set(Array.isArray(list) ? list : []);
      }
    } catch {
      this.usersLoadError.set('Could not load accounts to search.');
      this.cachedUsers.set([]);
    } finally {
      this.isLoadingUsers.set(false);
    }
  }
}
