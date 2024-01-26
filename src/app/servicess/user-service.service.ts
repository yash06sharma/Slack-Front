import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }


  addCommunityfuntion(data:any){
    return this.http.post('http://127.0.0.1:8000/api/addcommunity/'+data.id,data);
  }

  addCommunity_Channel_funtion(data:any){
    console.log(data);

    return this.http.post('http://127.0.0.1:8000/api/addchannel/'+data.community_ID,data);
  }

  showDashboard_Data(id:number){

    return this.http.get('http://127.0.0.1:8000/api/community/'+id);

  }


  show_SelectedCommunity_Data(data:any){
    return this.http.get(`http://127.0.0.1:8000/api/community/${data.user_id}/${data.comm_id}/`);
  }

    get_FrstCommunity_Created_Member(id:number){
    return this.http.get('http://127.0.0.1:8000/api/user/community_member/'+id);
  }


  send_multiple_Email(data:any[]){
    return this.http.post('http://127.0.0.1:8000/api/user/notification',data);

    console.log(data);
  }

  Add_Member_For_channel(data:any){
    console.log("channel for data",data);
    return this.http.post('http://127.0.0.1:8000/api/user/channel/',data);
  }






  //--------------Inside APP Using Servicess----------------

  ch_subject = new Subject<any>();
  // add_channleSubject = new Subject<any>();
}
