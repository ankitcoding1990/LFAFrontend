import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonAuthService } from '../auth/common-auth.service';
import { Validators ,FormBuilder} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../services/data.service';
import { LoginService } from '../services/login.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Location } from "@angular/common";
declare var $: any;
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  get_other_legal_details: any = [];
  user: any = [];
  statelist: any;
  signup_request: any;
  feedback_response: any;
  userLoggedIn: any = [];
  signupsForm: any;
  feedbackForm: any;
  loggeduser_id: any;
  displaymenu = false;
  emailerror = false;
  phoneerror = false;
  displayerror = false;
  singup_submitted = true;
  feedback_submitted = true;
  signupForm = true;
  visible = false;
  routes: any;
  nav_menu:boolean=false;
  show: boolean = false;
  queryForm: any;
  menuitem:boolean=true;
    qsg: any;
    menuitemdasboard:boolean=true;
    serverErrors = [];
  @Output() open = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  toggle() {
    this.visible = !this.visible;
    if (this.visible) {
      this.open.emit(null);
    } else {
      this.close.emit(null);
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private auth: CommonAuthService,
    private router: Router,
    public LoginService: LoginService,
    private dataService: DataService,
    location: Location,
    private spinner: SpinnerVisibilityService
  ) {
    this.LoginService.isLoggedIn.subscribe((data: any) => {
      if (data.status === "1") {
        this.userLoggedIn = true;
        this.visible = true;
        this.displaymenu = true;
      }
    });
    router.events.subscribe(val => {
      if (location.path() != "") {
        this.routes = location.path();
    
      if(this.routes == "/dashboard" || this.routes == "/vault-storage")
      {
        this.nav_menu=true;
        this.menuitem=false;
           this.menuitemdasboard=true;
        
      }else if(this.routes == "/update-case-detail")
      {
          if(sessionStorage.getItem('case') != null)
          {
            this.nav_menu=true;
            this.menuitemdasboard=true;
          }
      }else if(this.routes == "/self-help-guide")
      {
          if(sessionStorage.getItem('self_help_dashboard') != null)
          {
            this.nav_menu=true;
            this.menuitemdasboard=true;
          }
      }else if(this.routes == "/review-legal-resources")
      {
          if(sessionStorage.getItem('review_dashboard') != null)
          {
            this.nav_menu=true;
            this.menuitemdasboard=true;
          }
      }else if(this.routes == "/guide/child-support" || this.routes == "/guide/divorce" || this.routes == "/guide/minor-guardianship")
      {
          if(sessionStorage.getItem('self_guide_dashboard') != null)
          {
            this.nav_menu=true;
            this.menuitemdasboard=true;
          }
      }else if(this.routes == "/services")
      {
        this.nav_menu=true;
        this.menuitemdasboard=true;
      }else if(this.routes == "/faq" )
      {
        this.nav_menu=true;
        this.menuitemdasboard=true;
      }
       else if(this.routes == "/profile-funnel")
      {
        this.menuitemdasboard=false;

      }
      else{
            this.nav_menu=false;
            this.menuitem=true
            this.menuitemdasboard=true;
      }
      } else {
        this.routes = "Home";
        this.nav_menu=false;
        
      }
    });
  }

  ngOnInit(): void {
    {
      this.spinner.show();
    this.spinner.hide();

      if(sessionStorage.getItem("remember_token") == null)
      {
        //localStorage.clear();
        //this.router.navigate(['/sign-in'])
      }
      if (localStorage.getItem("privacy") != null) {
        this.router.navigate(['/privacy-policy'])
      }
      if (localStorage.getItem("terms") != null) {
        this.router.navigate(['/terms-of-service'])
      }
      this.signupsForm = this.formBuilder.group({
        legal_id: ['',null],
        other_legal_id: [null],
        firstname: ['', Validators.required],
        terms: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        phone: ['', [Validators.required, Validators.pattern("^((\\+1-?)|0)?[0-9]{10}$")]],
        state: ['', Validators.required],
        signup_time: [null],
        signup_date: [null],
        closemodel: [null],
      });

      this.feedbackForm = this.formBuilder.group({
        feedback: [null, Validators.required],
        closemodel: [null],
      })
      
      var remember_token = localStorage.getItem("remember_token") || sessionStorage.getItem("remember_token");

      if (localStorage.getItem("token") != null && remember_token != null) {

        this.userLoggedIn = true;
        this.visible = true;
        this.displaymenu = true;
        this.loggeduser_id = localStorage.getItem("user_id");

      }
      this.queryForm = this.formBuilder.group({
      date: [''],
      phone: [''],
      user_id: [this.loggeduser_id, Validators.required],
      not_ready: [1],
    });
      this.getuser();
      this.getstates();
      this.getotherlegalinterests();
      this.signupsForm.get("legal_id").patchValue('');
    }
  }


  getuser() {
    if (localStorage.getItem("name") != null) {
      this.user = localStorage.getItem("name");
    } else {
      //else code
    }
  }
  logout() {
    if (localStorage.getItem("token") != null) {
      var remember_token = localStorage.getItem("remember_token");
      var phone: any = localStorage.getItem("email");
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('phone_already', phone)
      // if (remember_token != null)
      //  localStorage.setItem('phone_already', phone)
      // else
      //  localStorage.removeItem('phone_already')

      this.router.navigate(['/sign-in'])
        .then(() => {

          this.toggle();
          this.displaymenu = false;
          this.LoginService.isLoggedIn.next({ status: '0' });
          Swal.fire({
            icon: 'success',
            title: 'Thank you',
            text: 'Logout Successful!',
            showConfirmButton: false,
            timer: 1500
          })
        });
    }
  }
  go_to_policy() {
    localStorage.setItem('privacy', "privacy-policy");
  }
  go_to_terms() {
    localStorage.setItem('terms', "terms-service");
  }
  getotherlegalinterests() {
    this.get_other_legal_details = [];
    this.dataService.get_othet_instdetail().subscribe((data: {}) => {
      this.get_other_legal_details = data;


    });
  }
  get registerFormControl() {
    return this.signupsForm.controls;
  }

  get feedbackFormControl() {
    return this.feedbackForm.controls;
  }


  getstates() {
    this.statelist = [];
    this.dataService.get_state_list().subscribe((data: {}) => {
      this.statelist = data;

    });
  }
  phone_valiadte() {
    $(document).on('keyup keypress blur', '#signup_phone', function (event: any) {
      if ((event.which < 48 || event.which > 57)) {
        event.preventDefault();

      }
      if ($('#signup_phone').val().length == 14) {
        event.preventDefault();
      }
    })
  }
  hide_validation()
  {
    this.signupsForm.reset();
    this.signupsForm.get('firstname').clearValidators();
    this.signupsForm.get('firstname').updateValueAndValidity();
    this.signupsForm.get('lastname').clearValidators();
    this.signupsForm.get('lastname').updateValueAndValidity();
    this.signupsForm.get('email').clearValidators();
    this.signupsForm.get('email').updateValueAndValidity();
    this.signupsForm.get('phone').clearValidators();
    this.signupsForm.get('phone').updateValueAndValidity();
    this.signupsForm.get('state').clearValidators();
    this.signupsForm.get('state').updateValueAndValidity();
    this.signupsForm.get('terms').clearValidators();
    this.signupsForm.get('terms').updateValueAndValidity();
    this.signupsForm.get('state').patchValue('');
    this.signupsForm.get('legal_id').patchValue('');
  }
  singnup() {
    this.spinner.show();
    this.spinner.hide();

    this.singup_submitted = true;
    this.displayerror = true;
    if (this.signupsForm.valid) {
      this.feedback_response = [];
      this.dataService.save_singup(this.signupsForm).subscribe(
        (response) => {

          this.signup_request = response.data
          if (this.signup_request == 'email exists') {
            this.emailerror = true;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              html: '<b>Email Already Exists!</b> <br> Please use different email to create account.',
            })
          } else {
            if (this.signup_request == 'phone exists') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '<b>Phone Already Exists!</b> <br> Please use different phone to create account.',
              })
              this.phoneerror = true;
              this.emailerror = false;


            } else {
              $(document).ready(function () {
                $('#closebutton').trigger('click');
              });
              this.phoneerror = false;
              this.emailerror = false;

              localStorage.setItem('email', response.data.email);
              localStorage.setItem('name', response.data.name);
              localStorage.setItem('user_id', response.data.user_id);
              localStorage.setItem('phone', response.data.phone);
              localStorage.setItem('phone_number', response.data.phone);
              this.router.navigate(['/email']);
              this.signupsForm.reset();
              this.signupsForm.get("closemodel").setValue(1);


              this.spinner.hide();
              this.displayerror = false;
            }
          }
        });

    }
  }
  get_funnel_checklist()
  {
    this.dataService.get_funnel_checklist(this.loggeduser_id).subscribe(
        (data) => {
          this.qsg = data;
        })
  }
  showsdiv() {
    $(document).ready(function () {
      $('.scheduleanapp').addClass('activebutton');
      $('.imready').removeClass('activebutton');
      $('.notready').removeClass('activebutton');
    });
    this.show = true;
  }
  closediv() {
    $('.imready').removeClass('activebutton');
    $('.scheduleanapp').removeClass('activebutton');
    $('.notready').removeClass('activebutton');
    this.show = false;
  }
