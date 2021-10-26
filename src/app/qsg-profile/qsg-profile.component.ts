import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Title } from "@angular/platform-browser";
declare var $: any;

@Component({
  selector: 'app-qsg-profile',
  templateUrl: './qsg-profile.component.html',
  styleUrls: ['./qsg-profile.component.css']
})
export class QsgProfileComponent implements OnInit {
  tabActive:any;
  public href: string = "";
  @Input() name: any;
  disabled = false;
  ShowFilter = true;
  data: any = [];
  serverErrors = [];
  userdetails: any;
  cirprofile: any = [];
  BasicProfileForm: any;
  getuserinstdetails: any;
  files: File[] = [];
  myForm:any;
  today = new Date();
  loggeduser_id: any;
  email:any;
  gender_pronoun_field: boolean = false;
  basicfprofile_submitted = false;
  genderlist: any = [];
  genderlist_new: any = [];
  statelist: any;
  getuseractivity: any
  fieldsetDisabled = false;
  save_btn_profile:boolean =true;
  showsubnav:boolean = false;


  showError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: ''
    })
  }

  showActionError() {
    Swal.fire({
      icon: 'warning',
      title: 'Only one action at a time',
      text: 'Please save your work or cancel to continue',
      footer: ''
    })
  }
  checkDobProfileInitial(control: FormControl) {
    let dob_value = control.value;
    var todayDate = new Date();
    var my_dob_value = new Date(dob_value);
    var DobProfileInitialError = {
      dobProfileError: {
        enteredName: dob_value
      }
    }
    if (dob_value == null || dob_value == "" || dob_value == undefined) {
      return null;
    }
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!(date_regex.test(dob_value))) {
      return DobProfileInitialError;
    }
    else if ((dob_value.length == 10) && todayDate < my_dob_value ) {
      return DobProfileInitialError;
    }
    else {
      return null;
    }

  }
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dataService: DataService,
    private router: Router,
    private titleService: Title,
    private spinner: SpinnerVisibilityService

  ) {
    this.titleService.setTitle("lawforall | Complete profile");

  }
  show_popup() {
    Swal.fire({
      icon: 'success',
      title: 'Thank you',
      text: 'Your work has been saved!',
      showConfirmButton: false,
      timer: 1500
    })
  }
  ngOnInit(): void {
    this.spinner.show();
    this.spinner.hide();
    if (localStorage.getItem("email") != null) {
      this.email = localStorage.getItem("email");
      this.loggeduser_id = localStorage.getItem("user_id");

    } else {
      this.router.navigate(['/sign-in'])
    }
    this.BasicProfileForm = this.formBuilder.group({
      phone: ['',Validators.required],
      // phone: ['',[Validators.required, Validators.pattern("^([()\- x+]*\d[()\- x+]*){7,16}$")]],
      user_id: ['', Validators.required],
      home_phone: ['', Validators.pattern("^((\\+1-?)|0)?[0-9]{10}$")],
      country: ['', Validators.required],
      city: [''],
      state: ['', Validators.required],
      zip_code: ['', Validators.pattern("^((\\+1-?)|0)?[0-9]{5}$")],
      address: [''],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', this.checkDobProfileInitial],
      gender: [''],
      gender_pronoun: [''],
    });
    //function call
    this.getstates();
    this.checkuseractivity();
    this.get_user_basic_info();
    //gender list
    this.genderlist_new = [
      { id: 1, name: 'Female' },
      { id: 2, name: 'Male' },
      { id: 3, name: 'Decline to Answer' },
      { id: 4, name: 'Other' },

    ];
    this.genderlist = [
      { id: 1, name: 'Female' },
      { id: 2, name: 'Male' },
      { id: 3, name: 'Other' },
      { id: 4, name: 'Prefer not to say' },

    ];
    if(this.router.url == '/dashboard')
    {
      this.showsubnav = true;
    }
    //dob data
    $(document).ready(function () {
      let $jqDate = $('.dob_slashes');
      $jqDate.bind('keyup', function (this: any, ev: any) {
        if (ev.which !== 8) {
          let input = $(this).val();
          let out = input.replace(/\D/g, '');
          let len = out.length;

          if (len > 1 && len < 4) {
            out = out.substring(0, 2) + '/' + out.substring(2, 3);
          } else if (len >= 4) {
            out = out.substring(0, 2) + '/' + out.substring(2, 4) + '/' + out.substring(4, len);
            out = out.substring(0, 10)
          }
          $(this).val(out)
        }
      });
      let $jqDate_month = $('.month_dob_slashes');
      $jqDate_month.bind('keyup', function (this: any, ev: any) {
        if (ev.which !== 6) {
          let input = $(this).val();
          let out = input.replace(/\D/g, '');
          let len = out.length;
           if (len >= 4) {
            out = out.substring(0, 2) +  '/' + out.substring(2, len);
            out = out.substring(0, 7)
          }
          $(this).val(out)
        }
      });
      
    })
  }
  //ngint end
  get phone() { return this.BasicProfileForm.get('phone'); }
  get user_id() { return this.BasicProfileForm.get('user_id'); }
  get registerFormControl() {
    return this.BasicProfileForm.controls;
  }
  //user basic info
    get_user_basic_info() {
    this.userdetails = [];
    
    this.dataService.getuserdetails(this.email).subscribe((data: {}) => {
      this.userdetails = data;
      this.BasicProfileForm.get("phone").setValue(this.userdetails.result.phone);
      this.BasicProfileForm.get("user_id").setValue(this.userdetails.result.user_id);
      this.BasicProfileForm.get("name").setValue(this.userdetails.result.name);
      this.BasicProfileForm.get("lastname").setValue(this.userdetails.result.lastname);
      this.BasicProfileForm.get("email").setValue(this.userdetails.result.email);
      this.BasicProfileForm.get("home_phone").setValue(this.userdetails.result.home_phone);
      this.BasicProfileForm.get("country").setValue(this.userdetails.result.country);
      this.BasicProfileForm.get("state").setValue(this.userdetails.result.state);
      this.BasicProfileForm.get("city").setValue(this.userdetails.result.city);
      this.BasicProfileForm.get("zip_code").setValue(this.userdetails.result.zip_code);
      this.BasicProfileForm.get("address").setValue(this.userdetails.result.address);
      this.BasicProfileForm.get("dob").setValue(this.userdetails.result.dob);
      console.log('chekcgender',this.userdetails.result.gender);
      if(this.userdetails.result.gender==null)
      {
        this.BasicProfileForm.get("gender").setValue('');
      }
      else
      {
        this.BasicProfileForm.get("gender").setValue(this.userdetails.result.gender);
      }
      

      if (this.userdetails.result.gender === 'Male' || this.userdetails.result.gender === 'Female' || this.userdetails.result.gender === null) {
        this.gender_pronoun_field = false;
      } else {
        this.BasicProfileForm.get("gender_pronoun").setValue(this.userdetails.result.gender_pronoun);
        this.gender_pronoun_field = true;
      }

      $('.profilename').html(this.userdetails.result.name);
      $('.profileemail').html(this.userdetails.result.email);
      $('.profilephones').html(this.userdetails.result.phone);
      $('.profilehomephone').html(this.userdetails.result.home_phone);
      $('.profiledob').html(this.userdetails.result.dob);
      $('.profilelastname').html(this.userdetails.result.lastname);
      $('.profilecount').html(this.userdetails.result.country);
      $('.profilestate').html(this.userdetails.result.state);
      $('.profileadd').html(this.userdetails.result.address);
      $('.profilegender').html(this.userdetails.result.gender);
      $('.profilepronoun').html(this.userdetails.result.gender_pronoun);
    });
  }
  updatephone()
  {
    $("#my_change_username").show();
    $('#new_emailid').hide();
    $('#new_phone').show();
    $('.update_text').html('phone');
    $('.update_username').val('phone');
    var phonenumber = $('.phonenumber').val();
    var phonenum = localStorage.getItem('phone');
    $('#new_phone').val(phonenumber)
  }
  closepoupmodel()
  {
    $("#my_change_username").hide();
  }
  updateemailid()
  {
    $("#my_change_username").show();
     $('#new_emailid').show();
    $('#new_phone').hide();
    $('.update_text').html('email');
      $('.update_username').val('email');
    var oldemail = $('.oldemail').val();
    $('#new_emailid').val(oldemail)
  }
  update_username(e:any)
  {
    console.log('myph',e.target.value);
    if(e.target.value == "email")
    {
      var email=  $('#new_emailid').val();
       this.BasicProfileForm.get("email").setValue(email);
       $("#my_change_username").hide();
    }else{
      var phonenumber=  $('#new_phone').val();
      var phoneformat = ('' + phonenumber).replace(/\D/g, '');
      if(phonenumber.length < 14)
      {
        $('.errormsgphone').show();
      }else{
        this.BasicProfileForm.get("phone").setValue(phoneformat);
        localStorage.setItem('phone',phoneformat);
       $("#my_change_username").hide();
       $('.errormsgphone').show();
      }
       
    }

  }
  getstates() {
    this.statelist = [];
    this.dataService.get_state_list().subscribe((data: {}) => {
      this.statelist = data;
    });
  }
  //gender
  get_gender_value(event: any) {
    var gender = event.target.value;
    if (gender == "Other" || gender == "Prefer not to say" || gender == "Decline to Answer") {
      this.gender_pronoun_field = true;
    } else {
      this.gender_pronoun_field = false;
      this.BasicProfileForm.get("gender_pronoun").setValue('');
    }
  }
  onChangetab(data:any)
  {
    this.tabActive=data
   $(".myactive").removeClass("active")
 }
 // update basic profile
