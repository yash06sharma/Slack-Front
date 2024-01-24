import { AddChannelComponent } from './../add-channel/add-channel.component';
import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { MatMenu, MatMenuItem } from '@angular/material/menu';
import {MatDialog} from '@angular/material/dialog';
import { UserServiceService } from 'src/app/servicess/user-service.service';
import { Subject } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class SidenavComponent implements OnInit{

  @Output() onToggleSideNav: EventEmitter<SidenavToggle> = new EventEmitter();
  addChannel_Opetion:boolean = false;
  collapsed = false;
  // navData = navbarData;
  screenWidth  = 0;

  //--------------Nav Data Practicle-------------

    channeldata:{ id: number, icon: string, routeLink: string, label:string }[] = [
      // { id: 1, icon: '1', routeLink: 'members', label: 'user1' },
      // { id: 2, icon: '2', routeLink: 'members', label: 'user2' },
    ];
    userdata: { id: number; icon: string; routeLink: string, label:string }[] = [
      // { id: 1, icon: '1', routeLink: 'members', label: 'user1' },
      //   { id: 2, icon: '2', routeLink: 'members', label: 'user2' },
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

  constructor(private dialog:MatDialog, private db:UserServiceService, private _changeDetectorRef:ChangeDetectorRef) {

    this.getChaanelData();


   }

   getChaanelData(){

     this.db.ch_subject.subscribe((result:any[])=>{
      this.Add_Channel_Data = result;
      console.log(result[0]);
       if(result[0]){
         this.channeldata = result[0]['Channels'].map((element: any)=>{
           return {
             id: element.ChannelID,
             icon: '0',
                        routeLink: 'channels',
                        label: element.ChannelName,
                      };
      });
      this.userdata = result[0]['CommunityMembers'].map((element: any)=>{
        return {
                   id: element.user_ID,
                   icon: '0',
                   routeLink: 'members',
                   label: element.Name,
                 };
                });
              }
              console.log("Side Nav Data");
              console.log(this.channeldata);
              console.log(this.userdata);
              this.addChannel_Opetion = true;
              this.addDataToNavData();
              // this._changeDetectorRef.detectChanges();
  });


   }








  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.addDataToNavData();
    this.add_Community_menuItem();
     console.log(this.channeldata);


  }

  addDataToNavData(): void {
    if(this.channeldata != null){
      this.navData[1].items = [];
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

    if(this.userdata != null){
    this.navData[2].items = [];
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


    // this._changeDetectorRef.detectChanges();
    // this._changeDetectorRef.markForCheck();
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

add_Community_menuItem() {
  if (this.metItemData && this.metItemData.length > 0) {
    for (let i = 0; i < this.metItemData.length; i++) {
      const menuItem = {
        text: this.metItemData[i].communityName,
        id: this.metItemData[i].id,
        elementRef: undefined
      };

      this.menuItems.push(menuItem);
    }
  }
}

comm_name:string = 'Software';

select(item: any, text:string): void {
  this.selected = item;
  this.comm_name = text;
  console.log(this.selected + text, "Data from mat icon");

}


//---------------Add Cannels code-------------
Add_Channel_Data:any[] = [];
chennel_disp: boolean = false;
openDialog(){
  const dialogRef = this.dialog.open(AddChannelComponent,{
    // disableClose: true,
            data :{'result':this.Add_Channel_Data}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    });
}


}