savequery() {
    this.dataService.Consult_query_save(this.queryForm).subscribe(
      (response) => {
        this.show=false;
        this.show = false;
        Swal.fire('Congratulations !', 'Your Appointment has been completed!', 'success')
        $("#closebutton_upgrademembership").trigger('click');
        $('.scheduleanapp').removeClass('activebutton');
      }, (error) => {
        this.serverErrors = error.error;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: ''
        })
      })
  }
  hide_schedule_form()
  {
    this.show=false;
    $("#closebutton_upgrademembership").trigger('click');
  }
  submitFeedback() {
    this.spinner.show();
    this.spinner.hide();

    this.feedback_submitted = true;
    this.displayerror = true;


    if (this.feedbackForm.valid) {
      this.displayerror = false;
      this.feedback_response = [];

      if (localStorage.getItem("user_id") != null)
        this.loggeduser_id = localStorage.getItem("user_id");
      else
        this.loggeduser_id = "";

      // if (this.loggeduser_id == "") {
      //  Swal.fire({
      //    icon: 'error',
      //    title: 'Oops...',
      //    html: '<b>Something went wrong.</b> <br> Please login first and try again.',
      //    showConfirmButton: true
      //  })

      // }
      // else {
        var data = {
          feedback: this.feedbackForm.get('feedback').value,
          user_id: this.loggeduser_id
        }
        this.dataService.submit_feedback(data).subscribe(
          (response) => {


            this.feedback_response = response.data
            if (this.feedback_response != 'success') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: '<b>Something went wrong.</b> <br> Please try again later.',
                showConfirmButton: false,
                timer: 3000
              })
            } else {
              $(document).ready(function () {
                $('button#closebutton').trigger('click');
              });
              this.feedbackForm.reset();
              this.feedbackForm.get("closemodel").setValue(1);
              this.spinner.hide();
              Swal.fire({
                icon: 'success',
                title: 'Feedback sent successfully!',
                text: 'Thank you for taking the time to submit feedback.',
                showConfirmButton: true,
              })

            }
          });
      // }

    }
  }
    movetocase()
  {
    sessionStorage.setItem('case','true');
  }
  movetoselfhelp()
  {
    sessionStorage.setItem('self_help_dashboard','true');
  }
  review_dashboard()
  {
    sessionStorage.setItem('review_dashboard','true');
  }
  getpreviousurl()
  {
    sessionStorage.setItem('prev_url',this.routes)
  }
}
