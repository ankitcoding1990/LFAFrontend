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
  selector: 'app-qsg-legal',
  templateUrl: './qsg-legal.component.html',
  styleUrls: ['./qsg-legal.component.css']
})
export class QsgLegalComponent implements OnInit {

   tabActive:any;
  get_user_legaldetails: any;
  loggeduser_id: any;
  show_other_legaladdform: boolean = false;
  showfirst_othetlegal_form: boolean = false;
  showlegaladdform: boolean = false;
  editsingle_legal_form: boolean = false;
  legalissueForm: any;
  showfirst_legal_form: boolean = false;
  prevnetbutton: boolean = true;
  savebutton_legal: boolean = true;
  legalhidesaveprenext = true;
  single_legaldetails: any;
  userlegaldetails: any;
  savebutton_otherlegal: boolean = true;
  sub_legal_area: boolean = false;
  serverErrors = [];
  userdetails: any;
  selectedpdf: any = [];
  legalinterestForm: any;
  get_sub_interests: any;
  get_other_legal_nullparent_id: any;
  legalissueForm_submitted = false;
  sub_legal_area_inputfield: boolean = false;
  single_other_legaldetails: any;
  sublegalresources: Array<any> = [];
  legalresources: Array<any> = [];
  get_other_legal_details: any;
  pdfForm: any;
  email:any;
  myForm:any;
  showpdfview: boolean = false;
  continuenext: boolean = false;
  legal_issue_show: boolean = false;
  disable_btn_legal = true;
  save_btn_legal:boolean =true;
  showsubnav:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dataService: DataService,
    private router: Router,
    private titleService: Title,
    private spinner: SpinnerVisibilityService

  ) {
    this.titleService.setTitle("lawforall | Legal Details");

  }
  showError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: ''
    })
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

  showActionError() {
    Swal.fire({
      icon: 'warning',
      title: 'Only one action at a time',
      text: 'Please save your work or cancel to continue',
      footer: ''
    })
  }
  ngOnInit(): void {
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
    if (sessionStorage.getItem("movetosummary") != null) {
      $('#v-pills-summary-tab').trigger('click');
      sessionStorage.removeItem("movetosummary");
    }
    this.myForm = this.formBuilder.group({
      file:['', Validators.required],
    fileSource: ['', Validators.required]
  });
    this.get_user_legal_details();
    this.getotherlegalinterests();
    this.get_user_basic_info();
    this.legalissueForm = this.formBuilder.group({
      legal_type: ['', Validators.required],
      legal_issue: [''],
      legal_issue_description: [''],
      user_id: [this.loggeduser_id , Validators.required],
      id: ['', Validators.required],
    });
    
  }

  get legal_areas() { return this.legalinterestForm.get('legal_area'); }
  get legal_type() { return this.pdfForm.get('legal_type'); }

  // get registerFormControl() {
  //  return this.BasicProfileForm.controls;
  // }


  get_user_basic_info() {
   
    this.userdetails = [];
    this.dataService.getuserdetails(this.email).subscribe((data: {}) => {
      this.userdetails = data;
    
      this.legalissueForm.get("user_id").setValue(this.userdetails.result.user_id);
    
    });
  }
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
  
  get legalissueFormControl() {
    return this.legalissueForm.controls;
  }
  get_user_legal_details() {
    this.get_user_legaldetails = [];
    this.dataService.get_user_legal_details(this.loggeduser_id).subscribe((data: {}) => {
      this.get_user_legaldetails = data;

    });
  }
  edit_legal_issue(id: any) {
    if (this.showlegaladdform || (this.editsingle_legal_form && this.legalissueForm.dirty)) {
      this.showActionError()

    } else {
      this.prevnetbutton = false;
      this.showfirst_legal_form = true;
      this.savebutton_legal = true;
      this.legalhidesaveprenext = false;
      this.single_legaldetails = [];
      this.editsingle_legal_form = true;
      this.userlegaldetails = [];
      this.dataService.getuserlegaldetails(id).subscribe((data: {}) => {
        this.userlegaldetails = data;
        this.legalissueForm.get("id").setValue(this.userlegaldetails.data.id);
        this.legalissueForm.get("legal_issue_description").setValue(this.userlegaldetails.data.legal_issue_description);
        this.legalissueForm.get("legal_type").patchValue(this.userlegaldetails.data.legal_type);
        this.legalissueForm.get("legal_issue").patchValue(this.userlegaldetails.data.legal_issue);
        this.legalissueForm.get("user_id").setValue(this.loggeduser_id);
      });
    }
  }
  delete_legal_details_byid(id: any) {
    if (this.showlegaladdform || this.editsingle_legal_form) {
      this.showActionError()
    } else {
      var legal_details = this.get_user_legaldetails.data.find((item: any) => item.id === id)
      Swal.fire({
        title: 'Are you sure?',
        text: "Delete Legal Matter - " + legal_details.name + " (" + legal_details.sub_name + ") ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it'
      }).then((result) => {
        if (result.isConfirmed) {
          // deletefamilymember
          this.dataService.delete_legal_details_byid(id).subscribe(
            (response) => {
              this.get_user_legal_details();
              Swal.fire(
                'Deleted',
                'Legal matter deleted successfully!',
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
  // save legal issue type
  savelegalissue() {
    this.legalissueForm_submitted = true;

    if (this.legalissueForm.valid) {
      this.dataService.updatelegalissueForm(this.legalissueForm).subscribe(
        (response) => {

          this.editsingle_legal_form = false;
          this.savebutton_legal = true;
          this.legalhidesaveprenext = true;
          this.prevnetbutton = true;
          this.showfirst_legal_form = false;

          this.get_user_legal_details();
          this.show_popup();

        }, (error) => {
          this.serverErrors = error.error;
          this.showError()
        });
    }
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
  hidelegal_issue_editform() {
    this.editsingle_legal_form = false;
    this.savebutton_legal = true;
    this.legalhidesaveprenext = true;
    this.prevnetbutton = true;
    this.showfirst_legal_form = false;

  }
  user_legal_details(LegalForm: NgForm) {
    var data = { 'legal': this.userlegal, 'user_id': this.loggeduser_id };

    this.dataService.update_user_legals_details(data).subscribe(
      (response) => {
        LegalForm.resetForm();
        this.get_user_legal_details();
        this.prevnetbutton = true;
        this.showfirst_legal_form = false;
        this.savebutton_legal = true;
        this.showlegaladdform = false;
        this.userlegal[0].legal_type = null;
        this.show_popup();

      }, (error) => {
        this.show_popup()

      });
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
  showfirstlegal(LegalForm: NgForm) {

    $(".legal_matter_select option[value='']").attr('selected', true)

    this.prevnetbutton = false;
    this.savebutton_legal = false;
    this.showfirst_legal_form = true;
    this.showlegaladdform = true;
    this.userlegal[0].legal_type = null;
    this.userlegal[0].legal_issue = "";
  }
  add_other_Legals() {
    this.savebutton_otherlegal = false;
    this.otheruserlegal.push({
      id: this.otheruserlegal.length + 1,
      legal_area: '',
      sub_legal_area: '',
      user_id: '',
      other: '',
      describe: ''
    });
  }
  onChange_other_interest(event: any) {
    this.get_sub_interests = [];
    this.dataService.get_sub_legal_interests(event).subscribe(
      (response) => {
        this.get_sub_interests = response.data;
        this.userlegal[0].legal_issue = "";
        if(response.display == "none")
				{
					this.legal_issue_show=false;
					sessionStorage.setItem('legalissuehide','now');
				}else{
					this.legal_issue_show=true;
				}
				this.get_sub_interests.sort();
      })
  }
  onChange_other_interests(event: any) {
    // index:number
    this.get_sub_interests = [];
    this.dataService.get_sub_legal_interests(event).subscribe(
      (response) => {
        if (event == 38) {
          $('.sub_legal_area_div').hide();
          this.sub_legal_area = false;
          this.sub_legal_area_inputfield = true;
        } else {
          $('.sub_legal_area_div').show();
          this.sub_legal_area = true;
          this.sub_legal_area_inputfield = false;
        }


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
  onChange(event: any) {
    this.selectedpdf = [];
    this.dataService.getselectedlegalissuepdf(event, this.loggeduser_id).subscribe(
      (response) => {
        this.selectedpdf = response.result;
        localStorage.setItem('legal_type', this.selectedpdf.id);
        this.pdfForm.get("legal_type").setValue(this.selectedpdf.id);
        this.showpdfview = true;
        this.continuenext = true;
      });


  }

  remove_all_interest() {
    this.dataService.remove_all_interest(this.loggeduser_id).subscribe((data: {}) => {
      //remove
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
  onChangetab(data:any)
  {
    this.tabActive=data
   $(".myactive").removeClass("active")
 }
  toggle_save_edit(data:any)
  {
    if (data.target.value == "legal_save") {
      this.save_btn_legal=false;
      this.show_popup();
      this.disable_btn_legal=false;
    }
    if (data.target.value == "legal_edit") {
      this.save_btn_legal=true;
      this.disable_btn_legal=true;
    }
  }
  show_button_success()
   {
    $(".sucessbtndummary").hide();
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
    }
    else{
      this.router.navigate(['/qsg-family-details']);
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
      this.router.navigate(['/complete-profile'])
    }
  }
}
