import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-email-verify-later',
  templateUrl: './email-verify-later.component.html',
  styleUrls: ['./email-verify-later.component.css']
})
export class EmailVerifyLaterComponent implements OnInit {

  counter: any;
	countersec: any;
	interval: any;
	user: any;
	show_counter: boolean = true;
  HiddenEmail: boolean = true;
	loginForm: any;
	loginForm_resend_otp: any;
	serverErrors = [];
	loading = false;
	hideForm:boolean = false;
  emaillater:any;
	emailverify_submitted:boolean=false;
	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private dataService: DataService,
    private route: ActivatedRoute,
		private router: Router,
		private titleService: Title
	) { this.titleService.setTitle("lawforall | Email Verify"); }


	ngOnInit(): void {

		
		this.user = this.route.snapshot.params.email;
		this.emaillater = 1;
    this.loginForm = this.formBuilder.group({
			otp: ['', Validators.required],
			email: [this.user, Validators.required],
      emaillater: [this.emaillater, Validators.required]
		});
		this.loginForm_resend_otp = this.formBuilder.group({
			email: [this.user],
		});
		this.startCountdown(120);

		this.emailotp();
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
    //console.log('login form', this.loginForm);
		this.dataService.emailotpverify(this.loginForm).subscribe(
			(response:any) => {
					if(response.status == true)
					{
						this.router.navigate(['/change-password'])
						Swal.fire('Email Verify...', 'Verification code matched successfully!', 'success')
					}
					else
					{
						if(response.data == 'Already Varified')
						{
							this.hideForm = true;
						}else
						{
							Swal.fire({
								icon: 'error',
								title: 'Oops...',
								text: response.data,
								footer: ''
							})
						}
					}
					
				
			},
			(error) => {
				this.show_counter = false;
				this.serverErrors = error.error;

				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Your token mismatched. please try again!',
					footer: ''
				})
			}
		);
	}

}
