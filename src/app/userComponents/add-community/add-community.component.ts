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
    this.addCommunityForm();
    console.log(this.userRecord);
    this.merge_data();
    this.addChannelForm();
  }
  selectedValue: string = '';

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  typesOfShoes: string[] = ['Yash', 'Suresh', 'Diptesh', 'Max', 'Anand'];

  onSelection(data:any){
      console.log(data.option.selected);
  }

  userRecord: any[] = [
    {id: 1, name: 'Yash', Role:'06yashsharma@gmail.com'},
    {id: 2, name: 'Suresh', Role:'suresh@gmail.com'},
    {id: 3, name: 'Safal', Role:'safal@gmail.com'},
    {id: 4, name: 'Diptesh', Role:'diptesh@gmail.com'},
    {id: 5, name: 'Jayant', Role:'jayant@gmail.com'},

  ];


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

  community_ID:number = 0;

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


    // console.log(this.registerChannel.value.namech,this.community_ID);

    this.registerChannel.reset();
  }


  data = [
    { id: 1, name: 'Yash',email:'06yashsharma@gmail.com'},
    { id: 2, name: 'Safal',email:'safal@gmail.com'},
    { id: 3, name: 'Jayant',email:'jayant@gmail.com'},
    { id: 4, name: 'Ranu',email:'ranu@gmail.com'},
    { id: 5, name: 'Jasmin',email:'jasmin@gmail.com'},

  ];

  merge_data(){
    const work = this.data
    .map(data => ({ id: data.id, name:data.name, role: '', email:data.email}));
    this.users = work;
  }

  applyFilter(data: any) {
    const foundUser = this.data.find(user => user.email === data.target.value);

    if (foundUser) {
      this.search = [
        { id: foundUser.id, name: foundUser.name, role: '', email: foundUser.email }
      ];
      this.users = this.search
    } else {
      // this.search = []; // Set to an empty array if no matching user is found
      this.merge_data();
    }
  }


  users: { id: number; name: string; role: string, email:string }[] = [];
  search: { id: number; name: string; role: string, email:string }[] = [];


  channel_Id:any= 1;
  handleButtonClick() {
    const selectedRoles = this.users
      .filter(user => user.role !== '')
      .map(user => ({ id: user.id, role: user.role, channel_ID: this.channel_Id, }));

    console.log('Selected Roles:', selectedRoles);

  }

  textdisplay:boolean = false;

  status: boolean = true;
  someMethod(data:any){
    this.status = false;
    this.textdisplay = true;
    console.log(data);
    // if()
  }



}
