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
  selector: 'app-qsg-otherlegalinterests',
  templateUrl: './qsg-otherlegalinterests.component.html',
  styleUrls: ['./qsg-otherlegalinterests.component.css']
})
export class QsgOtherlegalinterestsComponent implements OnInit {
  tabActive:any;
  public href: string = "";
  @Input() name: any;
  dropdownSettings = {};
  isDisable_future=false;
  sub_legal_area_div = true;
  legalhidesaveprenext = true;
  otherlegalprevnexr = true;
  legalissueForm_submitted = false;
  show_date_error: boolean = false;
  disabled = false;
  ShowFilter = true;
  legalresources: Array<any> = [];
  sublegalresources: Array<any> = [];
  legalInterest: any = [];
  dropdownList: any = [];
  selectedlegalresources: Array<any> = [];
  selected_sub_legalresources: Array<any> = [];
  selectedlegalInterest: Array<any> = [];
  email: any;
  array: any;
  sub_legal_area_inputfield: boolean = false;
  prevnetbutton: boolean = true;
  savebutton_legal: boolean = true;
  savebutton_otherlegal: boolean = true;
  showlegaladdform: boolean = false;
  show_other_legaladdform: boolean = false;
  showothrlegalinterest: boolean = false;
  removeotherlegalbutton: boolean = false;
  showfirst_legal_form: boolean = false;
  showfirst_othetlegal_form: boolean = false;
  showlegaltable: boolean = true;
  showotherlegaltable: boolean = true;
  single_other_legaldetails: any;
  editsingle_legal_form: boolean = false;
  sub_legal_area: boolean = false;
  editsingle_other_legal_form: boolean = false;
  loggeduser_id: any;
  userlegaldetails: any;
  userotherlegaldetails: any;
  data: any = [];
  serverErrors = [];
  legalissueForm: any;
  otherLegalForm: any;
  legalinterestForm: any;
  get_user_legaldetails: any;
  get_other_legal_details: any;
  get_other_legal_nullparent_id: any;
  get_sub_interests: any;
  other_legal_details: any;
  legal_area: any[] = [];
  date_error_message:boolean=false;
  future_date_error_message:boolean=false;
  today = new Date();
  save_btn_othetlegal:boolean =true;
  legal_issue_show:boolean = false;
  disable_btn_otherlegal = true;
  showsubnav:boolean = false;

  public userlegal: any[] = [{
    id: 1,
    legal_type: '',
    legal_issue: '',
    legal_issue_description: '',
    user_id: '',
  }];

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
    this.titleService.setTitle("lawforall | Complete profile");

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
   

    this.get_other_vertical();
    this.get_user_legal_details();
    this.getotherlegalinterests();
    this.getotherlegalinterests_parent_id();

    this.legalissueForm = this.formBuilder.group({
      legal_type: ['', Validators.required],
      legal_issue: [''],
      legal_issue_description: [''],
      user_id: ['', Validators.required],
      id: ['', Validators.required],
    });

    this.legalinterestForm = this.formBuilder.group({
      legal_area: ['', Validators.required],
      sub_legal_area: [''],
      id: ['', Validators.required],
      user_id: ['', Validators.required],
      other: ['', null],
      describe: ['', null],
    });
    
    this.otherLegalForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      legal_area: ['', Validators.required],
      sub_legal_area: ['', Validators.required],
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

    this.selected_sub_legalresources = [
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
    
    
  }

  get legal_areas() { return this.legalinterestForm.get('legal_area'); }
  


  removeothr_legal_interests() {
    this.showothrlegalinterest = false;
    this.removeotherlegalbutton = false;
  }
  showothrlegalinterests() {
    this.showothrlegalinterest = true;
    this.removeotherlegalbutton = true;
  }

  
  
