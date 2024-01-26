import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/servicess/auth-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private fb:FormBuilder,private db:AuthServiceService) { }
  loginForm!:FormGroup;
submitted:boolean = false;

  ngOnInit(): void {
    localStorage.removeItem('Token');
    localStorage.removeItem('Auth');
    localStorage.removeItem('community-data');
    localStorage.removeItem('Channel');

    this.userloginForm();
  }

  userloginForm(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['',[Validators.required]],
    })
  }

  get log(){
    return this.loginForm.controls;
  }


  loginUserRecord(){
    this.submitted = true;
    if(this.loginForm.invalid){
      //  this.submitted = false;
      return;
    }

    this.db.login_Post_API(this.loginForm.value).subscribe((res:any)=>{
      console.log(res);
      const { Token, credentials } = res;

      localStorage.setItem('Token', Token);
      localStorage.setItem('Auth', JSON.stringify(credentials));

      // ---------------get Authentication from local----------------

       console.log(localStorage.getItem('Token'));
       const storedCredentials = JSON.parse(localStorage.getItem('Auth') || '{}');
       console.log(storedCredentials.id);
       console.log(storedCredentials.name);

    })
    this.loginForm.reset();
    // console.log(this.loginForm.value);

  }


}
