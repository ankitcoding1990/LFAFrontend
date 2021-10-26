import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
declare var $: any;
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Title } from "@angular/platform-browser";

@Component({
	selector: 'app-legal-plan',
	templateUrl: './legal-plan.component.html',
	styleUrls: ['./legal-plan.component.css']
})
export class LegalPlanComponent implements OnInit {
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
		this.getservicesbyid();
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
