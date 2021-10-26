import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
declare var $: any;
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(
    private titleService: Title
    ) {
  this.titleService.setTitle("lawforall | Faq"); }

  ngOnInit(): void {
  }
  
}