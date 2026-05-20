import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Post as PostModel } from '../../models/post.model';
import { gsap } from 'gsap';
import { likes } from '@shared/pipes/likes';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { Images } from '@shared/models/images.enum';
import { BounceUp } from '@shared/directives/bounce-up';
import { UserService } from '@core/services/user.service';
@Component({
  selector: 'app-post',
  imports: [likes, Dialog, Button, Avatar, BounceUp],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  hostDirectives: [
    // DIrectives that will apply by default to this component
  ],
})
export class Post implements AfterViewInit {
  post = input<PostModel>();
  @ViewChild('likes') likes!: ElementRef;
  @ViewChild('img') img!: ElementRef;
  userService = inject(UserService);
  images = Images;
  expandedPost = false;
  ngAfterViewInit(): void {
    // Prime GSAP with the initial states
    gsap.set(this.likes.nativeElement, { opacity: 0 });
    gsap.set(this.img.nativeElement, { filter: 'blur(0rem) brightness(100%)' });
  }

  toggleExpandedPost() {
    this.expandedPost = !this.expandedPost;
  }
  like() {
    this.userService.messagesService.add({
      summary: 'Liked',
      severity: 'success',
      icon: 'pi-heart-fill',
      detail: 'The post is added to your likes list',
      closable: false,
      life: 1000,
    });
  }
  @HostListener('mouseenter')
  onMouseover(): void {
    gsap.to(this.likes.nativeElement, {
      opacity: 1,
      duration: 0.2,
      ease: 'power1.in',
    });
    gsap.to(this.img.nativeElement, {
      filter: 'blur(0.1rem) brightness(75%)',
      duration: 0.2,
      ease: 'power1.in',
    });
  }
  @HostListener('mouseleave')
  onMouseout(): void {
    gsap.to(this.likes.nativeElement, {
      opacity: 0,
      duration: 0.2,
      ease: 'power1.out',
    });
    gsap.to(this.img.nativeElement, {
      filter: 'blur(0rem) brightness(100%)',
      duration: 0.2,
      ease: 'power1.out',
    });
  }
}
