import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatUIModuleModule } from './mat-uimodule.module';
import { SidenavComponent } from '../userComponents/sidenav/sidenav.component';
import { UserBaseComponent } from '../userComponents/user-base/user-base.component';
import { Routes, RouterModule } from '@angular/router';
import { UserBodyComponent } from '../userComponents/user-body/user-body.component';
import { DashboardComponent } from '../userComponents/dashboard/dashboard.component';
import { ChannelsComponent } from '../userComponents/channels/channels.component';
import { MembersComponent } from '../userComponents/members/members.component';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { TopheaderComponent } from '../userComponents/topheader/topheader.component';
import { AddCommunityComponent } from '../userComponents/add-community/add-community.component';
import { AddChannelComponent } from '../userComponents/add-channel/add-channel.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../servicess/user-service.service';
import { SelectedCommunityComponent } from '../userComponents/selected-community/selected-community.component';




const routes: Routes = [
  {
    path: '', component: UserBaseComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full',},
      { path: 'dashboard', component: DashboardComponent,},
      { path: 'community', component: SelectedCommunityComponent,},
      { path: 'channels/:id', component: ChannelsComponent,},
      { path: 'members/:id', component: MembersComponent,},
]}

];

@NgModule({
  declarations: [
    UserBaseComponent,
    SidenavComponent,
    UserBodyComponent,
    DashboardComponent,
    ChannelsComponent,
    MembersComponent,
    TopheaderComponent,
    AddCommunityComponent,
    AddChannelComponent,
    SelectedCommunityComponent,
  ],
  imports: [
    CommonModule,
    MatUIModuleModule,HttpClientModule,ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule,],
  providers: [UserServiceService]

})
export class UserModuleModule { }
