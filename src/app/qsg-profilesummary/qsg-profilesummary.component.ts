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
  selector: 'app-qsg-profilesummary',
  templateUrl: './qsg-profilesummary.component.html',
  styleUrls: ['./qsg-profilesummary.component.css']
})
export class QsgProfilesummaryComponent implements OnInit {
profile_page:boolean=false;
  tabActive:any;
  order: string = 'name';
  public href: string = "";
  @Input() name: any;
  statelist: any;
  interestslist: any;
  img_status: any;
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
  editpetnotesForm: any
  filedata: any
  qsg: any
  petnotes_details: any
  getuseractivity: any
  AddnewInterestForm: any
  imageSrc: any
  selectedpdf: any = [];
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
  // incomedetails: any;
  userlegaldetails: any;
  getuserpetsdetails: any;
  // userprofessionaldetails: any;
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
  // myForm:any;
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
  barcount:any;
  showsubnav:boolean = false;
 

  public otheruserlegal: any[] = [{
    id: 1,
    legal_area: '',
    sub_legal_area: '',
    user_id: '',
    other: '',
    describe: ''
  }];


  showError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: ''
    })
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

    this.spinner.show();
     this.spinner.hide();
     //console.log('current url',this.router.url);
    if (localStorage.getItem("email") != null) {
      this.email = localStorage.getItem("email");
      this.loggeduser_id = localStorage.getItem("user_id");

    } else {
      this.router.navigate(['/sign-in'])
    }
    this.check_userprofile_status();
    this.get_other_vertical();
    this.get_user_basic_info();
    this.getpetdetais();
    this.get_qsg();
    this.get_user_legal_details();
    // this.getotherlegalinterests();
    this.get_Selected_interest();
    this.getuserfamily();
    this.get_user_past_work();
    this.get_user_future_goal();
 
    if(this.router.url == '/dashboard')
    {
      this.showsubnav = true;
    }
    
    
  }
  get phone() { return this.BasicProfileForm.get('phone'); }
  get user_id() { return this.BasicProfileForm.get('user_id'); }
  get home_phone() { return this.BasicProfileForm.get('home_phone'); }
  get interest() { return this.interestForm.get('interest'); }
  get legal_areas() { return this.legalinterestForm.get('legal_area'); }
  get legal_type() { return this.pdfForm.get('legal_type'); }

  
  
  get_user_basic_info() {
    this.userdetails = [];
    this.dataService.getuserdetails(this.email).subscribe((data: {}) => {
      this.userdetails = data;
       
    });
  }
  
  
  get_user_past_work() {
    this.past_work = [];
    this.past_work_sort =[];
    this.dataService.get_user_past_work(this.loggeduser_id).subscribe((data: {}) => {
      this.past_work = data;
      this.past_work_sort = data;
    });
  }
  get_user_future_goal() {
    this.future_goal = [];
    this.dataService.get_user_future_goal(this.loggeduser_id).subscribe((data: {}) => {
      this.future_goal = data;

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
  
  getotherlegalinterests() {
    this.get_other_legal_details = [];
    this.dataService.get_othet_instdetail().subscribe((data: {}) => {
      this.get_other_legal_details = data;
      let interstarr: any = this.get_other_legal_details.data;
      this.legalresources = interstarr;

    });
  }
  remove_all_interest() {
    this.dataService.remove_all_interest(this.loggeduser_id).subscribe((data: {}) => {
      //remove
    });
  }
  get_other_vertical() {
    this.userotherlegaldetails = [];
    this.dataService.getuserotherlegaldetails(this.loggeduser_id).subscribe((data: {}) => {
      this.userotherlegaldetails = data;
      if (this.userotherlegaldetails.data === "" || this.userotherlegaldetails.data === null) {
        this.userotherlegaldetails = [];
      }
    });
  }
  
  get_user_legal_details() {
    this.get_user_legaldetails = [];
    this.dataService.get_user_legal_details(this.loggeduser_id).subscribe((data: {}) => {
      this.get_user_legaldetails = data;

    });
  }
 
   getpetdetais() {
    this.getuserpetsdetails = [];
    this.dataService.getuserpetsdetail(this.loggeduser_id).subscribe((data: {}) => {
      this.getuserpetsdetails = data;
      if (this.getuserpetsdetails.indicator == 1) {
        this.estimate_msg_hide = true;
      } else {
        this.estimate_msg_hide = false;
      }
    });
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
  
  user_other_legal_details(user_other_legal_details: NgForm) {

    var data = { 'legal': this.otheruserlegal, 'user_id': this.loggeduser_id };
    this.dataService.update_user_other_legals_details(data).subscribe(
      (response) => {

        user_other_legal_details.reset();
        this.get_other_vertical();
        this.prevnetbutton = true;
        this.savebutton_otherlegal = true;
        this.show_other_legaladdform = false;
        this.showfirst_othetlegal_form = false;
        if (response.data == 0) {
          Swal.fire('Already Exists', 'Your Other Legal Details already exists!', 'warning')

        } else {
          this.show_popup();
        }
      }, (error) => {
        this.serverErrors = error.error;
        this.showError()
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
  
  
  get_pet_notes(id: any) {
    this.dataService.get_pet_notes(id).subscribe((data: any) => {
      this.petnotes_details = data.data;

    });
  }

  get_family_notes(id: any) {
    this.dataService.get_family_notes(id).subscribe((data: any) => {
      this.notes_details = data.data;

    });
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
  
  

  onChangetab(data:any)
  {
   //  this.tabActive=data
   // $(".myactive").removeClass("active")
  
  }
get_qsg() {
    this.qsg = [];
    this.dataService.get_qsg_post(this.loggeduser_id).subscribe((data: {}) => {
      this.qsg = data;
    });
    
  }
  verifiy_user(data:any)
  {
  
    this.barcount=[];
    if (data.target.value == "basicprofile_verify" || data.target.checked == true) {
      this.profile_isChecked = true;
      this.basicprofile_verifybtn=true;
      this.basicprofile_verifybtns=false;
      var datarray = { 'page': 'profile', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
      this.barcount = data;
     
          //this.get_qsg();
      
      })
    }else{
      this.basicprofile_verifybtns=true;
      this.basicprofile_verifybtn=false;
      this.profile_isChecked = false;
      var datarray = { 'page': 'undoprofile', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
      this.barcount = data;
    
       // this.get_qsg();
    
      })
    }
  }
  verifiylegalprofile(data:any)
  {
    this.barcount=[];
    if (data.target.value == "legalprofile_verify" || data.target.checked == true) {
      this.legal_isChecked = true;
      this.legalprofile_verifybtn=true;
      this.legalprofile_verifybtns=false;
      var datarray = { 'page': 'legal', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
    
          //this.get_qsg();
      
      })
    }else{
      this.legalprofile_verifybtns=true;
      this.legalprofile_verifybtn=false;
      this.legal_isChecked = false;
      var datarray = { 'page': 'undolegal', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
     
          //this.get_qsg();
      
      })
    }
  }
  verifiy_userfamily(data:any)
  {
    this.barcount=[];
        if (data.target.value == "family_verify" || data.target.checked == true) {
      this.family_isChecked = true;
      this.familyprofile_verifybtn=true;
      this.familyprofile_verifybtns=false;
      var datarray = { 'page': 'family', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
      
         // this.get_qsg();
      
      })
    }else{
      this.familyprofile_verifybtns=true;
      this.familyprofile_verifybtn=false;
      this.family_isChecked = false;
      var datarray = { 'page': 'undofamily', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
     
          //this.get_qsg();
      
      })
    }
  }
  verifiy_current(data:any)
  {
    this.barcount=[];
    if (data.target.value == "workexp_verify" || data.target.checked == true) {
      this.current_isChecked = true;
      this.current_verifybtn=true;
      this.current_verifybtns=false;
      var datarray = { 'page': 'workexperience', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
    
      //    this.get_qsg();
      
      })
    }else{
      this.current_verifybtns=true;
      this.current_isChecked = false;
      this.current_verifybtn=false;
      var datarray = { 'page': 'undoworkexperience', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
     
         // this.get_qsg();
      
      })
    }
  }
  verifiy_future(data:any)
  {
    this.barcount=[];
if (data.target.value == "future_verify" || data.target.checked == true) {
      this.future_isChecked = true;
      this.future_verifybtn=true;
      this.future_verifybtns=false;
      var datarray = { 'page': 'future', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
     
          //this.get_qsg();
      
      })
    }else{
      this.future_verifybtns=true;
      this.future_verifybtn=false;
      this.future_isChecked = false;
      var datarray = { 'page': 'undofuture', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
    
         // this.get_qsg();
      
      })
    }
  }
  verifiy_pets(data:any)
  {
    this.barcount=[];
    if (data.target.value == "pets_verify" || data.target.checked == true) {
      this.pet_isChecked = true;
      this.pets_verifybtn=true;
      this.pets_verifybtns=false;
      var datarray = { 'page': 'pet', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
     
          this.get_qsg();
      
      })
    }else{
      this.pets_verifybtns=true;
      this.pets_verifybtn=false;
      this.pet_isChecked = false;
      var datarray = { 'page': 'undopet', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
   
          //this.get_qsg();
     
      })
    }
  }
    verifiy_interest(data:any)
  {
    this.barcount=[];
      if (data.target.value == "interest_verify" || data.target.checked == true) {
      this.interest_isChecked = true;
      this.interest_verifybtn=true;
      this.interest_verifybtns=false;
      var datarray = { 'page': 'interest', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
    
//this.get_qsg();
      
      })
    }else{
      this.interest_verifybtns=true;
      this.interest_verifybtn=false;
      this.interest_isChecked = false;
      var datarray = { 'page': 'undointerest', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
     
          // this.get_qsg();
      
      })
    }
  }
  verifiy_other(data:any)
  {
    this.barcount=[];
      if (data.target.value == "other_verify" || data.target.checked == true) {
      this.other_isChecked = true;
      this.other_verifybtn=true;
      this.other_verifybtns=false;
      var datarray = { 'page': 'other', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
     
        //  this.get_qsg();
      
      })
    }else{
      this.other_verifybtns=true;
      this.other_verifybtn=false;
      this.other_isChecked = false;
      var datarray = { 'page': 'undoother', 'user_id': this.loggeduser_id };
      this.dataService.update_userprofile_summary(datarray).subscribe((data: {}) => {
    
          //this.get_qsg();
      
      })
    }
  }
  toggle_save_edit(data:any)
  {
    if (data.target.value == "profile_edit") {
      this.save_btn_profile=true;
      this.fieldsetDisabled=false;
    }
    if (data.target.value == "legal_save") {
      this.save_btn_legal=false;
      this.show_popup();
      this.disable_btn_legal=false;
    }
    if (data.target.value == "legal_edit") {
      this.save_btn_legal=true;
      this.disable_btn_legal=true;
    }
    if (data.target.value == "family_save") {
      this.save_btn_family=false;
      this.disable_btn_family=false;
      this.show_popup();
    }
    if (data.target.value == "family_edit") {
      this.save_btn_family=true;
      this.disable_btn_family=true;
    }
    if (data.target.value == "pet_save") {
      this.save_btn_pet=false;
      this.disable_btn_pet=false;
      this.show_popup();
    }
    if (data.target.value == "pet_edit") {
      this.save_btn_pet=true;
      this.disable_btn_pet=true;
    }
    if (data.target.value == "interest_edit") {
      this.save_btn_interest=true;
      this.disable_btn_interest=true;
    }
    if (data.target.value == "other_save") {
      this.save_btn_othetlegal=false;
    this.disable_btn_otherlegal=false;
      this.show_popup();
    }
    if (data.target.value == "other_edit") {
      this.save_btn_othetlegal=true;
    this.disable_btn_otherlegal=true;
    }
    if (data.target.value == "work_edit") {
      this.save_btn_work=true;
      this.disable_btn_work=false;

      
    }
  }
  show_button_success()
   {
    $(".sucessbtndummary").show();
   }
   backtosummary(e:any)
   {
    if(e.target.value == "profile")
    {
      sessionStorage.setItem('backto','profile');
    }
   }
   edit_profilepage()
   {
    sessionStorage.setItem('profile_edit_summary',"Yes")
    $('.import_profile').show();
    $('.import_summaryprofile').hide();
    this.get_user_basic_info();
   }
   NextTab()
   {
     //$('#next').hide();
     var next = $('a.nav-link.dash.active').parent().next('li').find('a');
     var current = $('a.nav-link.dash.active');
     current.removeClass('active');
     next.addClass('active');
     $(current.attr('href')).removeClass('show active');
     $(next.attr('href')).addClass('show active');
   }

   ProfileEdit(){
    if(this.router.url === '/dashboard')
    {
    var next = $('#v-pills-basic-tab');
     var current = $('#v-pills-summary-tab');
     current.removeClass('active');
     next.addClass('active');
     $(current.attr('href')).removeClass('show active');
     $(next.attr('href')).addClass('show active');
   }
   else
   {
    this.router.navigate(['/complete-profile'])
   }
  }

   LegalEdit(){
    if(this.router.url === '/dashboard')
    {
    var next = $('#v-pills-legal-tab');
    var current = $('#v-pills-summary-tab');
    current.removeClass('active');
    next.addClass('active');
    $(current.attr('href')).removeClass('show active');
    $(next.attr('href')).addClass('show active');
    $('html, body').animate({  scrollTop: 40 }, 'slow');
   }
   else
   {
     this.router.navigate(['/qsg-legal-details']);
   }
  }

   FamilyEdit(){
    if(this.router.url === '/dashboard')
    {
    var next = $('#v-pills-family-tab');
    var current = $('#v-pills-summary-tab');
    current.removeClass('active');
    next.addClass('active');
    $(current.attr('href')).removeClass('show active');
    $(next.attr('href')).addClass('show active');
    $('html, body').animate({  scrollTop: 40 }, 'slow');
    }
    else
    {
      this.router.navigate(['/qsg-family-details']);
    }
   }

   WorkExpFutureEdit(){
    if(this.router.url === '/dashboard')
    {
    var next = $('#v-pills-income-tab');
    var current = $('#v-pills-summary-tab');
    current.removeClass('active');
    next.addClass('active');
    $(current.attr('href')).removeClass('show active');
    $(next.attr('href')).addClass('show active');
    $('html, body').animate({  scrollTop: 40 }, 'slow');
    }
    else
    {
      this.router.navigate(['/qsg-incomeprofession-details']);
    }
   }


   PetsEdit(){
    if(this.router.url === '/dashboard')
    {
    var next = $('#v-pills-pets-tab');
    var current = $('#v-pills-summary-tab');
    current.removeClass('active');
    next.addClass('active');
    $(current.attr('href')).removeClass('show active');
    $(next.attr('href')).addClass('show active');
    $('html, body').animate({  scrollTop: 40 }, 'slow');
    }
    else
    {
      this.router.navigate(['/qsg-pets-details']);
    }
   }

   InterestEdit(){
    if(this.router.url === '/dashboard')
    {
    var next = $('#v-pills-interest-tab');
    var current = $('#v-pills-summary-tab');
    current.removeClass('active');
    next.addClass('active');
    $(current.attr('href')).removeClass('show active');
    $(next.attr('href')).addClass('show active');
    $('html, body').animate({  scrollTop: 40 }, 'slow');
    }
    else
    {
      this.router.navigate(['/qsg-interests-details']);
    }
   }

   OtherLegalEdit(){
    if(this.router.url === '/dashboard')
    {
    var next = $('#v-pills-other-tab');
    var current = $('#v-pills-summary-tab');
    current.removeClass('active');
    next.addClass('active');
    $(current.attr('href')).removeClass('show active');
    $(next.attr('href')).addClass('show active');
    $('html, body').animate({  scrollTop: 40 }, 'slow');
   }
   else
   {
     this.router.navigate(['/qsg-otherinterests-details']);
   }
  }
   
}
