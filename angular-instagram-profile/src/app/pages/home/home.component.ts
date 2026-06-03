import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class Home {
  store = inject(Store<{ counter: number }>);

  counter?: number;
  counter$ = this.store.select('counter');
  //TIP: iIf I didn't use the 'async' pipe, it have to write the entire next code. Thank async pipe!
  // ngOnInit() {
  //   this.counter$.subscribe((val) => {
  //     this.counter = val;
  //   });
  // }
}
