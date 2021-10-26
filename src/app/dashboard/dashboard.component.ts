import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Title } from "@angular/platform-browser";
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    email: any;
    loggeduser_id: any;
    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private dataService: DataService,
        private router: Router,
        private titleService: Title,
        private spinner: SpinnerVisibilityService

    ) {
        this.titleService.setTitle("lawforall | Dashboard");

    }
    ngOnInit() {
        
        this.spinner.show();
          this.spinner.hide();
        $(".hidepgeqsg").css("display", "none");
        $(".col-lg-9.col-md-9").css("max-width", "100%");
        if (localStorage.getItem("email") != null) {
            this.email = localStorage.getItem("email");
            this.loggeduser_id = localStorage.getItem("user_id");

        } else {
            this.router.navigate(['/sign-in'])
        }
        if (sessionStorage.getItem("movetosummary") != null) {
            $('#v-pills-summary-tab').trigger('click');
            sessionStorage.removeItem("movetosummary");
        }
    }

}
