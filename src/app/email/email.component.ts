import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import { Title } from "@angular/platform-browser";
declare var $: any;
@Component({
	selector: 'app-email',
	templateUrl: './email.component.html',
	styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
	myemail_data:any
	last_email:any;
	new_email:any;
	user: any;
	userphone: any;
	loggeduser_id: any;
	email_id: any;
	phone_number: any;
	loginForm: any;
	phoneForm: any;
	userdetails: any;
	show_mail_btn=true;
	show_upload_button=false;
	show_mobile_btn=true;
	show_update_mobile_button=false;
	serverErrors = [];
	// loginForm: FormGroup;
	loading = false;
	basicfprofile_submitted = false;
	show_email_sms: boolean = false;
	show_email: boolean = false;
	phoneverify_submitted = false;
	change_title:boolean=true;
	username_password:boolean=true;
	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private titleService: Title,
		private dataService: DataService,
		private router: Router

	) { this.titleService.setTitle("lawforall | Email"); }

	ngOnInit(): void {
		if (localStorage.getItem("email") != null) {
			this.user = localStorage.getItem("email");
			this.loggeduser_id = localStorage.getItem("user_id");
			this.userphone = localStorage.getItem("phone");
			this.userdetails = [];
			this.dataService.getuserdetails(this.user).subscribe((data: {}) => {
				this.userdetails = data;
				this.phoneForm.get("phone").setValue(this.userdetails.result.phone);
				
			});
			this.change_title=true;
			this.show_email = true;

		} else {

			this.show_email = false;
		}
		if (sessionStorage.getItem("action") != null) {
			this.change_title=false;
			this.show_mail_btn=false;
			var action = sessionStorage.getItem("action");
			if(action == "forgot password")
			{
				this.username_password=false;
			}else{
				this.username_password=true;
			}
			$(".myemailset").attr("readonly", false); 
			sessionStorage.removeItem("action");
		}

		this.loginForm = this.formBuilder.group({
			email: [this.user, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
		});
		this.phoneForm = this.formBuilder.group({
			phone: ['', [Validators.required, Validators.pattern("^((\\+1-?)|0)?[0-9]{10}$")]],
			id:['']
		});

	}

	get email() { return this.loginForm.get('email'); }
	get phone() { return this.phoneForm.get('phone'); }
	get loginFormControl() {
		return this.loginForm.controls;
	}
	get phoneverifyFormControl() {
		return this.phoneForm.controls;
	}
	email_username() {
		this.dataService.email_username(this.loginForm).subscribe(
			(response) => {
				//code
			})
	}
	sms_username()
	{
		this.dataService.sms_username(this.phoneForm).subscribe(
			(response:any) => {
				//code
			})
	}
	emailverify(){
		this.email_id = [];
		 this.basicfprofile_submitted = true;
	 if (this.loginForm.valid) { 
	 	if (localStorage.getItem("action") != null) {
		this.router.navigate(['/sign-in'])
		localStorage.clear();
		Swal.fire('Thank You...', 'Username sent to email successfully!', 'success')
		this.email_username();
		} else {

	 		this.dataService.emailverified(this.loginForm).subscribe((data: {}) => {
		 	this.email_id =data;
			
		  	localStorage.setItem('email', this.email_id.data );
      		this.router.navigate(['/email-verify'])
		  	Swal.fire('Check your email...', 'Verification code sent successfully!', 'success')
		 
    },
      (error) => { 
        this.serverErrors = error.error;

		Swal.fire({  
		  icon: 'error',  
		  title: 'Oops...',  
		  text: 'Email not found!',  
		  footer: ''  
		})  
      });
	}
	 }
	}
	mobileverify() {
		this.phone_number = [];
		this.phoneverify_submitted = true;
		if (this.phoneForm.valid) {
			if (this.phoneForm.valid) {
				if (localStorage.getItem("action") != null) {
					this.router.navigate(['/sign-in'])
					localStorage.clear();
					Swal.fire('Thank You...', 'Username sent to phone successfully!', 'success')
					this.sms_username();
					} else {
						this.dataService.mobileverifies(this.phoneForm).subscribe(
							(response) => {
								this.phone_number = response;

								localStorage.setItem('phone_number', this.phone_number.userphone);
								localStorage.setItem('email', this.phone_number.email);

								this.router.navigate(['/phone'])
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
			}
}

	// onchangeemail(){
	// 	$(".myemailset").prop("readonly",false);
	// 	this.show_upload_button=true;
	// 	this.show_mail_btn=false;
		
	// }
	emailverify_modal(event:any){
		// $(".myemailset").prop("readonly",true);
		
		
		var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(!regex.test(event)) {
		
		  }else{
			// this.show_upload_button=false;
			this.show_mail_btn=true;
			this.last_email=this.user;
			
			this.dataService.email_username_update(this.last_email,event).subscribe(res=>{
				this.myemail_data=res;
				if(this.myemail_data=='alreadyemail')
				{
					Swal.fire('Oops', 'Email already exists!', 'error')
				}
				else if(this.myemail_data=='fail')
				{
					Swal.fire('Oops', 'Unable to Update!', 'error')
				}
				else{
					localStorage.setItem('email',event );
					this.loginForm.controls.email.setValue(event);
					$('#closebutton_notes').trigger('click');
					Swal.fire('Email', 'Email update succesfully!', 'success')
				}

				

			},
				(error) => {
					this.serverErrors = error.error;

					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Not Update Email Id',
						footer: ''
					})
				})
		  }
		
		
	}
	onchangemobile(event:any){
		this.phoneForm.controls.phone.setValue(event);
		
	}
	Phoneverify_modal(event:any)
	{
		// $(".myphoneset").prop("readonly",true);
		this.dataService.phone_username_update(localStorage.getItem("phone"),event).subscribe(res=>{
			
			
			this.myemail_data=res;
			if(this.myemail_data=='alreadyemail')
			{
				Swal.fire('Oops', 'Phone number already exists!', 'error')
			}
			else if(this.myemail_data=='fail')
			{
				Swal.fire('Oops', 'Unable to update phone number!', 'error')
			}
			else{
				this.userphone = event;
				localStorage.setItem('phone',event );
				localStorage.setItem('phone_number',event );
				this.phoneForm.get("phone").setValue(event);
				$('#closebutton_phone').trigger('click');
				// this.show_update_mobile_button=false;
				// this.show_mobile_btn=true;
				Swal.fire('Phone Number', 'Phone update succesfully!', 'success')
			}

			

		},
			(error) => {
				this.serverErrors = error.error;

				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Not Update Phone Number',
					footer: ''
				})
			})
		
	
		
	}
	Cancelpopup(){
		$('#closebutton_notes').trigger('click');
		$('#closebutton_phone').trigger('click');
	}
	 
}
