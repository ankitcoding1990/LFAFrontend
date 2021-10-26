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
  selector: 'app-qsg-pet',
  templateUrl: './qsg-pet.component.html',
  styleUrls: ['./qsg-pet.component.css']
})
export class QsgPetComponent implements OnInit {
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
  showsubnav:boolean = false;
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
 
  public userpets: any[] = [{
    id: 1,
    species: '',
    breed: '',
    birthdate: '',
    age_number: '',
    notes: '',
    user_id: '',
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
    // this.get_user_basic_info();
    this.getpetdetais();
    this.get_all_pet_notes();
  
    this.editpetForm = this.formBuilder.group({
      species: ['', Validators.required],
      name: ['', Validators.required],
      user_id: ['', Validators.required],
      breed: ['', null],
      birthdate: ['', this.checkDobProfileInitial],
      age_number: ['', null],
      notes: ['', null],
      id: ['', Validators.required],
    });
   
    this.editpetnotesForm = this.formBuilder.group({
      id: ['', Validators.required],
      notes: ['', Validators.required],
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
 
  get editpetFormControl() {
    return this.editpetForm.controls;
  }
  
  get_user_basic_info() {
    this.userdetails = [];
    this.dataService.getuserdetails(this.email).subscribe((data: {}) => {
      this.userdetails = data;
    
    });
  }

 
  get_all_pet_notes() {
    this.pet_list = [];
    this.dataService.get_all_pet_note(this.loggeduser_id).subscribe((data: {}) => {
      this.pet_list = data;

    });
  }
  
  show_notes_textarea() {
    this.show_notes_button = false;
    this.show_notes_field = true;
    this.editpetForm.get("notes").setValue('');
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

        }
        , (error) => {
          this.serverErrors = error.error;
          this.showError()
        });
    }
  }
  
  addPets() {
    this.savebutton_pets = false;
    this.userpets.push({
      id: this.userpets.length + 1,
      name: '',
      species: '',
      breed: '',
      birthdate: '',
      age_number: '',
      notes: '',
      user_id: '',
    });
  }
 
  removePet(petForm: NgForm) {
    petForm.reset();
    this.savebutton_pets = true;
    this.showfirstpetform = false;
    this.showpetaddform = false;
    this.prevnetbutton = true;

  }
  removePets(i: number) {
    if (i == 0) {
      this.savebutton_pets = true;
    }
    this.userpets.splice(i, 1);
  }
  
  update_pet_single_note() {
    this.single_pet = [];
    this.dataService.update_pet_note(this.editpetnotesForm).subscribe(
      (response) => {
        this.show_popup();
        $('#closebutton_notes').trigger('click');
        this.single_pet = response.data;
        this.get_pet_notes(this.single_pet.pet_id);
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
 
  show_popup() {
    Swal.fire({
      icon: 'success',
      title: 'Thank you',
      text: 'Your work has been saved!',
      showConfirmButton: false,
      timer: 1500
    })
  }
 
  userpetdetails(petForm: NgForm) {

    var data = { 'pets': this.userpets, 'user_id': this.loggeduser_id };
    this.dataService.update_user_pets_details(data).subscribe(
      (response) => {
        petForm.reset();
        this.getpetdetais();
        this.savebutton_pets = true;
        this.showpetaddform = false;
        this.showfirstpetform = false;
        this.prevnetbutton = true;
        this.age_message = false;
        this.age_input = false;
        this.show_popup();

      }, (error) => {
        this.serverErrors = error.error;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Fill required fields!',
          footer: ''
        })
      });
  }
 
  showfirstpets(petForm: NgForm) {
    petForm.reset();
    this.savebutton_pets = false;
    this.showfirstpetform = true;
    this.showpetaddform = true;
    this.prevnetbutton = false;

    this.age_input = false;
    this.add_pet_dob_field = true;
    petForm.resetForm({
      birthdate: '',
      age_number: ''
    });
  }
 
  hidepetsform() {
    this.show_notes_button = true;
    this.show_notes_field = false;
    this.editpetsform = false;
    this.showfirstpetform = false;
    this.petshidesaveprenext = true;
  }
 
  edit_notes(id: any, notes: any, pet_id: any) {
    this.editpetnotesForm.get("id").setValue(id);
    this.editpetnotesForm.get("notes").setValue(notes);

  }
  delete_notes(id: any, pet_id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete Note?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.isConfirmed) {

        this.dataService.delete_note(id).subscribe(
          (response) => {
            this.get_pet_notes(pet_id);
            Swal.fire(
              'Deleted',
              'Note deleted successfully!',
              'success'
            )
          }, (error) => {
            this.serverErrors = error.error;
            this.showError()
          });

      }
    })
  }
  
  deletepet(id: any) {
    if (this.showpetaddform || this.editpetsform) {
      this.showActionError()
    }
    else {
      var pet_data = this.getuserpetsdetails.data.find((item: any) => item.id === id)
      Swal.fire({
        title: 'Are you sure?',
        text: "Delete Pet - " + pet_data.name + " ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it'
      }).then((result) => {
        if (result.isConfirmed) {
          // deletefamilymember
          this.dataService.deletepet(id).subscribe(
            (response) => {
              this.getpetdetais();
              this.showpetaddform = false;
              this.showpetaddform = false;
              Swal.fire(
                'Deleted',
                'Pet deleted successfully!',
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
 
  get_pet_notes(id: any) {
    this.dataService.get_pet_notes(id).subscribe((data: any) => {
      this.petnotes_details = data.data;

    });
  }

 
  editpetdetails(id: any) {
    if (this.showpetaddform || (this.editpetsform && this.editpetForm.dirty)) {
      this.showActionError()
    }
    else {
      this.petnotes_details = [];
      this.get_pet_notes(id);
      this.showfirstpetform = true;
      this.petshidesaveprenext = false;
      this.editpetformdetails = [];
      this.editpetsform = true;
      this.dataService.get_single_pet_details(id).subscribe(
        (response) => {
          this.editpetformdetails = response.data;

          this.editpetForm.get("id").setValue(this.editpetformdetails.id);
          this.editpetForm.get("user_id").setValue(this.editpetformdetails.user_id);
          this.editpetForm.get("name").setValue(this.editpetformdetails.name);
          this.editpetForm.get("breed").setValue(this.editpetformdetails.breed ?? "");
          this.editpetForm.get("species").setValue(this.editpetformdetails.species);
          this.editpetForm.get("birthdate").patchValue(this.editpetformdetails.birthdate ?? "");
          this.editpetForm.get("age_number").patchValue(this.editpetformdetails.age_number ?? "");
          this.editpetForm.get("notes").setValue("");

          if (this.editpetformdetails.age_number != null && this.editpetformdetails.age_number != 0) {
            this.editpetForm.get("age_number").patchValue(this.editpetformdetails.age_number);
            $(".checkSurfaceEnvironment-1").prop("checked", true);
            this.age_input = true;
            this.age_message = true;
            this.edit_pet_dob_field = false;

          } else {
            $(".checkSurfaceEnvironment-1").prop("checked", false);
            this.age_message = false;
            this.age_input = false;
            this.edit_pet_dob_field = true;
            this.editpetForm.get("age_number").patchValue(0);
          }
        });
    }
  }
  updatepetdetails() {
    this.editpetForm_submitted = true;
    if (this.editpetForm.valid) {
      this.dataService.update_single_pet_details(this.editpetForm).subscribe(
        (response) => {
          this.editpetsform = false;
          this.editpetForm.reset(this.editpetForm.value)

          this.getpetdetais();
          this.showfirstpetform = false;
          this.petshidesaveprenext = true;
          this.show_notes_button = true;
          this.show_notes_field = false;
          this.show_popup();

        }, (error) => {
          this.serverErrors = error.error;
          this.showError()
        });
    }
  }
  counter(i: number) {
    return new Array(i);
  }

 
  edit_pet_age_number(e: any) {
    if (e.target.checked) {

      this.age_input = true;
      this.age_message = true;
      this.edit_pet_dob_field = false;
    } else {

      this.editpetForm.get("birthdate").setValue('');
      this.editpetForm.get("age_number").patchValue('');
      this.age_input = false;
      this.age_message = false;
      this.edit_pet_dob_field = true;

    }
  }
  onChange_pet_edit(e: any, petForm: NgForm) {
    if (e.target.checked) {
      this.age_input = true;
      this.age_message = true;
      this.add_pet_dob_field = false;
    } else {
      petForm.resetForm({
        birthdate: '',
        age_number: ''
      });
      this.age_input = false;
      this.age_message = false;
      this.add_pet_dob_field = true;
    }
  }
  
  
  toggle_save_edit(data:any)
  {
   
   
    if (data.target.value == "pet_save") {
      this.save_btn_pet=false;
      this.disable_btn_pet=false;
      this.show_popup();
    }
    if (data.target.value == "pet_edit") {
      this.save_btn_pet=true;
      this.disable_btn_pet=true;
    }
   
  }
  show_button_success()
   {
    $(".sucessbtndummary").hide();
   }

   NextTab()
   {
     if(this.router.url === '/dashboard'){
     var next = $('a.nav-link.dash.active').parent().next('li').find('a');
     var current = $('a.nav-link.dash.active');
     current.removeClass('active');
     next.addClass('active');
     $(current.attr('href')).removeClass('show active');
     $(next.attr('href')).addClass('show active');
     }
     else{
      this.router.navigate(['/qsg-interests-details']);
     }
   }

   PrevTab()
  {
    if(this.router.url === '/dashboard'){
    var next = $('a.nav-link.dash.active').parent().prev('li').find('a');
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
}
