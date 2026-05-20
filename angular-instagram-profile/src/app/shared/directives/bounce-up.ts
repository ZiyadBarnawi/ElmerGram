import { Directive, inject } from '@angular/core';
import gsap from 'gsap';
import { Button } from 'primeng/button';

@Directive({
  selector: '[appBounceUp]',
  host: {
    '(mouseenter)': 'bounceUp()',
    '(mouseleave)': 'bounceDown()',
  },
})
export class BounceUp {
  el = inject(Button);
  bounceUp() {
    gsap.to(this.el.el.nativeElement, { translateY: -2, duration: 0.2 });
  }
  bounceDown() {
    gsap.to(this.el.el.nativeElement, { translateY: 0, duration: 0.2 });
  }
}
