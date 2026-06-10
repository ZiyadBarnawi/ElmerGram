import { inject } from '@angular/core';
import { AppState } from '@core/models/appState.model';
import { UserService } from '@core/services/user.service';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { createAction, createReducer, on, props, Store } from '@ngrx/store';
import { User } from '@shared/models/user.model';
import { firstValueFrom, tap, withLatestFrom } from 'rxjs';

let initialValue: User | null = {
  username: 'Ziyad',
  phoneNumber: '5511223344',
  email: 'ziyad@mail.com',
  password: 'ziyad007',
  pfpUrl: 'cookie.jpg',
  bio: 'Tech & AI enthusiast 🤖 | Speaker | Opinions are my own',
  dateOfBirth: '1990-04-12T00:00:00.000Z',
  gender: 'M',
  city: 'Dubai',
  stories: ['drops.jpg', 'desert.jpg', 'sunnyDay.jpg', 'cookie.jpg', 'carbet.jpg'],
  followers: [
    {
      username: 'jafar',
      pfpUrl: 'cookie.jpg',
      bio: 'Coffee lover ☕ | Traveler 🌍 | Building things one day at a time',
      city: 'Medina',
    },
    {
      username: 'Hussam',
      pfpUrl: 'snowflake.webp',
      bio: 'Photographer 📷 | Riyadh → Everywhere | Moments over things',
      city: 'Riyadh',
    },
    {
      username: 'Huda',
      pfpUrl: 'carbet.jpg',
      bio: 'Interior designer 🏡 | Bringing spaces to life | DM for collabs',
      city: 'Jeddah',
    },
    {
      username: 'Feras',
      pfpUrl: 'sunFlower.jpg',
      bio: 'Just vibing 🎧 | CS student | Gamer by night',
      city: 'Mecca',
    },
    {
      username: 'Kevin',
      pfpUrl: 'defaultAvatar.jpg',
      bio: 'Football ⚽ | Fitness 💪 | Al-Hilal fan till I die 💙',
      city: 'Riyadh',
    },
    {
      username: 'Abdullah',
      pfpUrl: 'defaultAvatar.jpg',
      bio: 'Foodie 🍕 | Amateur chef | Medina local 🕌',
      city: 'Medina',
    },
    {
      username: 'adam',
      pfpUrl: 'drops.jpg',
      bio: '🎨 Digital artist | Turning ideas into pixels | Open for commissions',
      city: 'Khobar',
    },
  ],
  following: [
    {
      username: 'Huda',
      pfpUrl: 'carbet.jpg',
      bio: 'Interior designer 🏡 | Bringing spaces to life | DM for collabs',
      city: 'Jeddah',
    },
  ],
  posts: [
    {
      id: 'post_ziyad_1',
      username: 'Ziyad',
      media: 'sunnyDay.jpg',
      description:
        'AI is not replacing you — someone using AI is. Start learning now. 🤖 #Tech #AI',
      likes: 45000,
      createdAt: '2025-10-10T09:00:00.000Z',
      comments: [
        { username: 'jafar', content: 'This hit different 💯', replies: 5, likes: 980 },
        {
          username: 'Hussam',
          content: 'Sharing this everywhere',
          replies: 3,
          likes: 740,
        },
        {
          username: 'Feras',
          content: "Okay okay I'll start that course 😭",
          replies: 2,
          likes: 610,
        },
        {
          username: 'Abdullah',
          content: 'Needed to hear this today fr',
          replies: 1,
          likes: 430,
        },
      ],
    },
    {
      id: 'post_ziyad_2',
      username: 'Ziyad',
      media: 'desert.jpg',
      description: 'Dubai → Riyadh road trip 🚗 Some thoughts on building in the Middle East 🧵',
      likes: 32000,
      createdAt: '2025-10-17T14:00:00.000Z',
      comments: [
        {
          username: 'Kevin',
          content: 'The thread was incredible, more please!',
          replies: 2,
          likes: 520,
        },
        {
          username: 'Huda',
          content: 'The entrepreneurship ecosystem here is growing so fast',
          replies: 3,
          likes: 480,
        },
      ],
    },
    {
      id: 'post_ziyad_3',
      username: 'Ziyad',
      media: 'rainnyCar.jpg',
      description: "Even on grey days, the grind doesn't stop ☁️💻",
      likes: 28000,
      createdAt: '2025-10-24T11:30:00.000Z',
      comments: [
        {
          username: 'adam',
          content: 'This is the content I follow you for 🙌',
          replies: 1,
          likes: 390,
        },
        {
          username: 'jafar',
          content: 'Motivational and aesthetic? Legend move',
          replies: 2,
          likes: 310,
        },
      ],
    },
  ],
};
export const editCurrentUser = createAction('[User] Edit Current User', props<User>());
export const editTempUser = createAction('[User] Edit Temp User', props<User>());

export const currentUserReducer = createReducer(
  initialValue,
  on(editCurrentUser, (state, action) => {
    return { ...state, ...action } as User;
  }),
);
export const tempUserReducer = createReducer(
  {} as User,
  on(editTempUser, (state, action) => {
    return { ...state, ...action } as User;
  }),
);

export const currentUserSelector = (state: AppState) => state.currentUser;
export const tempUserSelector = (state: AppState) => state.tempUser;

export class userSideEffect {
  userService = inject(UserService);
  actions$ = inject(Actions);
  store = inject(Store);
  logUserSideEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        withLatestFrom(this.store.select(currentUserSelector)), // to get the store data
        tap(async ([action, slice]) => {
          let user = await this.userService.getInitialUser();

          console.log(`[ ${action?.type} ] Side Effect is fired 💥💥💥`);

          this.store.dispatch(editCurrentUser(user));
        }),
      ),
    { dispatch: false },
  );
}
