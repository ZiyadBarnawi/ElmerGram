import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { Dialog, DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

import { TextareaModule } from 'primeng/textarea';
import { Router, RouterLink } from '@angular/router';
import { environment } from '@core/environments/environment';
import { UserService } from '@core/services/user.service';
import { User } from '@shared/models/user.model';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-profile-edit-dialog-component',
  standalone: true,
  imports: [
    FileUploadModule,
    AvatarModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    InputMaskModule,
    DatePickerModule,
    SelectButtonModule,
    AutoCompleteModule,
    CheckboxModule,
    ReactiveFormsModule,
    DatePipe,
    DialogModule,
    Dialog,
    InputTextModule,
    TextareaModule,
    RouterLink,
    DividerModule,
  ],
  templateUrl: './profile-edit-dialog-component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './profile-edit-dialog-component.css',
})
export class ProfileEditDialogComponent implements OnInit {
  userService = inject(UserService);
  messageService = inject(MessageService);
  user: User | null = null;
  Images = this.userService.Images;
  async submitForm() {
    this.userService.editUser();
    console.log(this.user?.username);

    //replaceUrl ==> the user can't navigate back to this url

    this.messageService.add({ summary: 'Updated successfully' });
  }

  ngOnInit(): void {
    this.userService.userForm.patchValue(this.user!);
  }
}
