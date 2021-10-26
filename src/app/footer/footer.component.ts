import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  hide_feedback_button: boolean = true

  ngOnInit(): void {
    setInterval(() => {
      this.hide_feedback_button =  (localStorage.getItem('name') == null) ? true : false;
    }, 1000);
  }

close_cal()
{
    console.log('Modal','aaaa');
    $('.bd-example-modal-lg').modal('hide');

}
}
