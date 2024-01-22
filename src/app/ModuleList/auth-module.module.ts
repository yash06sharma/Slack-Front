import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatUIModuleModule } from './mat-uimodule.module';
import { RegisterComponentComponent } from '../AuthComponents/register-component/register-component.component';
import { LoginComponentComponent } from '../AuthComponents/login-component/login-component.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { DisplayauthComponent } from '../displayauth/displayauth.component';
import { FlashappComponent } from '../flashapp/flashapp.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../servicess/auth-service.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [

  {
    path: '', component: DisplayauthComponent, children: [
      { path: '', component: FlashappComponent,},
      { path: 'register', component: RegisterComponentComponent,},
      { path: 'login',component: LoginComponentComponent},
    ]
  }
];


@NgModule({
  declarations: [
    RegisterComponentComponent,
    LoginComponentComponent,
    HeaderComponent,
    FlashappComponent,
    DisplayauthComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MatUIModuleModule,ReactiveFormsModule,
    RouterModule.forChild(routes),HttpClientModule,ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [AuthServiceService]
})
export class AuthModuleModule { }
