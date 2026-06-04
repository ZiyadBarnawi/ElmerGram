import { Comment } from './comment.model';

export interface Post {
  id?: string;
  username?: string;
  media?: string;
  description?: string;
  likes?: number;
  createdAt?: string;
  comments?: Comment[];
}
