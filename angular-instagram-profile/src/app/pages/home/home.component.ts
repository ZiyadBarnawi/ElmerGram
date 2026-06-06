import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { decrement, increment, selectCounter } from '../../store/counter';
import { editUser, userSelector } from '../../store/user';
import { User } from '@shared/models/user.model';
import { firstValueFrom } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { UserCard } from '@shared/components/user-card/user-card';

@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    AvatarModule,
    ImageModule,
    DragScrollComponent,
    DragScrollItemDirective,
    UserCard,
  ],
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class Home {
  store = inject(Store<{ counter: number }>);
  user$ = this.store.select(userSelector);
  counter?: number;
  counter$ = this.store.select(selectCounter);

  increment(): void {
    this.store.dispatch(increment({ value: 5 }));
  }
  decrement() {
    this.store.dispatch(decrement({ value: 4 }));
  }
  async getUser() {
    console.log(await firstValueFrom(this.store.select(userSelector)));
  }
  async editUser() {
    let user = await firstValueFrom(this.store.select(userSelector));

    this.store.dispatch(
      editUser({ ...(user as unknown as User), bio: 'New Bio', city: 'New City' }),
    );
  }
  //TIP: iIf I didn't use the 'async' pipe, it have to write the entire next code. Thank async pipe!
  // ngOnInit() {
  //   this.counter$.subscribe((val) => {
  //     this.counter = val;
  //   });
  // }
}
