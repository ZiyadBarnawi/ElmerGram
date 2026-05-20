import { AfterViewInit, Component, ElementRef, HostListener, input, ViewChild } from '@angular/core';
import { Post as PostModel } from '../../models/post.model';
import { gsap } from 'gsap';
@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  hostDirectives:[

    // DIrectives that will apply by default to this component
  ]
})
export class Post implements AfterViewInit {
  post = input<PostModel>();
  @ViewChild('likes') likes!: ElementRef;
  @ViewChild('img') img!: ElementRef;
  ngAfterViewInit(): void {
    // Prime GSAP with the initial states
    gsap.set(this.likes.nativeElement, { opacity: 0 });
    gsap.set(this.img.nativeElement, { filter: 'blur(0rem) brightness(100%)' });
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