  getotherlegalinterests() {
    this.get_other_legal_details = [];
    this.dataService.get_othet_instdetail().subscribe((data: {}) => {
      this.get_other_legal_details = data;
      let interstarr: any = this.get_other_legal_details.data;
      this.legalresources = interstarr;

    });
  }
  getotherlegalinterests_parent_id() {
    this.get_other_legal_nullparent_id = [];
    this.dataService.get_other_parentnull().subscribe((data: {}) => {
      this.get_other_legal_nullparent_id = data;

    });
  }
  onChange_other_interest(event: any) {
    this.get_sub_interests = [];
    this.dataService.get_sub_legal_interests(event).subscribe(
      (response) => {
        this.get_sub_interests = response.data;
        this.userlegal[0].legal_issue = "";
      })
  }
  onChange_other_interests(event: any) {
    // index:number
    this.get_sub_interests = [];
    this.dataService.get_sub_legal_interests(event).subscribe(
      (response) => {

        if(response.display == "none")
				{
					this.legal_issue_show=false;
					sessionStorage.setItem('legalissuehide','now');
				}else{
					this.legal_issue_show=true;
				}
				this.get_sub_interests.sort();
        /*if (event == 38) {
          $('.sub_legal_area_div').hide();
          this.sub_legal_area = false;
          this.sub_legal_area_inputfield = true;
        } else {
          $('.sub_legal_area_div').show();
          this.sub_legal_area = true;
          this.sub_legal_area_inputfield = false;
        }*/


        this.get_sub_interests = response.data;

        if (this.userlegaldetails?.data.legal_type == event && this.userlegaldetails?.data.legal_issue != null) {
          this.legalissueForm.get("legal_issue").patchValue(this.userlegaldetails.data.legal_issue);
        }
        else {
          this.legalissueForm.get("legal_issue").patchValue("");
        }

        if (this.single_other_legaldetails?.data.legal_area == event && this.single_other_legaldetails?.data.sub_legal_areas != null) {
          this.legalinterestForm.get("sub_legal_area").patchValue(this.single_other_legaldetails.data.sub_legal_areas);
        }
        else {
          this.legalinterestForm.get("sub_legal_area").patchValue("");
        }

        let interstarr: any = this.get_sub_interests;
        this.sublegalresources = interstarr;
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

  savelegalinterest() {
    this.dataService.updateothtlegalinterest(this.legalinterestForm).subscribe(
      (response) => {
        this.editsingle_other_legal_form = false;
        this.legalinterestForm.reset()
        this.get_other_vertical();
        this.otherlegalprevnexr = true;
        this.showfirst_othetlegal_form = false;
        this.show_popup();
      }, (error) => {
        this.serverErrors = error.error;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: ''
        })
      });

  }
  

  removelegalforms(LegalForm: NgForm) {
    this.prevnetbutton = true;
    this.showfirst_legal_form = false;
    this.savebutton_legal = true;
    this.showlegaladdform = false;
    LegalForm.resetForm();

  }
  removelegalform(i: number) {
    if (i == 0) {
      this.savebutton_legal = true;
    }
    this.userlegal.splice(i, 1);

  }
  removeotherlegalforms() {
    this.prevnetbutton = true;
    this.savebutton_otherlegal = true;
    this.show_other_legaladdform = false;
    this.showfirst_othetlegal_form = false;

  }
  removeotherlegalform(i: number) {
    if (i == 0) {
      this.savebutton_otherlegal = true;
    }
    this.otheruserlegal.splice(i, 1);
  }
  
  user_other_legal_details(user_other_legal_details: NgForm) 
  {

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
  
  showotherfirstlegal(otherLegalForm: NgForm) {
    otherLegalForm.reset();
    this.sub_legal_area_inputfield = false;
    this.prevnetbutton = false;
    this.savebutton_otherlegal = false;
    this.showfirst_othetlegal_form = true;
    this.show_other_legaladdform = true;
    this.otheruserlegal[0].legal_area = null;
    this.otheruserlegal[0].sub_legal_area = null;
  }



  delete_other_legal_details_byid(id: any) {
    var other_legal_interests_data = this.userotherlegaldetails.data.find((item: any) => item.id === id)
    if (this.show_other_legaladdform || this.editsingle_other_legal_form) {
      this.showActionError()
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "Delete Other Legal Interests? " ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it'
      }).then((result) => {
        if (result.isConfirmed) {
          // deletefamilymember
          this.dataService.delete_other_legal_details_byid(id).subscribe(
            (response) => {
              this.get_other_vertical();
              Swal.fire(
                'Deleted',
                'Legal issue deleted successfully!',
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
  
  edit_other_legal_issue(id: any) {
    if (this.show_other_legaladdform || (this.legalinterestForm.dirty && this.editsingle_other_legal_form)) {
      this.showActionError()

    } else {
      this.single_other_legaldetails = [];
      this.showfirst_othetlegal_form = true;
      this.editsingle_other_legal_form = true;
      this.otherlegalprevnexr = false;

      this.other_legal_details = [];
      this.dataService.getotherlegaldetailsbyid(id).subscribe((data: {}) => {
        this.single_other_legaldetails = data;

        if (this.single_other_legaldetails.data.legal_area == 38) {
          $('.sub_legal_area_div').hide();
          this.sub_legal_area_inputfield = true;
          this.legalinterestForm.get("other").setValue(this.single_other_legaldetails.data.other);
        } else {
          this.sub_legal_area_inputfield = false;
          $('.sub_legal_area_div').show();
        }
        this.legalinterestForm.get("id").setValue(this.single_other_legaldetails.data.id);
        this.legalinterestForm.get("describe").setValue(this.single_other_legaldetails.data.describe);
        this.legalinterestForm.get("legal_area").patchValue(this.single_other_legaldetails.data.legal_area);
        this.legalinterestForm.get("sub_legal_area").patchValue(this.single_other_legaldetails.data.sub_legal_areas);
        this.legalinterestForm.get("user_id").setValue(this.loggeduser_id);

      });
    }
  }
  
  counter(i: number) {
    return new Array(i);
  }


  hidelegal_issue_editform() {
    this.editsingle_legal_form = false;
    this.savebutton_legal = true;
    this.legalhidesaveprenext = true;
    this.prevnetbutton = true;
    this.showfirst_legal_form = false;

  }
  hide_legalinterestForm() {
    this.editsingle_other_legal_form = false;
    this.otherlegalprevnexr = true;
    this.showfirst_othetlegal_form = false;
  }

  onChangetab(data:any)
  {
   //  this.tabActive=data
   // $(".myactive").removeClass("active")
  
  }
 
  toggle_save_edit(data:any)
  {     
    if (data.target.value == "other_save") {
      this.save_btn_othetlegal=false;
    this.disable_btn_otherlegal=false;
      this.show_popup();
    }
    if (data.target.value == "other_edit") {
      this.save_btn_othetlegal=true;
    this.disable_btn_otherlegal=true;
    }

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
      this.router.navigate(['/qsg-profilesummary-details']);
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
    else{
      this.router.navigate(['/qsg-interests-details']);
    }
  }
}
