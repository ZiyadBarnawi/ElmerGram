import { Component, ElementRef, viewChild } from '@angular/core';
import { Images } from '@shared/models/images.enum';
import { Post as PostModel } from '@shared/models/post.model';
import { Post } from '@shared/components/post/post.component';
import { Post as PostDirective } from '@shared/directives/post';
import { PostsComponent } from '@shared/components/posts/posts.component';

@Component({
  selector: 'app-reels',
  imports: [Post, PostDirective],
  templateUrl: './reels.html',
  styleUrl: './reels.css',
})
export class Reels {
  private date = new Date();
  protected posts: PostModel[] = [
    {
      media: Images[0],
      likes: 22,
      username: '@Zsh',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[2],
      likes: 14,
      username: '@Ziyad',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[4],
      likes: 1,
      username: '@Adam',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[1],
      likes: 2,
      username: '@Ali',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[2],
      likes: 57,
      username: '@Mohammad',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[3],
      likes: 32,
      username: '@Hamed',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[4],
      likes: 73,
      username: '@D',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[0],
      likes: 38,
      username: '@Abdullah',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[3],
      likes: 79,
      username: '@Mishari',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[2],
      likes: 22,
      username: '@Shaher',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[1],
      likes: 261,
      username: '@Zsh',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[2],
      likes: 217,
      username: '@Zsh',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[3],
      likes: 85,
      username: '@Zsh',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[4],
      likes: 16,
      username: '@Zsh',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[0],
      likes: 214,
      username: '@Zsh',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[0],
      likes: 111,
      username: '@Zsh',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[4],
      likes: 73,
      username: '@Zsh',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[2],
      likes: 235,
      username: '@Zsh',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[1],
      likes: 2385,
      username: '@Zsh',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
    {
      media: Images[4],
      likes: 2835,
      username: '@Zsh',
      createdAt: (this.date.getDate() + Math.random() * 10).toString(),
    },
  ];
}
