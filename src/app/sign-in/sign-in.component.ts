import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { CommonAuthService } from '../auth/common-auth.service';
import { Validators,FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
import { Title } from "@angular/platform-browser";
import { isNull } from '@angular/compiler/src/output/output_ast';
declare var $: any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: any;
  serverErrors = [];
  loading = false;
  eye_icon: boolean = true;
  phone_already: any = localStorage.getItem("phone_already")
  rememberSelected: boolean = false;
   user_name_error=false;
    password_error=false;

  constructor(
    public LoginService: LoginService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private titleService: Title,
    private auth: CommonAuthService,
    private router: Router,
    private dataService: DataService,
  ) {
    this.titleService.setTitle("lawforall | Signin");
  }
  ngOnInit(): void {
    var remember_token = localStorage.getItem("remember_token") || sessionStorage.getItem("remember_token");
    // if (localStorage.getItem("token") != null && remember_token != null) {
    //   this.router.navigate(['/dashboard']);
    // }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember_me: [''],

    });
    this.loginForm.controls.email.setValue(this.phone_already);
    this.rememberSelected = false
  
    if (this.phone_already != null)
    {
      
      this.dataService.check_login_password(this.phone_already).subscribe((data: {}) => {
        this.loginForm.controls.password.setValue(data);
        })
          this.rememberSelected = true
   }
   

  }

  togglePassword() {
    this.eye_icon = !this.eye_icon
  }
  go_for_username() {
    sessionStorage.setItem('action', 'forgot username');
  }
  go_for_password()
  {
    sessionStorage.setItem('action', 'forgot password');
  }
  get phone() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  show_popup_not_complete() {
    Swal.fire({
      icon: 'warning',
      title: 'WELCOME BACK!',
      html: "It looks like your account setup isn't completed yet. <br> No worries, we saved your spot. Let's finish getting you set up, so you can start exploring!",
    })
  }
  login() {
    this.user_name_error=false;
    this.password_error=false;
    if(this.loginForm.get('email').value=="")
    {
      this.user_name_error=true;
    }
    else if(this.loginForm.get('password').value=="")
    {
      this.password_error=true;
    }
    else
    {
      this.user_name_error=false;
      this.password_error=false;
    this.auth.logIn(this.loginForm).subscribe(
      (response) => {

        localStorage.removeItem('access_token');
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('email', response.email);
        localStorage.setItem('phone', response.phone);
        localStorage.setItem('name', response.name);
        localStorage.setItem('user_id', response.user_id);
        localStorage.setItem('emailverify', response.emailverify);
        localStorage.setItem('phoneverify', response.phoneverify);

        if(response.is_welcome_mail_sent == null)
        {
          localStorage.setItem('welcome-mail', '0');
        }
        else
        {
          localStorage.setItem('welcome-mail','1');
        }
        sessionStorage.setItem('continue_from', response.continue_from);
        if (this.loginForm.get('remember_me').value) {
          localStorage.setItem("remember_token", "yes");
          sessionStorage.removeItem("remember_token");
        } else {
          sessionStorage.setItem("remember_token", "yes");
          localStorage.removeItem("remember_token");
        }

        this.LoginService.isLoggedIn.next({ status: '1' });
        this.sharebetweentab();
        Swal.fire({
          icon: 'success',
          title: 'Thank you',
          text: 'Login Successful!',
          showConfirmButton: false,
          timer: 1500
        })
        //this.router.navigate(['/email']);
        if (response.user_status == 2) {
          this.router.navigate(['/email'])
        }
        if (response.user_status == 0) {
          this.router.navigate(['/welcome-letter'])
          
        }
        if (response.user_status == 1) {
          this.show_popup_not_complete();
          
          this.router.navigate(['/profile-funnel'])
        }
        if (response.user_status == 3) {
          sessionStorage.setItem('movetosummary', 'movetosummary');
          this.router.navigate(['/qsg-profilesummary-details'])
          //this.router.navigate(['/summary-profile'])
        }
         if (response.user_status == 4) {
         
          this.router.navigate(['/summary-profile'])
        }
      },
      (error) => {
        localStorage.removeItem('access_token');
        this.serverErrors = error.error;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: ''
        })
      }
    );
  }

}
sharebetweentab()
{
  var sessionStorage_transfer = function(event:any) {
  if(!event) { event = window.event; } // ie suq
  if(!event.newValue) return;          // do nothing if no value to work with
  if (event.key == 'getSessionStorage') {
    // another tab asked for the sessionStorage -> send it
    localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
    // the other tab should now have it, so we're done with it.
    localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
  } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
    // another tab sent data <- get it
    var data = JSON.parse(event.newValue);
    for (var key in data) {
      sessionStorage.setItem(key, data[key]);
    }
  }
};

}

}
