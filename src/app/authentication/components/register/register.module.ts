import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SwtButtonModule } from 'src/app/shared/components/swt-button/swt-button.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SwtButtonModule,
    TranslateModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule
  ]
})
export class RegisterModule { }
