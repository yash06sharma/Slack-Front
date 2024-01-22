import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/servicess/auth-service.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {

  constructor(private fb:FormBuilder,private db:AuthServiceService ) { }
  // private fb:FormBuilder, private db:AuthServiceService
RegistrationForm!:FormGroup;
submitted:boolean = false;

  ngOnInit(): void {
    this.registerForm();
  }

  registerForm(){
    this.RegistrationForm = this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['',[Validators.required]],
    });
  }

  get f(){
    return this.RegistrationForm.controls;
  }

addUserRecord(){
  this.submitted = true;
  if(this.RegistrationForm.invalid){
    //  this.submitted = false;
    return;
  }
  this.db.registration_Post_API(this.RegistrationForm.value).subscribe((res)=>{
    console.log(res);
    console.log("Data Submitted");
  })
  this.RegistrationForm.reset();

}


}
