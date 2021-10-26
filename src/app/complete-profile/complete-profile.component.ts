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
	selector: 'app-complete-profile',
	templateUrl: './complete-profile.component.html',
	styleUrls: ['./complete-profile.component.css']
})


export class CompleteProfileComponent implements OnInit {
	
	email: any;
	loggeduser_id: any;

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
		if (localStorage.getItem("email") != null) {
			this.email = localStorage.getItem("email");
			this.loggeduser_id = localStorage.getItem("user_id");

		} else {
			this.router.navigate(['/sign-in'])
		}
		$(".sucessbtndummary").hide();
		if (sessionStorage.getItem("movetosummary") != null) {
			$('#v-pills-summary-tab').trigger('click');
			sessionStorage.removeItem("movetosummary");
		}
	}
	movetoself()
   {
    this.router.navigate(['/self-help-guide'])
   }
   show_button_success()
   {
   	$(".sucessbtndummary").show();
   }
   show_button_hide()
   {
   	$(".sucessbtndummary").hide();
   }
}
