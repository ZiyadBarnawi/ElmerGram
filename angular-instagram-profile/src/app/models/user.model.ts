import { Post } from './post.model';

export interface User {
  username: string;
  password: string;
  email?: string;
  phone_number?: string;
  gender?: string;
  date_of_birth?: string;
  bio?: string;
  pfp_url: string;
  followers?: number;
  following?: number;
  posts?: Post[];
  stories?: string[];
  hasActiveStory?: boolean;
  created_at?: Date;
}
