import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { FormControl, FormBuilder ,Validators } from '@angular/forms';
import {Title} from "@angular/platform-browser";
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';
declare var $: any;
@Component({
  selector: 'app-update-case-detail',
  templateUrl: './update-case-detail.component.html',
  styleUrls: ['./update-case-detail.component.css']
})
export class UpdateCaseDetailComponent implements OnInit {
qsg:any;
email:any;
loggeduser_id:any;
get_user_legaldetails:any;
update_case_data:boolean=false;
CirPdfForm:any;
select_language:any="";
show_language=false;
show_meter=true;
show_issue=false;
mycirdetail=false;
shownxt=false;
get_other_legal_details:any;
get_sub_interests:any;
cirpdf_submitted:boolean=false;
get_user_cirdetails:any;
userlegaldetails:any;
show_blank_cir:boolean=false;
upload_cir:boolean=false;
toggle = true;
toggle1 = true;
currentdate:any;
get_user_cirhistory:any;
serverErrors = [];
notes_cal_section:boolean=false;
footer_button:boolean=true;
legal_issue_show:boolean=true;
  constructor(
    private formBuilder: FormBuilder,
		private http: HttpClient,
		private dataService: DataService,
		 private router: Router,
		 		 private titleService:Title,
		private spinner: SpinnerVisibilityService,
		public LoginService: LoginService
		
	) {this.titleService.setTitle("lawforall | Complete Case Details");}

