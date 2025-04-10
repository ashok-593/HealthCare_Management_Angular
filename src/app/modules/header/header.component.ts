import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User, UserService } from '../shared/services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userDetails?: User;
 ;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('access_token');
      this.authService.loggedIn.subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;

        if (loggedIn) {
          const userId = localStorage.getItem('user_id');

          if (userId) {
            const userIdNumber = +userId;

            this.userService.getUserDetails(userIdNumber).subscribe(
              (response: any) => {
                console.log('User details:', response);
                this.userDetails = response;
              },
              (error: any) => {
                console.error('Error fetching user details:', error);
              }
            );
          }
        } else {
          this.userDetails = undefined;
        }
      });

      // const userId = localStorage.getItem('user_id');

      // if (userId) {
      //   const userIdNumber = +userId;

      //   this.userService.getUserDetails(userIdNumber).subscribe(
      //     (response: any) => {
      //       console.log('User details:', response);
      //       this.userDetails = response;
      //     },
      //     (error: any) => {
      //       console.error('Error fetching user details:', error);
      //     }
      //   );
      // }
    }
  }

  logout() {
    const confirmation = confirm('Are you sure you want to Logout ?');
    if (confirmation) {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('access_token');
      }
      this.isLoggedIn = false;
      this.cdr.detectChanges();
      this.router.navigate(['home']);

    }
  }
}
