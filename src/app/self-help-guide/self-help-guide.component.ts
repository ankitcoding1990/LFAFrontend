import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
declare var $: any;
@Component({
	selector: 'app-self-help-guide',
	templateUrl: './self-help-guide.component.html',
	styleUrls: ['./self-help-guide.component.css']
})
export class SelfHelpGuideComponent implements OnInit {
	guides: any = [];
	getuseractivity: any = [];
	loggeduser_id: any;
	qsg: any;
	email: any;
	img_status: any;
	self_review_rwad=true;
	notes_cal_section:boolean = false;
	self_sidebar:boolean=true;
	navitemvalue:any;
	constructor(private dataService: DataService,
		private router: Router,
		private http: HttpClient,
		private titleService: Title,
		private spinner: SpinnerVisibilityService) { this.titleService.setTitle("lawforall | Self Help Guide"); }
	ngOnInit() {
		this.spinner.show();
		this.spinner.hide();
		var remember_token = localStorage.getItem("remember_token") || sessionStorage.getItem("remember_token");

		if (localStorage.getItem("email") != null && remember_token != null) {
			this.email = localStorage.getItem("email");
			this.loggeduser_id = localStorage.getItem("user_id");
		} else {
			this.router.navigate(['/sign-in'])
		}
		if(sessionStorage.getItem('self_help_dashboard') != null)
		{
			this.notes_cal_section=true;
			this.self_sidebar=false;
			this.navitemvalue="Dashboard";
			$("#myDiv").removeClass("col-lg-9");
		}else{
			this.navitemvalue="Quick Start Guide";
			this.notes_cal_section=false;
			this.self_sidebar=true;
			$("#myDiv").addClass("col-lg-9");
		}
		this.getguides();
		// this.get_qsg();
	}
	getguides() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		this.guides = [];
		this.dataService.getselfhelpguides(this.loggeduser_id).subscribe((data: {}) => {

			this.guides = data;
			
		});
	}
	get_qsg() {

		this.qsg = [];
		this.dataService.get_qsg_post(this.loggeduser_id).subscribe((data: {}) => {
			this.qsg = data;
			this.spinner.hide();
		});
	}

	checkuseractivity() {
		var data = { 'page': 'selfhelpguide', 'user_id': this.loggeduser_id };
		this.dataService.check_user_activity(data).subscribe(
			(response) => {
				this.getuseractivity = response.data;

			});
	}
	chnage_button_active(id:any)
	{
		
		var data = { 'id': id, 'user_id': this.loggeduser_id };
		this.dataService.update_self_help_status(data).subscribe(
			(response) => {
			$("#selfreview_"+id).hide();
			$("#selfread_"+id).show();
			this.getguides();
			});
		if(sessionStorage.getItem('self_help_dashboard') != null)
		{
		sessionStorage.setItem('self_guide_dashboard','true');
	}
	}
}
