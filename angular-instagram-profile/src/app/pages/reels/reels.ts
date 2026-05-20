import { Component } from '@angular/core';
import { Images } from '@shared/models/images.enum';
import { Post as PostModel } from '@shared/models/post.model';
import { Post } from "@shared/components/post/post.component";
import { Post as PostDirective } from "@shared/directives/post";

@Component({
  selector: 'app-reels',
  imports: [Post, PostDirective],
  templateUrl: './reels.html',
  styleUrl: './reels.css',
})
export class Reels {
  protected posts: PostModel[] = [
    { media: Images[0], likes: 22 },
    { media: Images[2], likes: 14 },
    { media: Images[4], likes: 1 },
    { media: Images[1], likes: 2 },
    { media: Images[2], likes: 57 },
    { media: Images[3], likes: 32 },
    { media: Images[4], likes: 73 },
    { media: Images[0], likes: 38 },
    { media: Images[3], likes: 79 },
    { media: Images[2], likes: 22 },
    { media: Images[1], likes: 261 },
    { media: Images[2], likes: 217 },
    { media: Images[3], likes: 85 },
    { media: Images[4], likes: 16 },
    { media: Images[0], likes: 214 },
    { media: Images[0], likes: 111 },
    { media: Images[4], likes: 73 },
    { media: Images[2], likes: 235 },
    { media: Images[1], likes: 2385 },
    { media: Images[4], likes: 2835 },
  ];
}
