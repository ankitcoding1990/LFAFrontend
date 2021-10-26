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
  selector: 'app-qsg-interests',
  templateUrl: './qsg-interests.component.html',
  styleUrls: ['./qsg-interests.component.css']
})
export class QsgInterestsComponent implements OnInit {
 tabActive:any;
  order: string = 'name';
  public href: string = "";
  @Input() name: any;
  statelist: any;
  interestslist: any;
  img_status: any;
  dropdownSettings = {};
  profile_percentage: any;
  isDisable_future=false;
  show_notes_field = false;
  sub_legal_area_div = true;
  legalhidesaveprenext = true;
  familyhidesaveprenext = true;
  petshidesaveprenext = true;
  interesthidesaveprenext = true;
  otherlegalprevnexr = true;
  basicfprofile_submitted = false;
  legalissueForm_submitted = false;
  interest_submitted = false;
  show_date_error: boolean = false;
  updatefamilyForm_submitted = false;
  editpetForm_submitted = false;
  selectedFile = null;
  disabled = false;
  ShowFilter = true;
  limitSelection = true;
  legalresources: Array<any> = [];
  sublegalresources: Array<any> = [];
  genderlist: any = [];
  genderlist_new: any = [];
  legalInterest: any = [];
  dropdownList: any = [];
  mySettings: Array<any> = [];
  selectedlegalresources: Array<any> = [];
  selected_sub_legalresources: Array<any> = [];
  selectedlegalInterest: Array<any> = [];

