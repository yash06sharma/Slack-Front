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


  updated_Data:any[] = [];
  updateCommunity_Data(comm_id:number){
    const storedCredentials = JSON.parse(localStorage.getItem('Auth') || '{}');
   if(storedCredentials){
    var data = {
      user_id: storedCredentials.id,
       comm_id:comm_id,
    }
    this.db.show_SelectedCommunity_Data(data).subscribe((res:any)=>{
      this.updated_Data = res['community'];


      this.dataForChannle  = this.updated_Data;
      console.log("Data from server",this.updated_Data);
    });
  }
  this.handleDataForChannel();
  }

  datacomeFromDialog(){
    this.dataForChannle = this.data.result;
    console.log("Data from model",this.data.result);
  }

  handleDataForChannel() {
    this.getdataOfSingleCommunity_withchannel();
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
        const communityData = JSON.parse(localStorage.getItem('community-data') || '{}');
        if(this.createChannelForm.invalid){
          return ;
        }
        var channel_Data = {
              community_ID: communityData.id,
              name:this.createChannelForm.value.ch_name,
            }
            this.db.addCommunity_Channel_funtion(channel_Data).subscribe((res)=>{
              console.log(res);
              if(res != null){

                this.updateCommunity_Data(communityData.id);//-----------------Updated data get from server
              }

            });

            this.createChannelForm.reset();
      }

    //---------Select Channel-------------
  channel_Member_Not_Exist:any[] = [];
  channel_data_on_select:any;
    selectChannel(data:any){
      this.channel_data_on_select = data;
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
                      Status: element.Status,
                           };
              });
              console.log("Community Member", comm_Member);

              this.channel_Member_Not_Exist = comm_Member.filter((commMember: any) =>
                channel_Member_exist.every((channelMember: any) =>
                channelMember.user_ID !== commMember.user_ID && commMember.Status !== 'Pending')
              );
              console.log("Community not exist", this.channel_Member_Not_Exist);
      this.merge_communityMember_data();
    }


    users: { user_ID: number; Name: string}[] = [];
    selectedOptions:{user_id:number}[]=[];
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
    onNgModelChange(event:any[]){
      console.log(event);
      this. selectedOptions = event;

    }

    addUserOnClick(){
      const work =  this.selectedOptions.map((user: any) => ({ user_id: user.user_id, channel_id: this.channel_data_on_select}));
          console.log(work);
            this.db.Add_Member_For_channel(work).subscribe((res)=>{
              console.log(res);
            })
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







}
