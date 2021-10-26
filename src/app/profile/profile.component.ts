import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
  	 private titleService:Title,
	  private router: Router,
  ) {
this.titleService.setTitle("lawforall | My Account");
	  }

  ngOnInit(): void {
	  if (!localStorage.getItem("email")) {
			this.router.navigate(['/sign-in'])
		}
  }

}
