import { Post } from './post.model';

export interface User {
  username: string;
  password: string;
  email?: string;
  phoneNumber?: string;
  gender?: 'M' | 'F';
  dateOfBirth?: string;
  bio?: string;
  pfpUrl?: string;
  followers?: User[];
  following?: User[];
  posts?: Post[];
  stories?: string[];
  hasActiveStory?: boolean;
  createdAt?: Date;
  city?: string;
}
