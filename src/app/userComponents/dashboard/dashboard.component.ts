import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AddCommunityComponent } from './../add-community/add-community.component';
import {MatDialog} from '@angular/material/dialog';
import { UserServiceService } from 'src/app/servicess/user-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnChanges {

  constructor(private dialog:MatDialog, private db:UserServiceService, private router: Router,private cdr: ChangeDetectorRef) {
    console.log("Dashboard Working");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Change Happend");
  }

  ngOnInit(): void {
    this.show_community();
    console.log("Working Dashboard Data");

  }

  openDialog(){
    const dialogRef = this.dialog.open(AddCommunityComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        });
}



community_data: any[] = [];// userData: any = {};
// community_data: { channels: number; community_members: number; Community_name: string, community_desc:string }[] = [];


// data:any;

show_community(){    //----------For All Data of community
  const storedCredentials = JSON.parse(localStorage.getItem('Auth') || '{}');

  if(storedCredentials.id){
    this.db.showDashboard_Data(storedCredentials.id).subscribe((res:any)=>{
      this.community_data = res.community;
      console.log(res);

    })
  }
}


 CommunityItem:any[] = [];

selected_community(com_id:number){  //-----------For single data of community
  const storedCredentials = JSON.parse(localStorage.getItem('Auth') || '{}');
  var data = {
    user_id: storedCredentials.id,
     comm_id:com_id,
  }

  this.db.show_SelectedCommunity_Data(data).subscribe((res:any)=>{

    var communityData = res['community'][0];
     this.CommunityItem = [{
      id: communityData.id,
      Name: communityData.Name,
      Created_by : communityData.Created_by,
      Description: communityData.Description,
      CommunityMembers: communityData.CommunityMembers,
      Channels: communityData.Channels,
    }];

    this.db.ch_subject.next(this.CommunityItem);
    console.log(this.CommunityItem,);
    localStorage.setItem('community-data', JSON.stringify(res['community'][0]));


    let data = {
      'Created_by': res['community'][0]['Created_by'],
      'Name': res['community'][0]['Name'],
    };
    this.sendLink(data);
  });


}


sendLink(linkData:any) {
  this.router.navigate(["/user/community"], {queryParams: linkData});
  // console.log(linkData);
}




}
