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
  selector: 'app-qsg-family',
  templateUrl: './qsg-family.component.html',
  styleUrls: ['./qsg-family.component.css']
})
export class QsgFamilyComponent implements OnInit {
 tabActive:any;
  userdetails: any;
  email:any;
  loggeduser_id:any;
  getuserfamilydetails: any;
  showfamilyaddform: boolean = false;
  age_msg_indiate: boolean = false;
  editfamilyform: boolean = false;
  updatefamilyForm_submitted = false;
  updatefamilyForm: any;
  familyForm: any;
  familymemberdetails: any;
  notes_details: any = [];
  serverErrors = [];
  buttonaddfmaily: boolean = true;
  familyhidesaveprenext = true;
  gender_pronoun_field: boolean = false;
  age_input: boolean = false;
  add_family_dob_field: boolean = true;
  edit_family_dob_field: boolean = true;
  show_notes_button: boolean = true;
  show_notes_field = false;
  savebutton_family: boolean = true;
  prevnetbutton: boolean = true;
  showfirstfamilyform: boolean = false;
  age_message: boolean = false;
  showsubnav:boolean = false;
  genderlist: any = [];
  genderlist_new: any = [];
    disable_btn_family = true;
    save_btn_family:boolean =true;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dataService: DataService,
    private router: Router,
    private titleService: Title,
    private spinner: SpinnerVisibilityService

  ) {
    this.titleService.setTitle("lawforall | Complete Profile");

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

  //chckdon
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
  //end dob
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
  ngOnInit(): void {
    this.spinner.show();
    this.spinner.hide();
    if(this.router.url == '/dashboard')
    {
      this.showsubnav = true;
    }
    if (localStorage.getItem("email") != null) {
      this.email = localStorage.getItem("email");
      this.loggeduser_id = localStorage.getItem("user_id");

    } else {
      this.router.navigate(['/sign-in'])
    }
   
    this.get_user_basic_info();
    this.getuserfamily();
    this.updatefamilyForm = this.formBuilder.group({
      member_email: [null],
      member_name: ['', Validators.required],
      user_id: ['', Validators.required],
      otherrelation: [null],
      age: ['', this.checkDobProfileInitial],
      relation: [''],
      id: ['', Validators.required],
      lastname: [null],
      phone: [null],
      age_number: [null],
      notes: [null],
      emergency_member: [null],
      gender: [null],
      gender_pronoun: [null],
    });
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
  } //end ng init
  public addresses: any[] = [{
    id: 1,
    name: '',
    lastname: '',
    email: '',
    phone: '',
    relation: '',
    age: '',
    age_number: '',
    user_id: '',
    notes: '',
    otherrelation: '',
    emergency_member: '',
    gender: '',
    gender_pronoun: '',
  }];
  get updatefamilyFormControl() {
    return this.updatefamilyForm.controls;
  }
  get_user_basic_info() {
    this.userdetails = [];
    this.dataService.getuserdetails(this.email).subscribe((data: {}) => {
      this.userdetails = data;
    
    });
  }
  //get family details
  getuserfamily() {
    this.getuserfamilydetails = [];
    this.dataService.getuserfamilydetail(this.loggeduser_id).subscribe((data: {}) => {
      this.getuserfamilydetails = data;

      if (this.getuserfamilydetails.indicator == 1) {
        this.age_msg_indiate = true;
      } else {
        this.age_msg_indiate = false;
      }
    });
  }
  editfamilymember(id: any) {
    if (this.showfamilyaddform || (this.editfamilyform && this.updatefamilyForm.dirty)) {
      this.showActionError()

    } else {
      this.familymemberdetails = [];
      this.notes_details = [];
      this.editfamilyform = true;
      this.buttonaddfmaily = false;
      this.familyhidesaveprenext = false;
      this.get_family_notes(id);


      this.dataService.editfamilymember(id).subscribe(
        (response) => {

          this.familymemberdetails = response.data;
          this.updatefamilyForm.get("id").setValue(this.familymemberdetails.id);
          this.updatefamilyForm.get("user_id").setValue(this.familymemberdetails.user_id);
          this.updatefamilyForm.get("member_name").setValue(this.familymemberdetails.member_name);
          this.updatefamilyForm.get("member_email").setValue(this.familymemberdetails.member_email);
          this.updatefamilyForm.get("age").setValue(this.familymemberdetails.age);
          this.updatefamilyForm.get("relation").patchValue(this.familymemberdetails.relation);
          this.updatefamilyForm.get("otherrelation").setValue(this.familymemberdetails.otherrelation);
          this.updatefamilyForm.get("lastname").setValue(this.familymemberdetails.lastname);
          this.updatefamilyForm.get("phone").setValue(this.familymemberdetails.phone);
          this.updatefamilyForm.get("emergency_member").patchValue(this.familymemberdetails.emergency_member);
          if (this.familymemberdetails.gender == null) {
            this.updatefamilyForm.get("gender").setValue("");
          }
          else {
            this.updatefamilyForm.get("gender").setValue(this.familymemberdetails.gender);
          }


          if (this.familymemberdetails.gender === 'Male' || this.familymemberdetails.gender === 'Female' || this.familymemberdetails.gender === null) {
            this.gender_pronoun_field = false;
          } else {
            this.updatefamilyForm.get("gender_pronoun").setValue(this.familymemberdetails.gender_pronoun);
            this.gender_pronoun_field = true;
          }

          if (this.familymemberdetails.emergency_member != 0) {
            $(".emgency_member_contact").prop("checked", true);
          } else {
            $(".emgency_member_contact").prop("checked", false);
          }
          if (this.familymemberdetails.age_number != 0 && this.familymemberdetails.age_number != null) {

            this.updatefamilyForm.get("age_number").patchValue(this.familymemberdetails.age_number);
            $(".checkSurfaceEnvironment-2").prop("checked", true);
            this.age_input = true;
            this.edit_family_dob_field = false;
            this.updatefamilyForm.get("age").setValue("");

          } else {
            $(".checkSurfaceEnvironment-2").prop("checked", false);
            this.updatefamilyForm.get("age").setValue(this.familymemberdetails.age);
            this.age_input = false;
            this.edit_family_dob_field = true;
            this.updatefamilyForm.get("age_number").patchValue("");
          }

          if (this.familymemberdetails.otherrelation == null || this.familymemberdetails.otherrelation === "") {

            $('.showotherrelationfield').hide();
          } else {

            $('.showotherrelationfield').show();
          }
        });
    }
  }
  updatefamilymember() {
    this.updatefamilyForm_submitted = true;
    if (this.updatefamilyForm.valid) {
      this.dataService.update_family_member_details(this.updatefamilyForm).subscribe(
        (response) => {
          this.updatefamilyForm.reset();
          this.editfamilyform = false;
          this.getuserfamily();
          this.buttonaddfmaily = true;
          this.familyhidesaveprenext = true;
          this.show_notes_button = true;
          this.show_notes_field = false;
          this.show_popup();
        }, (error) => {
          this.serverErrors = error.error;
          this.showError()
        });
    }
  }
  removeAddresss() {
    this.savebutton_family = true;
    this.prevnetbutton = true;
    this.showfamilyaddform = false;
    this.showfirstfamilyform = false;
  }
  removeAddress(i: number) {
    if (i == 0) {
      this.savebutton_family = true;
      this.prevnetbutton = true;
    }
    this.addresses.splice(i, 1);
  }
  get_family_notes(id: any) {
    this.dataService.get_family_notes(id).subscribe((data: any) => {
      this.notes_details = data.data;

    });
  }
  deletefamilymember(id: any) {
    var family_members_data = this.getuserfamilydetails.data.find((item: any) => item.id === id)
    if (this.showfamilyaddform || this.editfamilyform) {
      this.showActionError()
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "Delete Family Member - " + family_members_data.member_name + " " + family_members_data.member_last_name + " ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it'
      }).then((result) => {
        if (result.isConfirmed) {
          // deletefamilymember
          this.dataService.deletefamilymember(id).subscribe(
            (response) => {
              this.getuserfamily();
              Swal.fire(
                'Deleted',
                'Family Member deleted successfully!',
                'success'
              )
            }, (error) => {
              this.serverErrors = error.error;
              this.showError()
            });

        }
      })
    }
  }
  counter(i: number) {
    return new Array(i);
  }
  onChangeage_edit_family(e: any) {
    if (e.target.checked) {

      this.age_input = true;
      this.age_message = true;
      this.edit_family_dob_field = false;
    } else {

      this.updatefamilyForm.get("age").setValue('');
      this.updatefamilyForm.get("age_number").patchValue('');
      this.age_input = false;
      this.age_message = false;
      this.edit_family_dob_field = true;
    }
  }
  //gender
  get_gender_value(event: any) {
    var gender = event.target.value;
    if (gender == "Other" || gender == "Prefer not to say" || gender == "Decline to Answer") {
      this.gender_pronoun_field = true;
    } else {
      this.gender_pronoun_field = false;
      
    }
  }
  show_notes_textarea() {
    this.show_notes_button = false;
    this.show_notes_field = true;
    // this.editpetForm.get("notes").setValue('');
  }
  hidefamilyform() {
    this.show_notes_button = true;
    this.buttonaddfmaily = true;
    this.updatefamilyForm.reset();
    this.editfamilyform = false;
    this.familyhidesaveprenext = true;
  }
  //family details save
  userfamilydetails(addressForm: NgForm) {
    this.dataService.updateuserfamilydetails(this.addresses, this.loggeduser_id).subscribe(
      (response) => {
        addressForm.resetForm();
        this.getuserfamily();
        this.showfamilyaddform = false;
        this.showfirstfamilyform = false;
        this.savebutton_family = true;
        this.prevnetbutton = true;
        this.show_popup();

      }, (error) => {
        this.serverErrors = error.error;
        this.showError()
      });

  }
  showfirstfamily() {
    this.prevnetbutton = false;
    this.savebutton_family = false;
    this.showfirstfamilyform = true;
    this.showfamilyaddform = true;

    this.age_input = false;
    this.add_family_dob_field = true;
    this.gender_pronoun_field = false;
    $('.showotherrelationfield').hide();
  }
  onChangeage(e: any, addressForm: NgForm) {

    if (e.target.checked) {

      this.age_input = true;
      this.age_message = true;
      this.add_family_dob_field = false;
    } else {


      this.age_input = false;
      this.age_message = false;
      this.add_family_dob_field = true;
    }
  }
  onChangetab(data:any)
  {
    this.tabActive=data
    $(".myactive").removeClass("active")
  }
  toggle_save_edit(data:any)
  {
    if (data.target.value == "family_save") {
      this.save_btn_family=false;
      this.disable_btn_family=false;
      this.show_popup();
    }
    if (data.target.value == "family_edit") {
      this.save_btn_family=true;
      this.disable_btn_family=true;
    }
  }

 show_button_success()
   {
    $(".sucessbtndummary").hide();
   }

  NextTab()
  {
    if(this.router.url === '/dashboard')
    {
    var next = $('a.nav-link.dash.active').parent().next('li').find('a');
    var current = $('a.nav-link.dash.active');
    current.removeClass('active');
    next.addClass('active');
    $(current.attr('href')).removeClass('show active');
    $(next.attr('href')).addClass('show active');
    }
    else
    {
      this.router.navigate(['/qsg-incomeprofession-details']);
    }
  }

  PrevTab()
  {
    if(this.router.url === '/dashboard')
    {
    var next = $('a.nav-link.dash.active').parent().prev('li').find('a');
    var current = $('a.nav-link.dash.active');
    current.removeClass('active');
    next.addClass('active');
    $(current.attr('href')).removeClass('show active');
    $(next.attr('href')).addClass('show active');
    }
    else
    {
      this.router.navigate(['/qsg-legal-details']);
    }
  }
}

