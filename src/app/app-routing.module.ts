import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModuleModule } from './ModuleList/user-module.module';
import { AuthModuleModule } from './ModuleList/auth-module.module';

// const routes: Routes = [];
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./ModuleList/auth-module.module').then(m => m.AuthModuleModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./ModuleList/user-module.module').then(m => m.UserModuleModule)
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
