import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';









const matFuntion = [
  MatToolbarModule, MatButtonModule, MatIconModule,
  FormsModule,MatInputModule,MatFormFieldModule,
  MatMenuModule,MatDialogModule,
  MatTabsModule,MatSelectModule,
  MatListModule,MatCheckboxModule,
  MatRadioModule,MatSlideToggleModule,
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