  selectedlegalInterests: Array<any> = [];
  // dropdownSettings: IDropdownSettings = {};
  editpetnotesForm: any
  filedata: any
  qsg: any
  petnotes_details: any
  getuseractivity: any
  AddnewInterestForm: any
  imageSrc: any
  selectedpdf: any = [];
  pet_list: any = [];
  fam_list: any = [];
  pdfForm: any;
  single_pet: any;
  email: any;
  array: any;
  gender_pronoun_field: boolean = false;
  add_family_dob_field: boolean = true;
  edit_family_dob_field: boolean = true;
  add_pet_dob_field: boolean = true;
  edit_pet_dob_field: boolean = true;
  age_message: boolean = false;
  sub_legal_area_inputfield: boolean = false;
  show_notes_button: boolean = true;
  prevnetbutton: boolean = true;
  buttonaddfmaily: boolean = true;
  savebutton_legal: boolean = true;
  savebutton_pets: boolean = true;
  savebutton_family: boolean = true;
  savebutton_otherlegal: boolean = true;
  age_input: boolean = false;
  show_hide_int_form: boolean = false;
  show_hide_interests_list: boolean = false;
  show_hide_interests_lists: boolean = false;
  showincome: boolean = false;
  update_pic: boolean = false;
  showfamilyaddform: boolean = false;
  showpetaddform: boolean = false;
  showfirstpetform: boolean = false;
  show_hide_int_button: boolean = false;
  interest_form_text: any = "Add Interest";
  showadd_interestform: boolean = false;
  showlegaladdform: boolean = false;
  show_other_legaladdform: boolean = false;
  showfirstfamilyform: boolean = false;
  showothrinterest: boolean = false;
  showothrlegalinterest: boolean = false;
  continuenext: boolean = false;
  showpdfview: boolean = false;
  shownext: boolean = false;
  editfamilyform: boolean = false;
  editpetsform: boolean = false;
  otherrelationfield: boolean = false;
  removeotherbutton: boolean = false;
  removeotherlegalbutton: boolean = false;
  showfirst_legal_form: boolean = false;
  showfirst_othetlegal_form: boolean = false;
  showlegaltable: boolean = true;
  showotherlegaltable: boolean = true;
  single_legaldetails: any;
  single_other_legaldetails: any;
  editsingle_legal_form: boolean = false;
  sub_legal_area: boolean = false;
  editsingle_other_legal_form: boolean = false;
  check_dob: boolean = false;
  estimate_msg_hide: boolean = false;
  age_msg_indiate: boolean = false;
  past_work_submitted: boolean = false;
  future_goal_submitted: boolean = false;
  loggeduser_id: any;
  legal_type_id: any;
  incomedetails: any;
  userlegaldetails: any;
  getuserpetsdetails: any;
  userprofessionaldetails: any;
  userotherlegaldetails: any;
  editpetForm: any;
  data: any = [];
  serverErrors = [];
  userdetails: any;
  cirprofile: any = [];
  BasicProfileForm: any;
  getuserinstdetails: any;
  incomeForm: any;
  profesionForm: any;
  legalissueForm: any;
  interestForm: any;
  otherLegalForm: any;
  legalinterestForm: any;
  getuserfamilydetails: any;
  updatefamilyForm: any;
  familyForm: any;
  familymemberdetails: any;
  notes_details: any = [];
  addressForm: any;
  editpetformdetails: any;
  get_user_legaldetails: any;
  get_other_legal_details: any;
  get_other_legal_nullparent_id: any;
  get_sub_interests: any;
  other_legal_details: any;
  legal_area: any[] = [];
  //past work
  date_error_message:boolean=false;
  cueent_past_title:boolean=true;
  pastworkform: any
  future_goalform: any;
  future_date_error_message:boolean=false;
  past_work: any;
  past_work_sort:any;
  future_goal: any;
  past_work_other: boolean = false;
  future_work_other: boolean = false;
  professionlist: any = [];
  files: File[] = [];
  myForm:any;
  today = new Date();
  basicprofile_verifybtn:boolean=true;
  basicprofile_verifybtns:boolean=false;
  legalprofile_verifybtn:boolean=true;
  legalprofile_verifybtns:boolean=false;
  familyprofile_verifybtn:boolean=true;
  familyprofile_verifybtns:boolean=false;
  current_verifybtn:boolean=true;
  current_verifybtns:boolean=false;
  future_verifybtn:boolean=true;
  future_verifybtns:boolean=false;
  pets_verifybtn:boolean=true;
  pets_verifybtns:boolean=false;
  interest_verifybtn:boolean=true;
  interest_verifybtns:boolean=false;
  other_verifybtn:boolean=true;
  other_verifybtns:boolean=false;
  profilesummary_percentage:any;
  cueent_past_present:boolean=true;
  profile_isChecked = false;
  legal_isChecked = false;
  family_isChecked = false;
  current_isChecked = false;
  future_isChecked = false;
  pet_isChecked = false;
  interest_isChecked = false;
  other_isChecked = false;
  currently_isChecked=false;
  save_btn_profile:boolean =true;
  save_btn_legal:boolean =true;
  save_btn_family:boolean =true;
  save_btn_work:boolean =true;
  save_btn_pet:boolean =true;
  save_btn_interest:boolean =true;
  save_btn_othetlegal:boolean =true;
  fieldsetDisabled = false;
  disable_btn_legal = true;
  disable_btn_family = true;
  disable_btn_work = false;
  disable_btn_pet = true;
  disable_btn_interest = true;
  disable_btn_otherlegal = true;
  calender_ntes_section=false;
  showsubnav:boolean = false;
  public newinterests: any[] = [{
    id: 1,
    name: '',
    describe: '',
    // user_id:'',
  }];
 

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
  checkWorkMonth=(control: FormControl)=>
  {
    
    let dob_value = control.value;
    var DobProfileInitialError_Month = {
      dobProfileError_month: {
        enteredName: dob_value
      }
    }
    var todayDate = new Date();
    var todayDay = new Date().getDate();
    var maindate=dob_value.split('/');
    var NewDatevalue=maindate[1]+'-'+maindate[0]+'-'+ todayDay;
    var checkDate = new Date(NewDatevalue);
    var date_regex = /^(0?[1-9]|1[012])\/(19|20)\d{2}$/;
    if (!(date_regex.test(dob_value))) {
      
      return DobProfileInitialError_Month;
    }
    else if ((dob_value.length != 7)) {
      
      return DobProfileInitialError_Month;
    }
    else if (todayDate <= checkDate) {
      
      return DobProfileInitialError_Month;
    }
    else {
      
      return null;
    }
    

  }

