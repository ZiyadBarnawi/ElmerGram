import {
  AfterContentInit,
  afterNextRender,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { Images } from '@shared/models/images.enum';
import { Post as PostModel } from '@shared/models/post.model';
import { Post } from '@shared/components/post/post.component';
import { Post as PostDirective } from '@shared/directives/post';
import { createDraggable } from 'animejs';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-reels',
  imports: [Post, PostDirective],
  templateUrl: './reels.html',
})
export class Reels implements OnInit {
  private date = new Date();
  private userService = inject(UserService);
  protected posts: PostModel[] = [];
  constructor() {
    afterNextRender(() => {
      setTimeout(() => {
        this.posts.forEach((_, i) => {
          createDraggable(`.post-${i}`, { container: [-5, 5, 5, -5], containerFriction: 0.8 });
        });
      }, 500);
    });
  }
  async ngOnInit() {
    this.posts = await this.userService.getReels();
  }
}
