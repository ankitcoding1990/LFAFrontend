import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-profiletabs',
  templateUrl: './profiletabs.component.html',
  styleUrls: ['./profiletabs.component.css']
})
export class ProfiletabsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  show_button_success()
   {
    $(".sucessbtndummary").show();
   }
   show_button_hide()
   {
    $(".sucessbtndummary").hide();
   }
}
