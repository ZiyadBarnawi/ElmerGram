import { Component, signal } from '@angular/core';
import { TabsModule, Tab, TabList } from 'primeng/tabs';
import { Post } from '../post/post';
import { Post as PostModel } from './../../models/post.model';
@Component({
  standalone: true,
  selector: 'app-posts',
  imports: [TabsModule, Post],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  updateRandomValue(): void {
    console.log(this.randomNum());

    this.randomNum.set(Math.floor(Math.random() * 10) + 1);
    console.log(this.randomNum());
  }
  randomNum = signal<number>(Math.floor(Math.random() * 7));

  posts = signal<PostModel[]>([
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
    { imgSrc: 'sunnyDay.jpg', likesCount: 13 },
  ]);
}
