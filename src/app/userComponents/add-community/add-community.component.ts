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
    this.getdataForCommunityMember();
    this.addCommunityForm();
    this.addChannelForm();
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
      id: 2, name:this.registerCommunity.value.name,
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

  community_ID:number = 2;
  community_Name:string ="Team Software";

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
    });

    this.registerChannel.reset();
  }

//-------------Select Member-----------


  data:{ id: number; name: string; email:string }[]  = [];
  users: { id: number; name: string; role: string, email:string }[] = [];

  getdataForCommunityMember(){
    this.db.get_FrstCommunity_Created_Member().subscribe((res:any)=>{
      this.data = res.Data;
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



  created_by:string = 'Yash'
  channel_Id:any= 3;
  channelName:string = "Jordan";
  handleButtonClick() {
    const selectedRoles = this.users
      .filter(user => user.role !== '')
      .map(user => ({ id: user.id, role: user.role,email:user.email, channel_ID: this.channel_Id,
        channel_Name: this.channelName, community_ID: this.community_ID,
        community_Name: this.community_Name, created_by: this.created_by}));

    console.log('Selected Roles:', selectedRoles);
    this.db.send_multiple_Email(selectedRoles).subscribe((res)=>{
      console.log(res);
    })

  }

}


  // textdisplay:boolean = false;

  // status: boolean = true;
  // someMethod(data:any){
  //   this.status = false;
  //   this.textdisplay = true;
  //   console.log(data);
  // }

// selectedValue: string = '';
  // foods = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'},
  // ];

  // typesOfShoes: string[] = ['Yash', 'Suresh', 'Diptesh', 'Max', 'Anand'];

  // onSelection(data:any){
  //     console.log(data.option.selected);
  // }
