import { Component, OnInit } from '@angular/core';
import { AddCommunityComponent } from './../add-community/add-community.component';
import {MatDialog} from '@angular/material/dialog';
import { UserServiceService } from 'src/app/servicess/user-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dialog:MatDialog, private db:UserServiceService, private router: Router) {
    console.log("Dashboard Working");
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

show_community(){
  this.db.showDashboard_Data().subscribe((res:any)=>{
    this.community_data = res.community;
    console.log(res);

  })
}


 CommunityItem:any[] = [];

selected_community(ID:number){
  this.db.show_SelectedCommunity_Data(ID).subscribe((res:any)=>{
    // console.log(res['community'][0]);
    var communityData = res['community'][0];

     this.CommunityItem = [{
      id: communityData.id,
      Name: communityData.Name,
      Description: communityData.Description,
      CommunityMembers: communityData.CommunityMembers,
      Channels: communityData.Channels,
    }];

    this.db.ch_subject.next(this.CommunityItem);
    // console.log(this.CommunityItem);

  });

}




}
