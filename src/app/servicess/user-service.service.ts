import { HttpClient } from '@angular/common/http';
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
    return this.http.post('http://127.0.0.1:8000/api/addchannel/'+data.id,data);
  }

  showDashboard_Data(){
    return this.http.get('http://127.0.0.1:8000/api/community/');

  }


  show_SelectedCommunity_Data(id:number){
    return this.http.get('http://127.0.0.1:8000/api/community/'+id);

  }

  get_FrstCommunity_Created_Member(){
    return this.http.get('http://127.0.0.1:8000/api/user/community_member/');
  }


  send_multiple_Email(data:any[]){
    return this.http.post('http://127.0.0.1:8000/api/user/notification',data);

    console.log(data);
  }








  //--------------Inside APP Using Servicess----------------

  ch_subject = new Subject<any>();
  // add_channleSubject = new Subject<any>();
}
