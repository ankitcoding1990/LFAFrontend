import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Title } from "@angular/platform-browser";
declare var $: any;
@Component({
	selector: 'app-review-legal-resources',
	templateUrl: './review-legal-resources.component.html',
	styleUrls: ['./review-legal-resources.component.css']
})
export class ReviewLegalResourcesComponent implements OnInit {
	legalresourcestates: any = [];
	legalresourcebuttons: any = [];
	stateForm: any;
	qsg: any;
	loggeduser_id: any;
	selectedstate: any;
	myGroup: any;
	showbuttonsold: boolean = true;
	showbuttonnew: boolean = false;
	getuseractivity: any = [];
	other_isChecked = false;
	userdetails:any;
	email:any;
navitemvalue:any;
	 notes_cal_section=false;
    self_sidebar:boolean=true;
	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private titleService: Title,
		private dataService: DataService,
		private router: Router,
		private spinner: SpinnerVisibilityService

	) { this.titleService.setTitle("lawforall | Review Legal Resources"); }

	ngOnInit(): void {
		this.spinner.show();
		this.spinner.hide();
		var remember_token = localStorage.getItem("remember_token") || sessionStorage.getItem("remember_token");
		if (localStorage.getItem("email") != null && remember_token != null) {

			this.loggeduser_id = localStorage.getItem("user_id");
			this.email = localStorage.getItem("email");
		} else {
			this.router.navigate(['/sign-in'])
		}
		if(sessionStorage.getItem('review_dashboard') != null)
    {
      this.notes_cal_section=true;
      this.self_sidebar=false;
        this.navitemvalue="Dashboard";
      sessionStorage.removeItem('review_dashboard');
      $("#myDiv").removeClass("col-lg-9");
    }else{
      this.notes_cal_section=false;
        this.navitemvalue="Quick Start Guide";
      this.self_sidebar=true;
      $("#myDiv").addClass("col-lg-9");
    }
		//this.checkuseractivity();
		// this.get_qsg();
		this.get_user_basic_info();
		this.getlegalresourcesstates();
		this.get_legal_resurce_buttons();
		this.stateForm = this.formBuilder.group({
			state: ['', Validators.required],
		});
	}

	getlegalresourcesstates() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		this.legalresourcestates = [];
		this.dataService.getlegalresourcesstates().subscribe((data: {}) => {
			this.legalresourcestates = data;
			
		});
	}
	get_legal_resurce_buttons() {
		this.legalresourcebuttons = [];
		this.dataService.get_legal_resurce_buttons(this.loggeduser_id).subscribe((data: {}) => {
			this.legalresourcebuttons = data;
			
		});
	}
	getstatebuttons() {
		//code
	}
	onChange(event: any) {
		this.selectedstate = [];
		this.dataService.getselectedstatebuttons(event,this.loggeduser_id).subscribe(
			(response) => {
				this.showbuttonnew = true;
				this.legalresourcebuttons = response;
			});
	}
	checkuseractivity() {
		var data = { 'page': 'legalresources', 'user_id': this.loggeduser_id };
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
	get_page_link(e:any,id:any,status:any)
	{
		var state = $(".state_id_review").val();
		
		if(status == "Unlocked")
		{
			this.checkuseractivity();
			this.router.navigate([]).then(result => {  window.open(e , '_blank'); });
		var data = { 'id': id, 'user_id': this.loggeduser_id ,'state':state };
		this.dataService.update_legalbutton_status(data).subscribe(
			(response) => {
				var state_id = $('.state_id_review').find(":selected").text();
			this.onChange(state_id);

			});
	}else{
		$("#upgrademembership").modal('show');
		$("#sch_form").trigger('click');
		$('.scheduleanapp').removeClass('activebutton');
	}
		
		
	}
		get_user_basic_info() {
		this.userdetails = [];
		this.dataService.getuserdetails(this.email).subscribe((data: {}) => {
			this.userdetails = data;
			if(this.userdetails.result.state === "" || this.userdetails.result.state === null)
			{
				
				this.stateForm.get("state").patchValue("");
				
			}else{
				this.stateForm.get("state").patchValue(this.userdetails.result.state);
				
			}
			
				})
		}
}
