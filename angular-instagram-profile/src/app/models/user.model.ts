import { Post } from './post.model';

export interface User {
  username: string;
  description?: string;
  profilePic: string;
  followers?: number;
  following?: number;
  posts?: Post[];
  stories?: string[];
}
