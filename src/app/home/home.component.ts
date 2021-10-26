import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {Title} from "@angular/platform-browser";
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
import { SpinnerVisibilityService } from 'ng-http-loader';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
	
 guides:any = [];
 get_other_legal_details:any = [];
show_signup_section:boolean=true;
loggeduser_id:any;;
all_services: any;
	singleservice: any;
	id: any = [];
  constructor(private dataService: DataService,
	private titleService:Title,
	private router: Router,
	private route: ActivatedRoute,
	private spinner: SpinnerVisibilityService) {
	this.titleService.setTitle("lawforall | Get Affordable Accessible Legal Help");
  }
	ngOnInit() {
		this.spinner.show();
		this.spinner.hide();
		if (localStorage.getItem("email") != null) {
			this.show_signup_section=false;
		}
		if (localStorage.getItem("user_id") != null) {
			this.loggeduser_id=localStorage.getItem("user_id");
		}else{
			this.loggeduser_id=0;
		}

this.id = this.route.snapshot.params.id;
		this.getservices();
		//this.getservicesbyid();

		this.getguides();
	this.getotherlegalinterests();
	}

  getguides() {
    this.guides = [];
    this.dataService.getselfhelpguides(this.loggeduser_id).subscribe((data: {}) => {
          this.guides = data;
    });
  }
  getotherlegalinterests()
{
	this.get_other_legal_details= [];
		 this.dataService.get_othet_instdetail().subscribe((data: {}) => {
		  this.get_other_legal_details = data;
		
		  });
}
  movetoguide(id:any)
  {
		
  	if (localStorage.getItem("user_id") != null) {
  		
  		$('.selfhelpmove').trigger('click');
			//this.router.navigate(['guide-child-support/1'])	
		}else{
			this.router.navigate(['/sign-in'])
			
			
		}
  }
		getservices() {
		this.all_services = [];
		this.dataService.get_services().subscribe(
			(response) => {
				this.all_services = response.data;
			});
	}
	getservicesbyid() {
		this.spinner.show();
		this.singleservice = [];
		this.dataService.get_servicesbtid(this.id).subscribe((data: {}) => {
			this.spinner.hide();
			this.singleservice = data;
		})

	}
}
