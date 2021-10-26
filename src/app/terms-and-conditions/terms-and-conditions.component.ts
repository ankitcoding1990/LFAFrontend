import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import {Title} from "@angular/platform-browser";
import { SpinnerVisibilityService } from 'ng-http-loader';
declare var $: any;
@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {
  terms_and_conditions :any ="";
  constructor( private http: HttpClient,
		private titleService:Title,
    private dataService: DataService,
    private spinner: SpinnerVisibilityService) { 
      this.titleService.setTitle("lawforall | Terms And Conditions");
  }

  ngOnInit(): void {
   if (localStorage.getItem("terms") != null) {
			 localStorage.removeItem('terms')
		}
    this.dataService.getWebsiteContent("terms-and-conditions").subscribe((data: {}) => {
		  this.terms_and_conditions = data;
      this.spinner.hide();
		 })
  }

}
