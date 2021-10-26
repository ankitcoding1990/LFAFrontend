import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import { Title } from "@angular/platform-browser";
import { SpinnerVisibilityService } from 'ng-http-loader';
@Component({
	selector: 'app-phone',
	templateUrl: './phone.component.html',
	styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
	counter: any;
	countersec: any;
	userphone: any;
	email: any;
	loggeduser_id: any;
	userdetails: any;
	phoneForm: any;
	phoneForm_resend_otp: any;
	loginForm1: any;
	serverErrors = [];
	userLoggedIn: any = [];
	loading = false;
	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private dataService: DataService,
		private titleService: Title,
		private router: Router,
		private spinner: SpinnerVisibilityService
	) { this.titleService.setTitle("lawforall | Phone Verify"); }


	ngOnInit(): void {
		if (localStorage.getItem("email") != null) {
			this.userphone = localStorage.getItem("phone_number");
			this.email = localStorage.getItem("email");
			this.loggeduser_id = localStorage.getItem("user_id");
			this.userdetails = [];
			this.dataService.getuserdetails(this.email).subscribe((data: {}) => {
				this.userdetails = data;
				this.loginForm1.get("user_id").setValue(this.userdetails.result.user_id);
				this.phoneForm.get("phone").setValue(this.userdetails.result.phone);
				this.loginForm1.get("phone").setValue(this.userdetails.result.phone);
			});

		}
		else {
			this.userphone = localStorage.getItem("phone_number");
		}

		this.userLoggedIn = false;
		this.phoneForm = this.formBuilder.group({
			phone: ['', Validators.required],
		});
		this.phoneForm_resend_otp = this.formBuilder.group({
			phone: [this.userphone],
		});
		this.loginForm1 = this.formBuilder.group({
			otp: ['', Validators.required],
			phone: ['', Validators.required],
			user_id: ['', Validators.required],
		});

		this.loginForm1.get("phone").setValue(this.userphone);
		this.startCountdown(120);
	}
	get phone() { return this.phoneForm.get('phone'); }
	get otp() { return this.loginForm1.get('otp'); }
	get usersphone() { return this.loginForm1.get('phone'); }

	startCountdown(seconds: any) {
		this.counter = seconds;
		this.countersec = 'sec';

		const interval = setInterval(() => {

			this.counter--;

			if (this.counter < 0) {
				clearInterval(interval);
				this.countersec = '';
				this.counter = "Oops! Your secure code has expired. Click below to resend!"
			}
		}, 1000);
	}
	resnd_sms_otp() {
		this.startCountdown(120);
		if (this.phoneForm_resend_otp.valid) {
			this.dataService.mobileverifies(this.phoneForm_resend_otp).subscribe(
				(response) => {
					Swal.fire('Check your mobile...', 'Verification code sent succesfully!', 'success')
				},
				(error) => {
					this.serverErrors = error.error;

					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Phone not found!',
						footer: ''
					})
				});
		}
	}
	mobileverify() {

		this.dataService.mobileverifies(this.phoneForm).subscribe(
			(response) => {
				localStorage.setItem('userphone', response.userphone);
				localStorage.setItem('user_email', response.email);
				this.userLoggedIn = true;
				Swal.fire('Thank you...', 'Verification code sent successfully! ', 'success')
			},
			(error) => {
				this.serverErrors = error.error;
				this.userLoggedIn = false;

				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Verification code did not match!',
					footer: ''
				})
			}
		);
	}
	mobileotp() {

		this.dataService.verify_mobile_otp(this.loginForm1).subscribe(
			(response) => {
				this.router.navigate(['/change-password'])
				Swal.fire('Thank you...', 'Verification code matched successfully!', 'success')
			},
			(error) => {
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
