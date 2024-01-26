import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/servicess/user-service.service';

@Component({
  selector: 'app-add-community',
  templateUrl: './add-community.component.html',
  styleUrls: ['./add-community.component.css'],
})
export class AddCommunityComponent implements OnInit {
  registerCommunity!:FormGroup;
  registerChannel!:FormGroup;
  submitted:boolean = false;

  constructor(private fb:FormBuilder, private db:UserServiceService) { }

  ngOnInit(): void {
    this.Admin_detail_For_AddCommunity();
    this.getdataForCommunityMember();
    this.addCommunityForm();
    this.addChannelForm();
  }

  Admin_userID:number = 0;
  Admin_userName:string = '';
  Admin_detail_For_AddCommunity(){
       const storedCredentials = JSON.parse(localStorage.getItem('Auth') || '{}');
      if(storedCredentials){
      this.Admin_userID = storedCredentials.id;
      this.Admin_userName = storedCredentials.name;
      console.log("Get By LocalStorage Admin Detail");
      console.log(storedCredentials);
    }

  }

  addCommunityForm(){
    this.registerCommunity = this.fb.group({
      name:['',[Validators.required]],
      description:['',[Validators.required]],
    })
  }

  get f(){
    return this.registerCommunity.controls;
  }

  submitCommunityBTN(){
    this.submitted = true;
    if(this.registerCommunity.invalid){
      return ;
    }

    var data = {
      id: this.Admin_userID, name:this.registerCommunity.value.name,
      description: this.registerCommunity.value.description
    }
    this.db.addCommunityfuntion(data).subscribe((res)=>{
      if(res){
        localStorage.setItem('community-data', JSON.stringify(res));
        this.community_name_AfterCreate();
        // console.log(res);
      }
    });
    console.log(this.registerCommunity.value);

    this.registerCommunity.reset();
  }


  community_name = '';
  community_ID:number = 2;//-----------Edit krna he

community_name_AfterCreate(){
  const communityData = JSON.parse(localStorage.getItem('community-data') || '{}');
  if(communityData){
    this.community_name = communityData.Data.name;
    this.community_ID = communityData.Data.id;
    console.log("Get By LocalStorage");
    console.log(communityData);

  }

}


  // ------------------_Add Channel---------------------


  addChannelForm(){
    this.registerChannel = this.fb.group({
      namech:['',[Validators.required]],
    })
  }

  get RC(){
    return this.registerChannel.controls;
  }

  community_Name:string ='';

  submitChannelBTN(){
    this.submitted = true;
    if(this.registerChannel.invalid){
      return ;
    }
    var channel_Data = {
      id: this.community_ID,
      name:this.registerChannel.value.namech,
    }
    this.db.addCommunity_Channel_funtion(channel_Data).subscribe((res)=>{
      console.log(res);
      localStorage.setItem('Channel', JSON.stringify(res));
      this.channel_name_AfterCreate();
    });

    this.registerChannel.reset();
  }

  channel_name = '';
  channel_ID:number = 0;//-----------Edit krna he

channel_name_AfterCreate(){
  const Channel = JSON.parse(localStorage.getItem('Channel') || '{}');
   if(Channel){
    this.channel_name = Channel.Data.name;
    this.channel_ID = Channel.Data.id;
    console.log("Get By LocalStorage Channel Data");
    console.log(Channel);

  }

}


//-------------Select Member-----------


  data:{ id: number; name: string; email:string }[]  = [];
  users: { id: number; name: string; role: string, email:string }[] = [];

  getdataForCommunityMember(){
    this.db.get_FrstCommunity_Created_Member(this.Admin_userID).subscribe((res:any)=>{
      this.data = res.Data;
      console.log(res.Data);
      this.merge_data();

    })
  }

  merge_data(){
      this.users  = this.data
      .map(data => ({ id: data.id, name:data.name, role: '', email:data.email}));
  }

  applyFilter(data: any) {
    const foundUser = this.data.find(user => user.email === data.target.value);
        if (foundUser) {
          this.users = [
            { id: foundUser.id, name: foundUser.name, role: '', email: foundUser.email }
          ];
        } else {
          this.merge_data();
        }
  }

  //-------------Select Member End-----------


  handleButtonClick() {

    const selectedRoles = this.users
      .filter(user => user.role !== '')
      .map(user => ({ user_id: user.id, role: user.role,email:user.email, channel_ID: this.channel_ID,
        channel_Name: this.channel_name, community_ID: this.community_ID,
        community_Name: this.community_name, created_by: this.Admin_userName}));

    console.log('Selected Roles:', selectedRoles);
    if(selectedRoles !== null){
      this.db.send_multiple_Email(selectedRoles).subscribe((res)=>{
        console.log(res);
      })
    }

  }

}


