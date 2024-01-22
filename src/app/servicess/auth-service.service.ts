import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }


  registration_Post_API(data:any){
    console.log(data);
    return this.http.post('http://127.0.0.1:8000/api/register/',data)
  }

  login_Post_API(data:any){
    console.log(data);
    return this.http.post('http://127.0.0.1:8000/api/login/',data)
  }
}
