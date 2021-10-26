import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import {Title} from "@angular/platform-browser";

declare var $: any;
@Component({
  selector: 'app-welcome-letter',
  templateUrl: './welcome-letter.component.html',
  styleUrls: ['./welcome-letter.component.css']
})
export class WelcomeLetterComponent implements OnInit {
userdetails:any = [];
user:any = [];
getuseractivity:any = [];
email:any;
loggeduser_id:any;
	profile_percentage:any;
hide_all_list:boolean=false;
showselfhelp:boolean=false;
showselfhelps:boolean=false;
showlegalresource:boolean=false;
showlegalresources:boolean=false;
showconsult:boolean=false;
showconsults:boolean=false;
showupdateprofile:boolean=false;
  constructor(
		private http: HttpClient,
		private titleService:Title,
		private dataService: DataService,
		 private router: Router,
		private spinner: SpinnerVisibilityService
		
	) {
		this.titleService.setTitle("lawforall | Quick Start Guide");
	}

  ngOnInit(): void {
	  this.spinner.show();
   this.spinner.hide();
	  if (localStorage.getItem("name") != null) {
			  this.user = localStorage.getItem("name");
			  this.email=localStorage.getItem("email");
			  this.loggeduser_id =localStorage.getItem("user_id");
			  this.checkuseractivity();
			  this.user_details();
			  this.check_userprofile_status();
		}else{
			this.router.navigate(['/sign-in'])
		}
		
  }
  user_details()
  {
	  	  this.userdetails = [];
		 this.dataService.getuserdetails(this.email).subscribe((data: {}) => {
		  this.userdetails = data;
		 })
  }
checkuseractivity()
  {
	     var data = {'page':'welcomeletter','user_id':this.loggeduser_id}; 
	    this.dataService.check_user_activity(data).subscribe(
	 (response) => {
		  this.getuseractivity = response.data;
		 
		  if(this.getuseractivity === 1)
		  {
			 
			  this.hide_all_list=false;
		  }else{
			 
			  this.hide_all_list=true;
		  }
		  
		 
	 });
  }
  check_userprofile_status()
  {
	   this.dataService.check_userprofile_status(this.loggeduser_id).subscribe(
	 (data) => {
		 	this.profile_percentage = data;
	
		  $(document).ready(function() {
			var value = $('#bar_value').val();
			$('.progress_bar').css({'width':value });

       });
	 });
  }
  movetoFunnel()
  {
  	if(localStorage.getItem('welcome-mail') == '0')
	{
  		this.dataService.sendwelcomemail(this.loggeduser_id).subscribe((data: {}) => {
    	});
		localStorage.setItem('welcome-mail','1');
	}
  }
  movetoFunnels()
  {
	  console.log('movetoFunnels');
	if(localStorage.getItem('welcome-mail') == '0')
	{
  		this.dataService.sendwelcomemail(this.loggeduser_id).subscribe((data: {}) => {
    	});
	
		localStorage.setItem('welcome-mail','1');
	}
	this.router.navigate(['/update-case-detail'])
  }
}
