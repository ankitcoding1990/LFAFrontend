import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Title } from "@angular/platform-browser";
declare var $: any;
@Component({
  selector: 'app-guide-child-support',
  templateUrl: './guide-child-support.component.html',
  styleUrls: ['./guide-child-support.component.css']
})
export class GuideChildSupportComponent implements OnInit {

  guides: any = [];
  singleguides: any = [];
  data: any = [];
  id: any = [];
  loggeduser_id: any;
  viewer = 'google';
  selectedType = 'docx';
  doc: any;
    qsg: any;
    navitemvalue:any;
    notes_cal_section=false;
    self_sidebar:boolean=true;
  getuseractivity: any = [];
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private spinner: SpinnerVisibilityService
  ) { this.titleService.setTitle("lawforall | Guide"); }
  ngOnInit() {

    this.spinner.show();
    this.spinner.hide();
    var remember_token = localStorage.getItem("remember_token") || sessionStorage.getItem("remember_token");
    if (localStorage.getItem("user_id") != null && remember_token != null) {
      this.loggeduser_id = localStorage.getItem("user_id");

    } else {
      this.loggeduser_id = 0;
    }
    if(sessionStorage.getItem('self_guide_dashboard') != null)
    {
      this.notes_cal_section=true;
      this.self_sidebar=false;
      this.navitemvalue="Dashborad";
      sessionStorage.removeItem('self_guide_dashboard');
      //sessionStorage.removeItem('self_help_dashboard');
      $("#myDiv").removeClass("col-lg-9");
    }else{
      this.notes_cal_section=false;
      this.self_sidebar=true;
      this.navitemvalue="Quick Start Guide";
      $("#myDiv").addClass("col-lg-9");
    }
    this.id = this.route.snapshot.params.id;
    this.getguides();
    this.getguideyid();
      this.checkuseractivity();
      this.get_qsg();
  }
  getguides() {
    this.spinner.show();
    this.guides = [];
    this.dataService.getselfhelpguides(this.loggeduser_id).subscribe((data: {}) => {
      this.spinner.hide();
      this.guides = data;

    });
  }
  getguideyid() {
 
    this.spinner.show();
    this.singleguides = [];
    window.scrollTo({ top: 0, behavior: 'smooth' });
    var data = { 'self_id': this.id, 'user_id': this.loggeduser_id };
    this.dataService.getguideyid(data).subscribe((dataResponse: {}) => {
      this.singleguides = dataResponse;
      //this.doc = this.singleguides.dataResponse.file_view;
      if (this.singleguides !== undefined) {
        this.spinner.hide()
      }
    });
  }
  getguidebyurl(url:any,id:any)
  {
   this.id =url;
   this.getguideyid();
    var data = { 'id': id, 'user_id': this.loggeduser_id };
    this.dataService.update_self_help_status(data).subscribe(
      (response) => {
        this.getguides()
      // $("#selfreview_"+id).hide();
      // $("#selfread_"+id).show();

      });
  }
  checkuseractivity() {
    var data = { 'page': 'selfhelpguide', 'user_id': this.loggeduser_id };
    this.dataService.check_user_activity(data).subscribe(
      (response) => {
        this.getuseractivity = response.data;

      });
  }
    get_qsg() {

    this.qsg = [];
    this.dataService.get_qsg_post(this.loggeduser_id).subscribe((data: {}) => {
      this.qsg = data;
      this.spinner.hide();
    });
  }
}
