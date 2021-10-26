import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import { Title } from "@angular/platform-browser";
@Component({
	selector: 'app-email-verify',
	templateUrl: './email-verify.component.html',
	styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {
	counter: any;
	countersec: any;
	interval: any;
	user: any;
	show_counter: boolean = true;
	loginForm: any;
	loginForm_resend_otp: any;
	serverErrors = [];
	loading = false;
	emailverify_submitted:boolean=false;
	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private dataService: DataService,
		private router: Router,
		private titleService: Title
	) { this.titleService.setTitle("lawforall | Email Verify"); }


	ngOnInit(): void {

		if (localStorage.getItem("email") != null) {
			this.user = localStorage.getItem("email");

		}
		this.loginForm = this.formBuilder.group({
			otp: ['', Validators.required],
			email: [this.user, Validators.required],
		});
		this.loginForm_resend_otp = this.formBuilder.group({
			email: [this.user],
		});
		this.startCountdown(120);
	}
	get otp() { return this.loginForm.get('otp'); }
	get email() { return this.loginForm.get('email'); }
	get emailverify_FormControl() {
		return this.loginForm.controls;
	}
	startCountdown(seconds: any) {
		this.counter = seconds;
		this.countersec = 'sec';

		this.interval = setInterval(() => {

			this.counter--;

			if (this.counter <= 0) {
				clearInterval(this.interval);
				this.countersec = '';
				this.counter = "Oops! Your secure code has expired. Click below to resend!";
			// 	this.dataService.emailverified(this.loginForm_resend_otp).subscribe((data: {}) => {
			// });
			}
		}, 1000);
	}
	resnd_email_otp() {
		this.startCountdown(120);
		this.show_counter = true;
		if (this.loginForm_resend_otp.valid) {
			this.dataService.emailverified(this.loginForm_resend_otp).subscribe((data: {}) => {
				Swal.fire('Check your email...', 'Verification code sent successfully!', 'success')

			});
		}
	}
	email_username() {
		this.dataService.email_username(this.loginForm_resend_otp).subscribe(
			(response) => {
				//code
			})
	}
	emailotp() {

		this.dataService.emailotpverify(this.loginForm).subscribe(
			(response:any) => {
				/*var mydata = { 'email': localStorage.getItem("email"), 'phone': localStorage.getItem("phone"), 'name':localStorage.getItem("name") };
				sessionStorage.setItem("user_type",'welcome_letter');
					this.dataService.send_welcome_mail_after_email_verification(mydata).subscribe((data: {}) => {
				});*/
					if(response.status == true)
					{
						this.router.navigate(['/change-password'])
						Swal.fire('Email Verify...', 'Verification code matched successfully!', 'success')
					}
					else
					{
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: response.data,
							footer: ''
						})
					}
					
				
			},
			(error) => {
				this.show_counter = false;
				this.serverErrors = error.error;

				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Verification code did not match!',
					footer: ''
				})
			}
		);
	
	}
}
