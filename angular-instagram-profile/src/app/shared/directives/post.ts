import { Directive, ElementRef, inject } from '@angular/core';
import gsap from 'gsap';

@Directive({
  selector: '[appPost]',
  host:{
    "(click)": 'open()',
    "(mouseenter)":"expand()",
    "(mouseleave)":"shrink()"
  }
})
export class Post {
  protected el=inject(ElementRef)
  expand(){
    gsap.to(this.el.nativeElement,{scale:1.05, duration:0.35,zIndex:999})
  }
  shrink(){
    gsap.to(this.el.nativeElement, { scale: 1, duration: 0.35, zIndex: 0 });
  }
  open(){    
    console.log("Clicked!!");
  }
  constructor() { }

}
