import {
  afterNextRender,
  Component,
  ElementRef,
  HostListener,
  input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Post as PostModel } from '../../models/post.model';
import { gsap } from 'gsap';
@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class Post {
  post = input<PostModel>();
  @ViewChild('likes') likes!: ElementRef;
  @ViewChild('img') img!: ElementRef;

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
