import { User } from '@shared/models/user.model';

export interface AppState {
  counter: { value: number };
  user: { value: User };
}