updateprofile() {
  
    this.basicfprofile_submitted = true;
 
    if (this.BasicProfileForm.valid) {
      this.dataService.updatebasicprofile(this.BasicProfileForm).subscribe(
        (response) => {
          this.fieldsetDisabled=true;
          this.save_btn_profile=false
          $('.dob_error_msg').hide();
          this.show_popup();
          this.get_user_basic_info();
          this.router.navigate(['/qsg-profilesummary-details']);
          if(sessionStorage.getItem('profile_edit_summary') != null)
          {
            this.save_btn_profile=true;
            this.fieldsetDisabled=false;
               $('.import_profile').hide();
              $('.import_summaryprofile').show();
              sessionStorage.removeItem('profile_edit_summary');
              
          }
          if(sessionStorage.getItem('backto') != null)
          {

            this.router.navigate(['/qsg-profilesummary']);
            sessionStorage.removeItem('backto');
          }
        }
        , (error) => {
          this.serverErrors = error.error;
          // this.showError()
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Phone or Email already exists',
            footer: ''
          })
        });
    }
  }
checkuseractivity() {
  var data = { 'page': 'updateprofile', 'user_id': this.loggeduser_id };
  this.dataService.check_user_activity(data).subscribe(
    (response) => {
      this.getuseractivity = response.data;
    });
}
unloadapi()
{
  this.router.navigate(['/qsg-legal-details'])
}

NextTab()
{
  //$('#next').hide();
  if(this.router.url === '/dashboard')
  {
  var next = $('a.nav-link.dash.active').parent().next('li').find('a');
  var current = $('a.nav-link.dash.active');
  current.removeClass('active');
  next.addClass('active');
  $(current.attr('href')).removeClass('show active');
  $(next.attr('href')).addClass('show active');
  this.router.navigate(['/qsg-profilesummary-details']);
  }
  else{
    this.router.navigate(['/qsg-legal-details']);
  }
}

 toggle_save_edit(data:any)
  {
    if (data.target.value == "profile_edit") {
      this.save_btn_profile=true;
      this.fieldsetDisabled=false;
     
    }
  }
  show_button_success()
   {
    $(".sucessbtndummary").hide();
   }
}
