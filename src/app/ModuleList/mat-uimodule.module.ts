import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const matFuntion = [
  MatToolbarModule, MatButtonModule, MatIconModule,
  FormsModule,MatInputModule,MatFormFieldModule

]

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    matFuntion,
  ],
  exports: [
    matFuntion
  ]
})
export class MatUIModuleModule { }
