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





  //--------------Inside APP Using Servicess----------------

  ch_subject = new Subject<any>();
  // ch_subject: BehaviorSubject<any> = new BehaviorSubject<any>();

}
