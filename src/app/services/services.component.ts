import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
declare var $: any;
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Title } from "@angular/platform-browser";
@Component({
	selector: 'app-services',
	templateUrl: './services.component.html',
	styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

	all_services: any;
	singleservice: any;
	id: any = [];
	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private route: ActivatedRoute,
		private titleService: Title,
		private dataService: DataService,
		private router: Router,
		private spinner: SpinnerVisibilityService

	) {
		this.titleService.setTitle("lawforall | Services");
	}

	ngOnInit(): void {
		this.spinner.show();
		this.spinner.hide();
		this.id = this.route.snapshot.params.id;
		this.getservices();
		this.getservicesbyid();
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
