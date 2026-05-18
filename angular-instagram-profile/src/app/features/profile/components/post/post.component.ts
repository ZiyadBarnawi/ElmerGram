import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { gsap } from 'gsap';

import { UserService } from '@core/services/user.service';
import { Images } from '@shared/models/images.enum';
import type { Post as PostModel } from '@shared/models/post.model';

@Component({
  selector: 'app-post',
  imports: [DialogModule, DecimalPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class Post {
  post = input<PostModel>();
  link = input<string>('https://www.google.com');

  userService = inject(UserService);
  Images = Images;
  dialogVisible = signal(false);

  @ViewChild('likes') likes!: ElementRef<HTMLElement>;
  @ViewChild('img') img!: ElementRef<HTMLImageElement>;
  @ViewChild('dialogContent') dialogContent!: ElementRef<HTMLElement>;

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

  openDialog(event: Event): void {
    event.stopPropagation();
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
  }

  postUsername(): string {
    return this.post()?.username ?? this.userService.user()?.username ?? '';
  }

  onDialogShow(): void {
    requestAnimationFrame(() => this.animateDialogOpen());
  }

  onDialogHide(): void {
    if (this.dialogContent?.nativeElement) {
      gsap.set(this.dialogContent.nativeElement, { clearProps: 'all' });
    }
  }

  private animateDialogOpen(): void {
    const dialogContent = this.dialogContent?.nativeElement;
    if (!dialogContent) {
      return;
    }

    gsap.fromTo(
      dialogContent,
      {
        scale: 0.88,
        opacity: 0,
        transformOrigin: 'center center',
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      },
    );

    const mask = document.querySelector('.post-dialog .p-dialog-mask');
    if (mask) {
      gsap.fromTo(mask, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    }
  }
}
