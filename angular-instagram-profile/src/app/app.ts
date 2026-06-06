import { AfterViewInit, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Toast, ToastModule } from 'primeng/toast';
import { Navbar } from './shared/components/navbar/navbar.component';
import { createAnimatable, utils } from 'animejs';
import { Header } from '@shared/components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ToastModule, Toast, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit {
  protected readonly title = signal('ElmerGram');
  private circle?: any;
  private bounds!: DOMRect;
  ngAfterViewInit() {
    this.bounds = document.body.getBoundingClientRect();

    this.circle = createAnimatable('.circle', {
      x: 0,
      y: 0,
      ease: 'out(4)',
      duration: 300,
    });
    window.addEventListener('mousemove', this.onMouseMove);
  }

  private onMouseMove = (e: MouseEvent) => {
    const { width, height, left, top } = this.bounds;
    const hw = width / 2;
    const hh = height / 2;

    const x = utils.clamp(e.clientX - left - hw, -hw, hw);
    const y = utils.clamp(e.clientY - top - hh, -hh, hh);

    this.circle.x(x).y(y);
  };
}
