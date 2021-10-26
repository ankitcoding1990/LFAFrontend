import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgForm, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quickstartquide',
  templateUrl: './quickstartquide.component.html',
  styleUrls: ['./quickstartquide.component.css']
})
export class QuickstartquideComponent implements OnInit {
  qsg:any;
  loggeduser_id:any;
  email:any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dataService: DataService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    if (localStorage.getItem("email") != null) {
      this.email = localStorage.getItem("email");
      this.loggeduser_id = localStorage.getItem("user_id");

    } else {
      this.router.navigate(['/sign-in'])
    }
    this.get_qsg();
  }
  get_qsg() {
    this.qsg = [];
    this.dataService.get_qsg_post(this.loggeduser_id).subscribe((data: {}) => {
      this.qsg = data;
    });
  }
}
