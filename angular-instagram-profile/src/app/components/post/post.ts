import { Component, input, signal } from '@angular/core';
import { Post as PostModel } from './../../models/post.model';
@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {
  post = input<PostModel>();
}
