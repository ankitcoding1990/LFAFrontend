import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import Swal from 'sweetalert2';
import { Title } from "@angular/platform-browser";
import { LoginService } from '../services/login.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
declare var $: any;
@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
	userLoggedIn: any = [];
	signup_request: any;
	displaymenu = false;
	user: any;
	visible = false;
	PasswordForm: any;
	serverErrors = [];
	//loginForm: FormGroup;
	loading = false;
	submitted = false;
	eye_icon: boolean = true;
	eye_icon_confirm: boolean = true;
	basicfprofile_submitted: boolean = false;
	no_match_pass: boolean = false;
	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private dataService: DataService,
		private titleService: Title,
		public LoginService: LoginService,
		private router: Router,
		private spinner: SpinnerVisibilityService

	) {
		this.titleService.setTitle("lawforall | Change password");
		this.LoginService.isLoggedIn.subscribe((data: any) => {
			if (data.status === "1") {
				this.userLoggedIn = true;
				this.visible = true;
				this.displaymenu = true;
			}
		});
	}

	ngOnInit(): void {

		if (localStorage.getItem("email") !== null) {
			this.user = localStorage.getItem("email");
		}
		this.PasswordForm = this.formBuilder.group({
			new_password: ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$&()\\-`.+,/\]+)$"), Validators.minLength(8)]],
			new_password_confirm: ['', Validators.required],
			email: [this.user, Validators.required],
		}, {

		}
		);
	}
	get email() { return this.PasswordForm.get('email'); }
	get new_password() { return this.PasswordForm.get('new_password'); }
	get new_password_confirm() { return this.PasswordForm.get('new_password_confirm'); }
	get registerFormControl() {
		return this.PasswordForm.controls;
	}
	togglePassword() {
		this.eye_icon = !this.eye_icon
	}
	toggleConfirmPassword() {
		this.eye_icon_confirm = !this.eye_icon_confirm
	}
	changepass() {
		this.submitted = true;
		this.basicfprofile_submitted = true;
		const passwords: string = this.PasswordForm.get('new_password').value;
		const confirm_password: string = this.PasswordForm.get('new_password_confirm').value;

		if (typeof (passwords) === 'number') {

			$('.hide_error_length').show();
		}
		if (passwords !== confirm_password) {
			$('.hide_confirmerror_length').show();
			$('.hide_confirm_length').hide();

			return;
		} else {
			$('.hide_confirmerror_length').hide();

		}

		if (this.PasswordForm.valid) {
			this.signup_request = [];
			this.dataService.changepass(this.PasswordForm).subscribe((response: {}) => {
				this.signup_request = response;
				Swal.fire({
					icon: 'success',
					title: 'Password changed successfully!',
					footer: ''
				})

				localStorage.setItem('token', this.signup_request.data.access_token);
				localStorage.setItem('name', this.signup_request.data.name);
				localStorage.setItem('phone', this.signup_request.data.phone);
				localStorage.setItem('email', this.signup_request.data.email);
				localStorage.setItem('user_id', this.signup_request.data.user_id);
				localStorage.setItem('emailverify', this.signup_request.data.emailverify);
				this.LoginService.isLoggedIn.next({ status: '1' });
				if (this.signup_request.data.user_status == 2) {
					this.router.navigate(['/email'])
				}
				if (this.signup_request.data.user_status == 0) {
					if (sessionStorage.getItem("prev_url") !== null) 
					{
				this.router.navigate([sessionStorage.getItem("prev_url")])
				sessionStorage.removeItem('prev_url');
				}else{
					this.router.navigate(['/welcome-letter'])
				}
					
				
				}
				if (this.signup_request.data.user_status == 1) {
					this.router.navigate(['/summary-profile'])
				}
			},
				(error) => {
					this.serverErrors = error.error;

					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong!',
						footer: ''
					})
				}

			);

		}
	}
}
