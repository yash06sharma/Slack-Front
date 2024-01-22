import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthServiceService } from './servicess/auth-service.service';
import { SelectedCommunityComponent } from './userComponents/selected-community/selected-community.component';

const matFuntion = [
  MatToolbarModule, MatButtonModule, MatIconModule

]

@NgModule({
  declarations: [
    AppComponent,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    // RichTextEditorModule,
    matFuntion
  ],
  providers: []
,
  bootstrap: [AppComponent,]
})
export class AppModule { }
