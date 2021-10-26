import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import {Title} from "@angular/platform-browser";
import { SpinnerVisibilityService } from 'ng-http-loader';
declare var $: any;
@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  privacy_policy :any ="";
  constructor( private http: HttpClient,
		private titleService:Title,
    private dataService: DataService,
    private spinner: SpinnerVisibilityService) { 
	this.spinner.show();
      this.titleService.setTitle("lawforall | Privacy Policy");
  }

  ngOnInit(): void {
	  if (localStorage.getItem("privacy") != null) {
			 localStorage.removeItem('privacy')
		}

    this.spinner.show();
    this.spinner.hide();
    this.dataService.getWebsiteContent("privacy-policy").subscribe((data: {}) => {
		  this.privacy_policy = data;
		 })
  }

}
