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
    this.datacomeFromDialog();
    this.getdataOfSingleCommunity_withchannel();
    this.createChannelRegisterFuntion();

  }


  updateCommunity_Data(){
    this.db.show_SelectedCommunity_Data(1).subscribe((res:any)=>{
      this.dataForChannle  = res['community'];
      console.log("Data from server",res['community']);
      this.handleDataForChannel();

    });

  }

  datacomeFromDialog(){
    this.dataForChannle = this.data.result;
  }

  handleDataForChannel() {
    this.getdataOfSingleCommunity_withchannel();
    // You can use this.dataForChannle or perform further operations
    // console.log("Data in dialog", this.dataForChannle);
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
    // this.updateCommunity_Data();//-----------------Updated data get from server
  }

//---------------End Create Channel-------------------


    //---------Select Channel-------------
  channel_Member_Not_Exist:any[] = [];
    selectChannel(data:any){
      // console.log(data);
              if (this.dataForChannle) {
                var channel_Member_exist = this.dataForChannle[0]['Channels']
                  .map((element: any) => ({
                    id: element.ChannelID,
                    members: element.Members.map((member: any) => ({
                      user_ID: member.user_ID,
                      Name: member.Name,
                    })),
                  }))
                  .find((item: any) => item.id === data)?.members || [];

                // console.log(channel_Member_exist);
              }
              //----------End Channel Member Get--------------
              let comm_Member = this.dataForChannle[0]['CommunityMembers'].map((element: any)=>{
                    return {
                      user_ID: element.user_ID,
                      Name: element.Name,
                           };
              });

              this.channel_Member_Not_Exist = comm_Member.filter((commMember: any) =>
                channel_Member_exist.every((channelMember: any) =>
                channelMember.user_ID !== commMember.user_ID)
              );

      this.merge_communityMember_data();
    }


    users: { user_ID: number; Name: string}[] = [];
    selectedOptions:any=[];
    selectedOption:any;

  merge_communityMember_data(){
  this.users = this.channel_Member_Not_Exist;
  // console.log(this.users);

}

  memberFilter(srch_member:any){
    const foundUser = this.channel_Member_Not_Exist.find(user => user.Name === srch_member.target.value);
    if (foundUser) {
      this.users = [foundUser];
      console.log(foundUser);
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



  channel_List_data:{ id: number; label: string}[]  = [];


getdataOfSingleCommunity_withchannel(){
  if(this.dataForChannle){
    this.channel_List_data = this.dataForChannle[0]['Channels'].map((element: any)=>{
      return {
        id: element.ChannelID,
        label: element.ChannelName,
                 };
 });

  }


}

//--------------Trial------------







}