  ngOnInit(): void {
	   this.spinner.show();
   		this.spinner.hide();
		console.log('Local stored email',localStorage.getItem("email"));
		if (localStorage.getItem("email") != null) {
			this.email=localStorage.getItem("email");
			this.loggeduser_id =localStorage.getItem("user_id");
			console.log('If',localStorage.getItem("user_id"));
			this.LoginService.isLoggedIn.next({ status: '1' });
	
		}else{
			console.log('Else-','Else');
			this.router.navigate(['/sign-in'])
		}
	if(sessionStorage.getItem('case') != null)
	{
		this.notes_cal_section=true;
		this.footer_button=false;
		sessionStorage.removeItem('case');

	}else{
		this.footer_button=true;
		this.notes_cal_section=false;
	}
		this.CirPdfForm = this.formBuilder.group({
			user_id: [this.loggeduser_id, Validators.required],
			type: ['',Validators.required],
			main_legal_vertical: ['',Validators.required],
			sub_legal_vertical: ['',Validators.required],
		});
		
		this.get_user_legal_details();
		// this.get_qsg();
		this.getotherlegalinterests();
		 this.get_legal_deetails();
		 this.get_download_history();
  }
  get_legal_deetails()
  {
	this.userlegaldetails = [];
	this.dataService.getsingleuserlegaldetails(this.loggeduser_id).subscribe((data: {}) => {
		this.userlegaldetails = data;
		if (this.userlegaldetails.data.legal_type === '' || this.userlegaldetails.data.legal_type === null)
		{
			this.CirPdfForm.get("main_legal_vertical").patchValue("");	
		}else{
			sessionStorage.setItem('legalset','yes');
			this.CirPdfForm.get("main_legal_vertical").patchValue(this.userlegaldetails.data.legal_type);	
			this.CirPdfForm.get("sub_legal_vertical").patchValue(this.userlegaldetails.data.legal_issue);	
		}
	})
  }
  get cirpdf_FormControl() {
		return this.CirPdfForm.controls;
	}
	getotherlegalinterests() {
		this.get_other_legal_details = [];
		this.dataService.get_othet_instdetail().subscribe((data: {}) => {
			this.get_other_legal_details = data;
	});
	
	}
   get_user_legal_details(){
	this.get_user_legaldetails = [];
		 this.dataService.get_user_legal_details(this.loggeduser_id).subscribe((data: {}) => {
		  this.get_user_legaldetails = data;
		
		}); 
 }
 onChange_other_interests(event: any) {
		this.get_sub_interests = [];
		this.dataService.get_sub_legal_interests(event).subscribe(
			(response) => {
				if(sessionStorage.getItem('legalset') == null)
				{
					this.CirPdfForm.get("sub_legal_vertical").patchValue('');	
				}
				sessionStorage.removeItem('legalset');
				// this.show_meter=false;
				// this.show_issue=true;
				this.get_sub_interests = response.data;
				if(response.display == "none")
				{
					this.legal_issue_show=false;
					sessionStorage.setItem('legalissuehide','now');
				}else{
					this.legal_issue_show=true;
				}
			});
	}
get_qsg()
{
	
	this.qsg = [];
	
  this.dataService.get_qsg_post(this.loggeduser_id).subscribe((data: {}) => {
	this.qsg = data;
	      this.spinner.hide();
			
	
		  });
}
get_cir_pdf()
{
		this.cirpdf_submitted=true;
	if(this.CirPdfForm.valid)
	{

	this.get_user_cirdetails = [];
		this.dataService.get_cir_pdf(this.CirPdfForm).subscribe((data: {}) => {
				 this.get_user_cirdetails = data;
				 //alert(this.get_user_cirdetails.result.id)
				// $('.downloadbtn').trigger('click');
				this.downloadcirpdf(this.get_user_cirdetails.result.id,this.get_user_cirdetails.result.file_name);
				this.save_download_history(this.get_user_cirdetails.result);
		
		})
	
		
	}
}
save_download_history(data:any)
{
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
  this.currentdate = yyyy + '' + mm + '' + dd;
	if(data.id == "")
	{
		var name="nofound.pdf"
	}else{
		if(data.language == "English")
		{
			var lang ="EN";
		}else{
			var lang ="SP";
		}
		var legal_matter = data.legal_issue.replace(' ', '').toLowerCase();
		var name = 'CIR_'+legal_matter+'_'+lang+'_'+this.currentdate+'.pdf'
		
	}
		
		this.dataService.save_download_history(data,this.loggeduser_id).subscribe((data: {}) => {
				 this.writeContents(data, name, 'application/pdf');
				 this.get_download_history();
				}, (error) => {
					this.serverErrors = error.error;
					Swal.fire({
						icon: 'warning',
						title: 'No file Found!',
					})
				})

}
get_download_history()
{
		this.get_user_cirhistory = [];
	this.dataService.get_download_history(this.loggeduser_id).subscribe((data: {}) => {
				this.get_user_cirhistory= data;
				})
}
selectlanguages(e:any)
{
	
	$('.downloadbtn').trigger('click');
}
 selectnextbtn(data:any){
	if(data=='nxteng')
	{
		this.show_language=true;
		this.show_meter=false;
		this.show_issue=false;
	}
	if(data=='nextissue')
	{
		this.show_meter=true;
		this.show_issue=false;
	}
	if(data=='nxtmater')
	{
		this.show_issue=true;
		this.show_language=false;
		this.show_meter=false;
		this.mycirdetail=false;
	}

  }
  prevselectnextbtn(data:any)
  {

	
  }
  writeContents(content:any, fileName:any, contentType:any) {
  	const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
  downloadcirpdf(id:any,data:any)
  {

  	 		
  // 	if(data == "")
  // 	{
  // 		Swal.fire({
		// 	icon: 'warning',
		// 	title: 'No file Found!',
		// })
  		
  // 	}
  // 	if(data == "https://reporting.lawforall.com/portal/storage/app/public/media/AdultGuardianshipCIR_1616147971.pdf")
  // 	{
 	
  // 	var url="/assets/cir/AdultGuardianshipCIR_1616147971.pdf"
  // 		$('.adoptioncir').attr('download', 'Ciradultguardianshipen_'+this.currentdate+'.pdf') 
  //              .attr('href', url)                     
  //      	$('.adoptioncir')[0].click();    
  // 	}
  // 	if(data == "https://reporting.lawforall.com/portal/storage/app/public/media/Adoption CIR_1616148062.pdf")
  // 	{
  // 		var url="/assets/cir/Adoption CIR_1616148062.pdf"
  // 			$('.adultcir').attr('download', 'Ciradoptionen_'+this.currentdate+'.pdf') 
  //              .attr('href', url)                     
  // 		$('.adultcir')[0].click();  	
  // 	}
  // 	if(data == "https://reporting.lawforall.com/portal/storage/app/public/media/CIR_1618487198.pdf")
  // 	{
  // 		var url="/assets/cir/CIR_1618487198.pdf"
  // 			$('.childcir').attr('download', 'Circhildcustodyen_'+this.currentdate+'.pdf') 
  //              .attr('href', url)   
  // 		$('.childcir')[0].click();  	
  // 	}

       // var file = new Blob([data], { type: 'application/pdf' })
       //    var fileURL = window.URL.createObjectURL(file);
       //    // window.open(fileURL); 
       //    var a         = document.createElement('a');
       //    a.href        = fileURL; 
       //    a.download    = 'cir.pdf';
       //    document.body.appendChild(a);
       //    a.click();
        
  }
  show_download_upload(e:any)
  {
  	if(e.target.value ==  "download")
  	{
  		this.show_blank_cir=true;
  		this.upload_cir=false;
  	}else{
  		this.show_blank_cir=false;
  		this.upload_cir=true;
  	}
  }
}