  checkWorkMonth_future=(control: FormControl)=>
  {
    
    let dob_value = control.value;
    var DobProfileInitialError_Future = {
      dobProfileError_future: {
        enteredName: dob_value
      }
    }
    var todayDate = new Date();
    var todayDay = new Date().getDate();
    var maindate=dob_value.split('/');
    var NewDatevalue=maindate[1]+'-'+maindate[0]+'-'+ todayDay;
    var checkDate = new Date(NewDatevalue);
    var date_regex = /^(0?[1-9]|1[012])\/(19|20)\d{2}$/;
    if (!(date_regex.test(dob_value))) {
      this.isDisable_future=true;
      this.future_date_error_message=true;
      return DobProfileInitialError_Future;
    }
    else if ((dob_value.length != 7)) {
      this.isDisable_future=true;
      this.future_date_error_message=true;
      return DobProfileInitialError_Future;
    }
    else if (todayDate >= checkDate) {
      this.isDisable_future=true;
      this.future_date_error_message=true;
      return DobProfileInitialError_Future;
    }
    else {
      this.isDisable_future=false;
      this.future_date_error_message=false;
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
    this.titleService.setTitle("lawforall | Complete Profile");

  }
  ngOnInit() {
    if(this.router.url == '/dashboard')
    {
      this.showsubnav = true;
    }
    this.spinner.show();
    this.spinner.hide();
    if (localStorage.getItem("email") != null) {
      this.email = localStorage.getItem("email");
      this.loggeduser_id = localStorage.getItem("user_id");

    } else {
      this.router.navigate(['/sign-in'])
    }
    
    this.get_interests();
    this.check_userprofile_status();
    this.checkuseractivity();
    // this.get_user_basic_info();
    this.get_Selected_interest();

    
    this.interestForm = this.formBuilder.group({
      interest: ['', Validators.required],
      other: [''],
      user_id: ['', Validators.required],
    });
  

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

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

  get interest() { return this.interestForm.get('interest'); }
  get interestFormControl() {
    return this.interestForm.controls;
  }
 
  showothrinterests() {
    this.showothrinterest = true;
    this.removeotherbutton = true;
  }
  removeothrinterests() {
    this.interestForm.get("other").setValue('');
    this.showothrinterest = false;
    this.removeotherbutton = false;
  }

  get_user_basic_info() {
    this.userdetails = [];
    this.dataService.getuserdetails(this.email).subscribe((data: {}) => {
      this.userdetails = data;
     
    });
  }
 


  get_interests() {

    this.interestslist = [];
    this.dataService.get_interests(this.loggeduser_id).subscribe((data: {}) => {
      this.interestslist = data;
    });
  }

  checkuseractivity() {
    var data = { 'page': 'updateprofile', 'user_id': this.loggeduser_id };
    this.dataService.check_user_activity(data).subscribe(
      (response) => {
        this.getuseractivity = response.data;
      });
  }

  check_userprofile_status() {
    this.profilesummary_percentage = [];
    this.profile_percentage = [];
    this.dataService.check_userprofile_status(this.loggeduser_id).subscribe((data: {}) => {
      this.profile_percentage = data;
      this.profilesummary_percentage = data;

      $(document).ready(function () {
        var value = $('#bar_value').val();
        if (value == "90%") {
          $('#complete_img').show();
          $('#process_img').hide();

        }
        $('.progress_bar').css({ 'width': value });

      });
      if(this.profilesummary_percentage.data.basicprofile == 5)
      {
        this.basicprofile_verifybtn=true;
          this.basicprofile_verifybtns=false;
          this.profile_isChecked = true;
      }else{
        this.basicprofile_verifybtn=false;
        this.basicprofile_verifybtns=true;
      }

      if(this.profilesummary_percentage.data.legal == 5)
      {
        this.legal_isChecked=true;
        this.legalprofile_verifybtn=true;
        this.legalprofile_verifybtns=false;
      }else{
          this.legal_isChecked=false;
        this.legalprofile_verifybtn=false;
        this.legalprofile_verifybtns=true;
      }

      if(this.profilesummary_percentage.data.family == 5)
      {
        this.family_isChecked=true;
        this.familyprofile_verifybtn=true;
        this.familyprofile_verifybtns=false;
      }else{
        this.family_isChecked=false;
        this.familyprofile_verifybtn=false;
        this.familyprofile_verifybtns=true;
      }

      if(this.profilesummary_percentage.data.workexperience == 5)
      {
        this.current_isChecked=true;
        this.current_verifybtn=true;
        this.current_verifybtns=false;
      }else{
        this.current_isChecked=false;
        this.current_verifybtn=false;
        this.current_verifybtns=true;
      }

      if(this.profilesummary_percentage.data.future == 5)
      {
        this.future_isChecked=true;
        this.future_verifybtn=true;
        this.future_verifybtns=false;
      }else{
        this.future_isChecked=false;
        this.future_verifybtn=false;
        this.future_verifybtns=true;
      }

      if(this.profilesummary_percentage.data.pet == 2)
      {
        this.pet_isChecked=true;
        this.pets_verifybtn=true;
        this.pets_verifybtns=false;
      }else{
        this.pet_isChecked=false;
        this.pets_verifybtns=true;
        this.pets_verifybtn=false;
      }

      if(this.profilesummary_percentage.data.interest == 3)
      {
        this.interest_isChecked=true;
        this.interest_verifybtn=true;
        this.interest_verifybtns=false;
      }else{
        this.interest_isChecked=false;
        this.interest_verifybtns=true;
        this.interest_verifybtn=false;
      }

      if(this.profilesummary_percentage.data.other == 5)
      {
        this.other_isChecked=true;
        this.other_verifybtn=true;
        this.other_verifybtns=false;
      }else{
          this.other_isChecked=false;
        this.other_verifybtns=true;
        this.other_verifybtn=false;
      }

    });
  }
  show_notes_textarea() {
    this.show_notes_button = false;
    this.show_notes_field = true;
    this.editpetForm.get("notes").setValue('');
  }
  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
    const file = event.target.files[0];
    this.pdfForm.patchValue({
      file: file
    });
    this.pdfForm.get('file').updateValueAndValidity();
  }
  /* Upload button functioanlity */
  savepdfform() {
    this.spinner.show();

    this.dataService.uploadpdffile(this.pdfForm).subscribe(
      (response) => {
        this.spinner.hide();
        this.continuenext = true;
        this.show_popup();
      }, (error) => {
        this.spinner.hide();
        this.serverErrors = error.error;
        this.showError()
      }
    );
  }

 

  remove_all_interest() {
    this.dataService.remove_all_interest(this.loggeduser_id).subscribe((data: {}) => {
      //remove
    });
  }

  Add_new_interest() {
    this.newinterests.push({
      id: this.newinterests.length + 1,
      name: '',
      describe: '',
      // user_id:'',
    });
  }
 
  removenewinterest() {
    this.show_hide_int_form = false;
    this.showadd_interestform = false;
    this.show_hide_int_button = false;
    this.interesthidesaveprenext = true;
  }
  removenewinterests(i: number) {
    this.newinterests.splice(i, 1);
  }
  
 
  savecheckedinterest(id: any) {
    $('.my_class.ng-untouched.ng-pristine.ng-invalid').hide();
    var data = { 'interest_id': id, 'user_id': this.loggeduser_id };
    this.dataService.save_checked_interest(data).subscribe(
      (response) => {
        //code
      })

  }
  saveuserinterest() {
    this.disable_btn_interest=false;
    this.save_btn_interest=false;
    this.get_Selected_interest();
    this.show_hide_interests_lists = false;
    this.interestForm.reset();
    this.show_popup();
    this.get_interests();

  }
  get_Selected_interest() {
    this.getuserinstdetails = [];
    this.dataService.getuserinstdetail(this.loggeduser_id).subscribe((data: {}) => {
      this.getuserinstdetails = data;
      if (!!this.getuserinstdetails.other) {
        this.showothrinterest = true;
        this.removeotherbutton = true;
        this.interestForm.get("other").patchValue(this.getuserinstdetails.other);
      }
      let interstarr: any = this.getuserinstdetails.data;
      if (interstarr != "") {
        this.selectedlegalInterests = interstarr;
      }
      else {
        this.selectedlegalInterests = [];
      }



    });
  }
  save_new_interest(AddnewInterestForm: NgForm) {
    var data = { 'interest': this.newinterests, 'user_id': this.loggeduser_id };

    this.dataService.Add_new_interest(data).subscribe(
      (response) => {
        AddnewInterestForm.reset();
        AddnewInterestForm.resetForm({
          interests: '',
        });
        this.saveuserinterest();
        this.show_hide_int_form = false;
        this.showadd_interestform = false;
        this.show_hide_int_button = false;
        this.interesthidesaveprenext = true;
      });
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
  
  add_interest() {
    this.show_hide_int_form = true;
    this.showadd_interestform = true;
    this.show_hide_int_button = true;
    this.interest_form_text = "Add Interest"
    this.interesthidesaveprenext = false;
    this.newinterests[0].describe = "";

  }
 
  edit_user_interest(id: any, AddnewInterestForm: NgForm) {
    if (this.showadd_interestform) {
      this.showActionError()

    }
    else {
      this.show_hide_int_form = true;
      this.showadd_interestform = true;
      this.show_hide_int_button = true;
      this.interest_form_text = "Edit Interest"
      this.interesthidesaveprenext = false;
      var edit_legal_data = this.selectedlegalInterests.find(item => item.id === id)
      this.newinterests[0].id = id;
      this.newinterests[0].name = edit_legal_data.name;
      this.newinterests[0].describe = edit_legal_data.describe;
    }

  }
  remove_interests_byid(id: any) {
    var interests_data = this.selectedlegalInterests.find(item => item.id === id)
    if (this.showadd_interestform) {
      this.showActionError()
    }
    else {
      Swal.fire({
        title: 'Are you sure?',
        text: "Delete Interest - " + interests_data.name + " ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it'
      }).then((result) => {
        if (result.isConfirmed) {
          // deletefamilymember
          var data = { 'id': id, 'user_id': this.loggeduser_id };
          this.dataService.remove_interests(data).subscribe(
            (response) => {
              this.get_Selected_interest();
              this.get_interests();
              this.interestForm.reset();
              this.show_hide_int_form = false;
              this.showadd_interestform = false;
              this.show_hide_int_button = false;
              Swal.fire(
                'Deleted',
                'Interest deleted successfully!',
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
toggle_save_edit(data:any)
  {

    if (data.target.value == "interest_edit") {
      this.save_btn_interest=true;
      this.disable_btn_interest=true;
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
      this.router.navigate(['/qsg-otherinterests-details']);
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
      this.router.navigate(['/qsg-pets-details']);
    }
  }
}
