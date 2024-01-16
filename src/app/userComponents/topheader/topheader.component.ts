import { Component, OnInit } from '@angular/core';
import { AddCommunityComponent } from './../add-community/add-community.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-topheader',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.css']
})
export class TopheaderComponent implements OnInit {

  constructor(private dialog:MatDialog) {

  }

  openDialog(){
        const dialogRef = this.dialog.open(AddCommunityComponent);
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            });
  }


  // openDialog() {
  //   // const dialogRef = this.dialog.open(DialogContentExampleDialog);

  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   console.log(`Dialog result: ${result}`);
  //   // });
  // }


  ngOnInit(): void {
  }



  logoutUser(){
    console.log("data");
  }
}
