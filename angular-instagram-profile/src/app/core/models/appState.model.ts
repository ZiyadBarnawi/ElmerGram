import { User } from '@shared/models/user.model';

export interface AppState {
  currentUser: User;
  tempUser: User;
}
