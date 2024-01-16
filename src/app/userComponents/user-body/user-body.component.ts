import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-body',
  templateUrl: './user-body.component.html',
  styleUrls: ['./user-body.component.css']
})
export class UserBodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth >786){
      styleClass = 'body-trimmed';
    }else if(this.collapsed && this.screenWidth <= 786 && this.screenWidth > 0){
        styleClass = 'body-md-screen'
    }
      return styleClass;
  }

}
