import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import {Title} from "@angular/platform-browser";
import { SpinnerVisibilityService } from 'ng-http-loader';
declare var $: any;
@Component({
  selector: 'app-summary-profile',
  templateUrl: './summary-profile.component.html',
  styleUrls: ['./summary-profile.component.css']
})
export class SummaryProfileComponent implements OnInit {
userdetails:any;
email:any;
future_goal:any;
past_work:any;
get_qsg_status:any;
get_user_legaldetails:any;
getuserfamilydetails:any;
userprofessionaldetails:any;
getuserpetsdetails:any;
getuserinstdetails:any;
userotherlegaldetails:any;
incomedetails:any;
loggeduser_id:any;
getuseractivity:any = [];
getuserprofilescore:any = [];
showselfhelp:boolean=false;
showlegalresource:boolean=false;
showconsult:boolean=false;
showupdateprofile:boolean=false;
profile_percentage:any;
qsg:any;
past_work_sort:any;
dataArr:any;
 imagepath:any;
  constructor(
    private formBuilder: FormBuilder,
		private http: HttpClient,
		private dataService: DataService,
		 private router: Router,
		 private titleService:Title,
		private spinner: SpinnerVisibilityService

	) {this.titleService.setTitle("lawforall | Summary QSG");}

  ngOnInit(): void {
	    this.spinner.show();
   this.spinner.hide();
	if (localStorage.getItem("email") != null) {
			this.email=localStorage.getItem("email");
			this.loggeduser_id =localStorage.getItem("user_id");
			
		}else{
			this.router.navigate(['/sign-in'])
		}
		sessionStorage.removeItem("self_help_dashboard");
	  this.userdetails = [];
		 this.dataService.getuserdetails(this.email).subscribe((data: {}) => {
		  this.userdetails = data;
		 });

		 this.get_qsg_with_status();
  }
 get_user_legal_details(){
	this.get_user_legaldetails = [];
		 this.dataService.get_user_legal_details(this.loggeduser_id).subscribe((data: {}) => {
		  this.get_user_legaldetails = data;
		});
 }
 //get family details
getuserfamily(){
this.getuserfamilydetails = [];
		 this.dataService.getuserfamilydetail(this.loggeduser_id).subscribe((data: {}) => {
		  this.getuserfamilydetails = data;

		  });
}
 getuserincomedetails(){
	this.incomedetails = [];
		 this.dataService.getuserincomedetails(this.loggeduser_id).subscribe((data: {}) => {
		  this.incomedetails = data;
		 });
}
get_user_past_work()
{
 this.past_work = [];
 	this.past_work_sort =[];
   this.dataService.get_user_past_work(this.loggeduser_id).subscribe((data: {}) => {
     this.past_work = data;
   		this.past_work_sort = data;
   });
}
get_user_future_goal()
{
	this.future_goal = [];
		this.dataService.get_user_future_goal(this.loggeduser_id).subscribe((data: {}) => {
			this.future_goal = data;

		});
}
getprofessiondetails(){
	this.userprofessionaldetails = [];
		 this.dataService.getuserprofessiondetails(this.loggeduser_id).subscribe((data: {}) => {
		  this.userprofessionaldetails = data;
		 });
}
  //pet details
getpetdetais()
{
	this.getuserpetsdetails = [];
		 this.dataService.getuserpetsdetail(this.loggeduser_id).subscribe((data: {}) => {
		  this.getuserpetsdetails = data;

		  });
}
get_Selected_interest()
 {
	 this.getuserinstdetails = [];
		 this.dataService.getuserinstdetail(this.loggeduser_id).subscribe((data: {}) => {
		  this.getuserinstdetails = data;
		 });
}
get_other_vertical()
{
	this.userotherlegaldetails = [];
		 this.dataService.getuserotherlegaldetails(this.loggeduser_id).subscribe((data: {}) => {
		  this.userotherlegaldetails = data;
		 });
}
get_qsg()
{

	this.qsg = [];
  this.dataService.get_qsg_post(this.loggeduser_id).subscribe((data: {}) => {
	this.qsg = data;	
	      this.spinner.hide();
	  });
}

get_qsg_with_status()
{
	this.get_qsg_status = [];
		 this.dataService.get_qsg_post(this.loggeduser_id).subscribe((data: {}) => {
			 console.log(data);
		  this.get_qsg_status = data;
		});
}
checkuseractivity()
  {
	     var data = {'page':'welcomeletter','user_id':this.loggeduser_id};
	    this.dataService.check_user_activity(data).subscribe(
	 (response) => {
		  this.getuseractivity = response.page_status;
		  this.getuserprofilescore = response.data;
	
		  if(this.getuseractivity.legalresources === 1)
		  {
			  this.showlegalresource=true;
		  }
		  if(this.getuseractivity.selfhelpguide === 1)
		  {
			  this.showselfhelp=true;

		 }
		  if(this.getuseractivity.showconsult === 1)
		  {
			  this.showconsult=true;
		  }
		  if(this.getuseractivity.getuserprofilescore === 1)
		  {
			  this.showupdateprofile=false;
		  }
		  if(this.getuseractivity.getuserprofilescore === 0)
		  {
			  this.showupdateprofile=true;
		  }
		
	 });
  }
  redirectdashboard()
  {
  	var value = $('#bar_value').val();
  	if(value == "100%")
  	{
  this.router.navigate(['/dashboard'])
  	}else{
  			  Swal.fire({
	  title: 'Looks like there is some missing information',
	  text: "Would you like to fill this in or proceed?",
	  icon: 'warning',
	  showCancelButton: true,
	  cancelButtonText: 'Go back to Quick Start Guide',
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Continue to Dashboard!'
	}).then((result) => {
	  if (result.isConfirmed) {
	   this.router.navigate(['/dashboard'])
	  }else{

	  this.router.navigate(['/summary-profile'])
  }
})
  	}

  }
  check_userprofile_status()
{
	this.profile_percentage = [];
	this.profile_percentage = [];
	this.dataService.check_userprofile_status(this.loggeduser_id).subscribe((data: {}) => {
	this.profile_percentage = data;

		  $(document).ready(function() {
			var value = $('#bar_value').val();
			if(value == "90%")
			{
				$('#complete_img').show();
				$('#process_img').hide();

			}
			$('.progress_bar').css({'width':value });

       });
		  });
}
getCirdataData()
    {
   
      this.dataService.getCirdata_doc(this.loggeduser_id).subscribe((res:any)=>{
       
        this.dataArr=res.data;
        // this.stringObject = JSON.parse(this.stringJson);
        this.imagepath=res.path;

      })
    }
}
