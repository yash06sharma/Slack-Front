import { Component, OnInit } from '@angular/core';
import { AddCommunityComponent } from './../add-community/add-community.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dialog:MatDialog) {
    console.log("Dashboard Working");
  }

  ngOnInit(): void {
    this.show_community();
    console.log("Working");

  }

  openDialog(){
    const dialogRef = this.dialog.open(AddCommunityComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        });
}



community_data:any;


show_community(){
  var database = [
    // { id: '', icon: '', routeLink: '', label: ' ' },
    { id: 2, member: 6, channel: 5, name: 'Team Software', description: 'comm desc' },
    // { id: 2, member: 6, channel: 5, name: 'Team Software', description: 'comm desc' },
    // { id: 2, member: 6, channel: 5, name: 'Team Software', description: 'comm desc' },
    // { id: 2, member: 6, channel: 5, name: 'Team Software', description: 'comm desc' },
    // { id: 2, member: 6, channel: 5, name: 'Team Software', description: 'comm desc' },
  ];
  this.community_data = database
  // console.log(this.community_data);
}



}
