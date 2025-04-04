import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TokenStorageService } from '../../shared/services/token-storage.service';




@Component({
  selector: 'app-login',
  imports: [CommonModule , ReactiveFormsModule , HttpClientModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string='';
  isLoggedIn=false;
  isLoginFailed=false;
  role='';


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ){
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    });
  }

  ngOnInit(): void{
  
  }

  onSubmit(): void{
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe(
        response =>{
          //this.tokenStorage.saveToken(response.accessToken);
          this.role=response.role;
          //const role= response.role;
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          alert('Logged in as '+this.role+'Successfully');
          localStorage.setItem('accessToken',response.accessToken);
          localStorage.setItem('role',response.role);

          if(this.role==='PATIENT'){
            this.router.navigate(['patient/dashboard']);

          }else if(this.role==='DOCTOR'){
            this.router.navigate(['doctor/dashboard']);
          }
          else{
            this.errorMessage='Invalid  user role';
          }
        },
        err=>{
          this.errorMessage= err.error.message ;
          this.isLoginFailed=true;
          alert('Login Failed + '+ this.errorMessage);
        }
      );
    }
  }

}
