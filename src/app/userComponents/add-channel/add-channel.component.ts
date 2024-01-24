import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserServiceService } from 'src/app/servicess/user-service.service';


@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css']
})
export class AddChannelComponent implements OnInit {

  constructor(private fb:FormBuilder, private db:UserServiceService,
    public dialogRef: MatDialogRef<AddChannelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

  }

createChannelForm!:FormGroup;
submitted:boolean = false;
dataForChannle:any[] = [];
  ngOnInit(): void {
    //----------Trial-----------
    this.dataForChannle = this.data.result;
    this.getdataOfSingleCommunity_withchannel();



    //----------Trial End---------
    this.createChannelRegisterFuntion();
    this.merge_communityMember_data();
  }

//--------------------Create Channel------------------
  createChannelRegisterFuntion(){
    this.createChannelForm = this.fb.group({
      ch_name:['',[Validators.required]],
    });
  }

  get CH(){
    return this.createChannelForm.controls;
  }

  submit_Channel_btn(){
    this.submitted = true;
    if(this.createChannelForm.invalid){
      return ;
    }
    //----------------community_ID Which is come from Top level Selected community id by Admin---------
    // var channel_Data = {
    //   id: 2,//----------Community ID Require in this place
    //   name:this.createChannelForm.value.ch_name,
    // }
    // this.db.addCommunity_Channel_funtion(channel_Data).subscribe((res)=>{
    //   console.log(res);
    // });

    console.log(this.createChannelForm.value.ch_name);

    this.createChannelForm.reset();
  }

//---------------End Create Channel-------------------


  //---------Select Channel-------------
channel_Member_List:any[] = [];
  selectChannel(data:any){
    console.log(data);
    if(this.dataForChannle){
      this.channel_Member_List = this.dataForChannle[0]['Channels']['Members'].map((element: any)=>{
        return {
          id: element.user_ID,
          label: element.Name,
                };
   });
      console.log(this.channel_Member_List);
      // console.log(this.dataForChannle[0]);

    }



  }


  users: { id: number; name: string; email:string }[] = [];
  selectedOptions:any=[];
  selectedOption:any;

  selected_community_member: { id: number; name: string; email:string }[] = [
  { id: 1, name: 'yash',email:'06yashsharma@gmail.com'},
  { id: 2, name: 'safal',email:'safal@gmail.com'},
  { id: 3, name: 'jayant',email:'jayant@gmail.com'},
  { id: 4, name: 'ranu',email:'ranu@gmail.com'},
  { id: 5, name: 'jasmin',email:'jasmin@gmail.com'},

];

merge_communityMember_data(){
  this.users = this.selected_community_member;
}

  memberFilter(srch_member:any){
    const foundUser = this.selected_community_member.find(user => user.name === srch_member.target.value);
    if (foundUser) {
      this.users = [foundUser];
    }else{
      this.merge_communityMember_data();
    }
  }


  onNgModelChange(event:any){
    // console.log(event);
    this.selectedOption=event;
  }

  addUserOnClick(){
    console.log(this.selectedOption);
  }



//----------Trial----------------
  channel_List_data:{ id: number; label: string}[]  = [];
  // users: { id: number; name: string; email:string }[] = [];  //------------End Trial-----------


getdataOfSingleCommunity_withchannel(){
  if(this.dataForChannle){
    this.channel_List_data = this.dataForChannle[0]['Channels'].map((element: any)=>{
      return {
        id: element.ChannelID,
        label: element.ChannelName,
                 };
 });
    console.log(this.channel_List_data);
    // console.log(this.dataForChannle[0]);

  }


}

//--------------Trial------------







}
