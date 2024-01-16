import { Component, OnInit } from '@angular/core';

interface SidenavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-user-base',
  templateUrl: './user-base.component.html',
  styleUrls: ['./user-base.component.css']
})
export class UserBaseComponent implements OnInit {

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSideNav(data:SidenavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;

  }

}
