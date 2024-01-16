import { AddChannelComponent } from './../add-channel/add-channel.component';
import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild, ElementRef,  } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import {MatDialog} from '@angular/material/dialog';

interface SidenavToggle{
  screenWidth: number;
  collapsed: boolean;
}

interface NavItem {
  routeLink: any;
  icon: string;
  label: string;
  id: any;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations:[
    trigger('fadeInOut', [
      transition(':enter',[
          style({opacity:0}),
          animate('350ms',
          style({opacity:1})
          )
      ]),
      transition(':leave',[
        style({opacity:1}),
        animate('350ms',
        style({opacity:0})
        )
    ])
    ]),
    trigger('rotate',[
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'}),
          ])
        )
      ])
    ])

  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SidenavToggle> = new EventEmitter();

  collapsed = false;
  // navData = navbarData;
  screenWidth  = 0;

  //--------------Nav Data Practicle-------------

    channeldata = [
    // { id: '', icon: '', routeLink: '', label: ' ' },
    { id: 2, icon: '2', routeLink: 'channels', label: 'channel 2' },
    // { id: 3, icon: '3', routeLink: 'channels', label: 'channel 3' },
    // { id: 4, icon: '4', routeLink: 'channels', label: 'channel 4' },
    // { id: 5, icon: '5', routeLink: 'channels', label: 'channel 5' },
  ];

  userdata = [
    { id: 1, icon: '1', routeLink: 'members', label: 'user1' },
    // { id: 2, icon: '2', routeLink: 'members', label: 'user2' },
    // { id: 3, icon: '2', routeLink: 'members', label: 'user3' },
    // { id: 4, icon: '2', routeLink: 'members', label: 'user4' },
    // { id: 5, icon: '2', routeLink: 'members', label: 'user5' },
  ];

  navData : {routeLink: any, icon: string, label: string, items: NavItem[] }[] = [
    {
      routeLink: 'dashboard',
      icon: 'fal fa-chat-bar',
      label: 'Dashboard',
      items: [],
    },
    {
      routeLink: null,
      icon: 'material-symbols-outlined',
      label: 'Channels',
      items: [],
    },
    {
      routeLink: null,
      icon: 'fal fa-chat-bar',
      label: 'Direct Message',
      items: [],
    },
  ];

  // ----------nav Data Practicle-------------


  @HostListener('window:resize', ['$event'])
  onResize(event:any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth});
    }

  }

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.addDataToNavData();
    this.add_Community_menuItem();

  }

  addDataToNavData(): void {
    if(this.channeldata != null){
      this.channeldata.forEach(element => {
        const newItem: NavItem = {
          id: element.id,
          routeLink: element.routeLink,
          icon: element.icon,
          label: element.label,
        };

        this.navData[1].items.push(newItem);
      });
    }
    // else{
    //   const newItem: NavItem = {
    //     id: '',
    //     routeLink: '',
    //     icon: '',
    //     label: '',
    //   };
    //   this.navData[1].items.push(newItem);
    // }


    this.userdata.forEach(element => {
      const newItem: NavItem = {
        id: element.id,
        routeLink: element.routeLink,
        icon: element.icon,
        label: element.label,
      };

      this.navData[2].items.push(newItem);
    });

  }

  togglecollapse(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth});
  }

  closeSidenav(){
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth: this.screenWidth});

  }



  metItemData = [
    { id: 1, communityName: 'Software'},
    { id: 2, communityName: 'Hardware'},
    { id: 3, communityName: 'Technical'},
    { id: 4, communityName: 'Essential'},
    { id: 5, communityName: 'Spritual'},
  ];
// selected: string = '';
selected: any;
menuItems: Array<{ text: string; id: number; elementRef?: MatMenu }> = [];

add_Community_menuItem(){
  for (let i = 0; i <= this.metItemData.length; i++) {
    const menuItem = {
      text: this.metItemData[i].communityName,
      id: this.metItemData[i].id,
      elementRef: undefined
    };

    this.menuItems.push(menuItem);
  }
}

// comm_select:boolean = false;
comm_name:string = 'Software';

select(item: any, text:string): void {
  // Your selection logic here
  this.selected = item;
  // this.comm_select = true;
  this.comm_name = text;
  console.log(this.selected + text, "Data from mat icon");

}


//---------------Add Cannels code-------------

openDialog(){
  const dialogRef = this.dialog.open(AddChannelComponent);
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    });
}


}
