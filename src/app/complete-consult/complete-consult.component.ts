import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
declare var $: any;
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Title } from "@angular/platform-browser";
@Component({
	selector: 'app-complete-consult',
	templateUrl: './complete-consult.component.html',
	styleUrls: ['./complete-consult.component.css']
})
export class CompleteConsultComponent implements OnInit {
	show: boolean = false;
	qsg: any;
	showcheckbox: boolean = false;
	loggeduser_id: any;
	userphonedetails: any;
	queryForm: any;
	serverErrors = [];
	getuseractivity: any = [];
	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private titleService: Title,
		private dataService: DataService,
		private router: Router,
		private spinner: SpinnerVisibilityService

	) {
		this.titleService.setTitle("lawforall | Complete Consult");
	}

	ngOnInit(): void {
		this.spinner.show();
		this.spinner.hide();
		var remember_token = localStorage.getItem("remember_token") || sessionStorage.getItem("remember_token");
		if (localStorage.getItem("email") != null && remember_token != null) {

			this.loggeduser_id = localStorage.getItem("user_id");

		} else {
			this.router.navigate(['/sign-in'])
		}

		this.queryForm = this.formBuilder.group({
			date: [null],
			phone: [''],
			user_id: ['', Validators.required],
			not_ready: [1],
		});
		//this.checkuseractivity();
		// this.get_qsg();
	}
	get_qsg() {

		this.qsg = [];
		this.dataService.get_qsg_post(this.loggeduser_id).subscribe((data: {}) => {
			this.qsg = data;
			this.spinner.hide();
		});
	}

	showdiv() {
		$(document).ready(function () {
			$('.imready').addClass('activebutton');
			$('.scheduleanapp').removeClass('activebutton');
			$('.notready').removeClass('activebutton');
		});
		this.show = true;
		this.showcheckbox = false;
	}
	showsdiv() {
		$(document).ready(function () {
			$('.scheduleanapp').addClass('activebutton');
			$('.imready').removeClass('activebutton');
			$('.notready').removeClass('activebutton');
		});
		this.show = true;
		this.showcheckbox = false;
	}
	closediv() {
		$('.imready').removeClass('activebutton');
		$('.scheduleanapp').removeClass('activebutton');
		$('.notready').removeClass('activebutton');
		this.show = false;
		this.showcheckbox = false;
	}
	showcheckboxs() {
		$(document).ready(function () {
			$('.notready').addClass('activebutton');
			$('.imready').removeClass('activebutton');
			$('.scheduleanapp').removeClass('activebutton');
		});
		this.showcheckbox = true;
		this.show = false;
	}
	checkuseractivity() {
		this.userphonedetails = [];
		var data = { 'page': 'consultpage', 'user_id': this.loggeduser_id };
		this.dataService.check_user_activity(data).subscribe(
			(response) => {
				this.getuseractivity = response.data;
				this.userphonedetails = response.user_phone;
				this.queryForm.get('phone').setValue(this.userphonedetails);
				this.queryForm.get('user_id').setValue(this.loggeduser_id);
			});
	}
	savequery() {
		this.dataService.Consult_query_save(this.queryForm).subscribe(
			(response) => {
				this.show = false;
				Swal.fire('Congratulations !', 'You have Completed the Quick Start Guide Succesfully!', 'success')
				this.router.navigate(['/dashboard']);
			}, (error) => {
				this.serverErrors = error.error;
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
					footer: ''
				})
			})
	}
	dashboard() {
		Swal.fire('Congratulations !', 'You have completed the Quick Start Guide successfully. You are on the road to success! Please double check your work to confirm you are happy with your information.You can update your information at any time by going to My Account > Update Profile', 'success')
		this.router.navigate(['/summary-profile']);
	}
}
