import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModuleModule } from './ModuleList/user-module.module';
import { AuthModuleModule } from './ModuleList/auth-module.module';
import { FlashappComponent } from './flashapp/flashapp.component';
import { DisplayauthComponent } from './displayauth/displayauth.component';

// const routes: Routes = [];
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./ModuleList/auth-module.module').then(m => m.AuthModuleModule)
  },
];

@NgModule({
  imports: [
    // AuthModuleModule,
    // UserModuleModule,
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
