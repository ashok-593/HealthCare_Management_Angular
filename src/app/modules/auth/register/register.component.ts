import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  errorMessage: string='';
  isSuccessfull=false;
  isSignUpFailed=false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
    this.registerForm=this.fb.group({
      name: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      phone: ['',[Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      role: ['',Validators.required]
    });
  }

  ngOnInit(): void{}

  onSubmit(): void {
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe(
        data => {
          console.log(data);
          this.isSuccessfull=true;
          this.isSignUpFailed = false;
          alert("successfully registered .... continue with login!!")
          this.router.navigate(['/auth/login']);
        },
        err=>{
          this.errorMessage= err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
  }

}
