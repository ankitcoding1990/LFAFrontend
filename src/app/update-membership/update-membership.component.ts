import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import { SpinnerVisibilityService } from 'ng-http-loader';
import {Title} from "@angular/platform-browser";
declare var $: any;
@Component({
  selector: 'app-update-membership',
  templateUrl: './update-membership.component.html',
  styleUrls: ['./update-membership.component.css']
})
export class UpdateMembershipComponent implements OnInit {

show:boolean=false;
showcheckbox:boolean=false;
loggeduser_id:any;
userphonedetails:any;
queryForm:any;
serverErrors = [];
getuseractivity:any = [];
 constructor(
    private formBuilder: FormBuilder,
		private http: HttpClient,
			private titleService:Title,
		private dataService: DataService,
		 private router: Router,
	private spinner: SpinnerVisibilityService
		
	) {
		this.titleService.setTitle("lawforall | Update Membership");
	}

 ngOnInit(): void {
	  this.spinner.show();
	this.spinner.hide();
	if (localStorage.getItem("email") != null) {

			this.loggeduser_id =localStorage.getItem("user_id");
			
		}else{
			this.router.navigate(['/sign-in'])
		}
		
		this.queryForm = this.formBuilder.group({
            date: ['', Validators.required],
            phone: ['', Validators.required],
            user_id: ['', Validators.required],
		});
		this.checkuseractivity();
  }
	showdiv(){
$(document).ready(function() {
 $('.imready').addClass('activebutton');
 $('.scheduleanapp').removeClass('activebutton');
 $('.notready').removeClass('activebutton');
});
		this.show =true;
		this.showcheckbox =false;
	}
	showsdiv(){
$(document).ready(function() {
 $('.scheduleanapp').addClass('activebutton');
 $('.imready').removeClass('activebutton');
 $('.notready').removeClass('activebutton');
});
		this.show =true;
		this.showcheckbox =false;
	}
	closediv(){
 $('.imready').removeClass('activebutton');
 $('.scheduleanapp').removeClass('activebutton');
 $('.notready').removeClass('activebutton');
		this.show =false;
		this.showcheckbox =false;
	}
	checkuseractivity()
  {
	  this.userphonedetails=[];
	     var data = {'page':'consultpage','user_id':this.loggeduser_id}; 
	    this.dataService.check_user_activity(data).subscribe(
	 (response) => {
		 this.getuseractivity = response.data;
		 this.userphonedetails=response.user_phone;
		 console.log(this.userphonedetails);
		 this.queryForm.get('phone').setValue(this.userphonedetails);
		 this.queryForm.get('user_id').setValue(this.loggeduser_id);
	 });
  }
  savequery()
  {
	  this.dataService.Consult_query_save(this.queryForm).subscribe(
	 (response) => {
		  this.show =false;
		 Swal.fire('Congratulations !', 'You have Completed the Quick Start Guide Succesfully!', 'success')
		   this.router.navigate(['/dashboard']);
	 } ,(error) => { 
        this.serverErrors = error.error;
		Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: 'Something went wrong!',  
      footer: ''  
    })  
      })
  }
  dashboard()
  {
	  Swal.fire('Congratulations !', 'You have completed the Quick Start Guide successfully. You are on the road to success! Please double check your work to confirm you are happy with your information.You can update your information at any time by going to My Account > Update Profile', 'success')
		   this.router.navigate(['/summary-profile']);
  }
  showcheckboxs(){
$(document).ready(function() {
 $('.notready').addClass('activebutton');
 $('.imready').removeClass('activebutton');
 $('.scheduleanapp').removeClass('activebutton');
});
		this.showcheckbox =true;
	this.show =false;
	}
}

