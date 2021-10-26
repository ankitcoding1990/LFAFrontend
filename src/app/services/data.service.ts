import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable} from 'rxjs';
/*const endpoint = 'http://localhost/portal-clone/api/';
const secureendpoint = 'http://localhost/portal-clone/api/auth/';
const endpoint2 = 'http://localhost/portal-clone/api/';
*/
const endpoint = 'https://reporting.lawforall.com/portal/api/';
const secureendpoint = 'https://reporting.lawforall.com/portal/api/auth/';
const endpoint2 = 'https://reporting.lawforall.com/portal/api/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json,application/x-www-form-urlencoded,multipart/form-data',
	'Access-Control-Request-Headers':'access-control-allow-origin,Content-type'
  })
};

@Injectable({
  providedIn: 'root'
})

export class DataService {
  // uploadcir_profile(formdata: FormData) {
  //   throw new Error('Method not implemented.');
  // }
  
  check_login_password(data: any): Observable<any> {
    return this.http.post(endpoint + 'login-password',{data:data})
  }
	access_token:any;
	header:any;
	constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
	 // self help guide
  getselfhelpguides(id:any): Observable<any> {
    return this.http.get(endpoint + 'selfthelpguide/' + id)
  }
  	getguideyid(id: any): Observable<any> {
    return this.http.post(endpoint + 'getguidebyid',{id:id})
  }
 
  // signup 
  save_singup(form: any): Observable<any> {
    return this.http.post(endpoint + 'create_account',form.value)
  }
  
  // get non buyer user data
  
 	getuserdata(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'getuserdata', {user_id:user_id})
  }
  
  // email & phone verify
	emailverified(form: any): Observable<any> {
    return this.http.post(endpoint + 'verifyemail', form.value)
  }
  emailotpverify(form: any): Observable<any> {
    return this.http.post(endpoint + 'verifyotp', form.value)
  }
  mobileverifies(form: any): Observable<any> {
    return this.http.post(endpoint + 'verify_mobile', form.value)
  }
 verify_mobile_otp(form: any): Observable<any> {
    return this.http.post(endpoint + 'verify_mobile_otp', form.value)
  }
  email_username(form: any): Observable<any> {
    return this.http.post(endpoint + 'email_username', form.value)
  }  
   sms_username(form: any): Observable<any> {
    return this.http.post(endpoint + 'sms_username', form.value)
  }  
// change password
    changepass(form: any): Observable<any> {
    return this.http.post(endpoint + 'change_password', form.value)
  }  
  
  // update complete  profile tabls
  
  updatebasicprofile(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'update_basicprofile_non_buyer', form.value)
  }
  updateuserlncome(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'user_income_details', form.value)
  }
  updatelegalissueForm(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'legal_details', form.value)
  } 
  updateprofessiondetails(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'user_profession_details', form.value)
  }

  updateothtlegalinterest(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'user_othtlegalinterest_details', form.value)
  }
  getuserdetails(email: any): Observable<any> {
    return this.http.post(secureendpoint + 'getuserdetails',{email:email})
  }
  
  // get list of cir pdf files 
   getcirprofile(): Observable<any> {
    return this.http.get(secureendpoint + 'cirprofile')
  } 
  // get list of all services
   get_services(): Observable<any> {
    return this.http.get(secureendpoint + 'get_services')
  } 
  // get list of all qsg
   sendwelcomemail(user_id:any): Observable<any> {
    return this.http.get(endpoint + 'send_welcome_mail/' + user_id)
  } 
  send_welcome_mail_after_email_verification(data:any): Observable<any> {
    return this.http.post(endpoint + 'send_welcome_mail_after_email_verification',{data : data})
  }
   get_qsg(): Observable<any> {
    return this.http.get(secureendpoint + 'get_QSG')
  } 
    get_qsg_post(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_qsg_post',{user_id:user_id})
  }
  getlegalresourcesstates(): Observable<any> {
    return this.http.get(secureendpoint + 'getlegalresourcestates')
  }
 delete_note(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'delete_note',{id:id})
  }
  delete_cir_doc(id: any): Observable<any> {
    return this.http.post(endpoint + 'delete_cir_doc',{id:id})
  }
  delete_cir_doc_filenotes(id: any): Observable<any> {
    return this.http.post(endpoint + 'delete_cir_doc_filenotes',{id:id})
  }

  getuserincomedetails(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'getincomebyuserid',{user_id:user_id})
  }
  get_qsg_with_status(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_qsg_with_status',{user_id:user_id})
  }
 getuserlegaldetails(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'getuserlegaldetails',{id:id})
  }
  getsingleuserlegaldetails(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'getsingleuserlegaldetails',{id:id})
  }
 
 
 getuserotherlegaldetails(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'getuserotherlegaldetails',{user_id:user_id})
  }

getuserprofessiondetails(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'getuserprofessiondetails',{user_id:user_id})
  }
  getselectedlegalissuepdf(legal_type: any,user_id:any): Observable<any> {
    return this.http.post(secureendpoint + 'getselectedlegalissuepdf',{legal_type:legal_type,user_id:user_id})
  }
  getselectedstatebuttons(state_id: any,user_id:any): Observable<any> {
    return this.http.post(secureendpoint + 'getselectedstatebuttons',{state_id:state_id,user_id:user_id})
  } 

  get_servicesbtid(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_servicesbtid',{id:id})
  } 
  delete_legal_details_byid(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'delete_legal_details_byid',{id:id})
  } 
  delete_other_legal_details_byid(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'delete_other_legal_details_byid',{id:id})
  } 
  

 
   getotherlegaldetailsbyid(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'getotherlegaldetailsbyid',{id:id})
  } 
  get_user_legal_details(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_user_legal_details',{user_id:user_id})
  } 
  get_sub_legal_interests(event: any): Observable<any> {
    return this.http.post(endpoint + 'get_sub_legal_verticals',{event:event})
  }


  update_user_other_legals_details(data: any): Observable<any> {
    return this.http.post(secureendpoint + 'update_user_other_legals_details',{data:data})
  } 
  check_user_activity(data: any): Observable<any> {
    return this.http.post(secureendpoint + 'check_user_activity',{data:data})
  }
  check_userprofile_status(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'check_userprofile_status',{user_id:user_id})
  }
   update_userprofile_summary(data: any): Observable<any> {
    return this.http.post(secureendpoint + 'update_userprofile_summary',{data:data})
  }
  // other interests details
  get_othet_instdetail(): Observable<any> {
    return this.http.get(endpoint + 'get_legal_verticals')
  }
  get_other_parentnull(): Observable<any> {
    return this.http.get(secureendpoint + 'get_other_parentnull')
  }
  // cir profile
   uploadpdffile(data: any): Observable<any> {
    return this.http.post(secureendpoint + 'uploadcirpdf',data)
  }
  
  // fmaily details
   deletefamilymember(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'delete_family_member',{id:id})
  }
   getuserfamilydetail(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'getuserfamilydetails',{user_id:user_id})
  }
  update_family_member_details(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'update_family_member_details',form.value)
  } 
  get_all_family_note(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_all_family_notes',{id:id})
  }
   editfamilymember(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'edit_family_member',{id:id})
  } 
  get_family_notes(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_family_member_notes',{id:id})
  } 
  updateuserfamilydetails(addresses: any,user_id:any): Observable<any> {
    return this.http.post(secureendpoint + 'nonbuyer_family_details',{addresses:addresses,user_id:user_id})
  }
  // legal details
  get_legal_resurce_buttons(id:any): Observable<any> {
    return this.http.get(secureendpoint + 'get_legal_resurce_buttons/' + id)
  }
  update_user_legals_details(data: any): Observable<any> {
    return this.http.post(secureendpoint + 'update_user_legals_details',{data:data})
  }

  // pet details
   get_all_pet_note(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_all_pet_notes',{id:id})
  } 
  get_all_doc_notes(data: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_all_doc_notes',{data:data})
  } 
  update_single_pet_details(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'update_single_pet_details',form.value)
  }
    update_user_pets_details(data: any): Observable<any> {
    return this.http.post(secureendpoint + 'update_user_pets_details',{data:data})
  }
  update_pet_note(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'update_pet_note',form.value)
  }
  deletepet(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'delete_pet',{id:id})
  } 
    get_pet_notes(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_pet_notes',{id:id})
  } 
  get_single_pet_details(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_single_pet_details',{id:id})
  } 
  getuserpetsdetail(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'getuser_pet_sdetail',{user_id:user_id})
  } 
  // consult query 
  Consult_query_save(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'consult_query_save',form.value)
  }
  
  
  
  // get state list form basic profile
	get_state_list(): Observable<any> {
    return this.http.get(	endpoint + 'get_state_list')
  }

  
  // interests
    getuserinstdetail(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'getuserinsterstdetail',{user_id:user_id})
  }
   get_all_interests(): Observable<any> {
    return this.http.get(secureendpoint + 'getAllInterests')
  }
  get_interests(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_interests',{user_id:user_id})
  }
  Add_new_interest(data: any): Observable<any> {
    return this.http.post(secureendpoint + 'Add_new_interest',{data:data})
  }
    updateinterestdetails(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'user_interest_details', form.value)
  }
   remove_all_interest(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'remove_all_interest',{user_id:user_id})
  }
    remove_interests(data: any): Observable<any> {
    return this.http.post(secureendpoint + 'remove_interests',{data:data})
  } 
    save_checked_interest(data: any): Observable<any> {
    return this.http.post(secureendpoint + 'save_checked_interest',{data:data})
  } 
  // website content
  getWebsiteContent(data: any): Observable<any> {
    return this.http.get(endpoint + 'get_website_content/'+data)
  }

// past work & furure goal
  
  save_past_work(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'save_past_work', form.value)
  } 
  save_future_goal(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'save_future_goal', form.value)
  }  
  get_user_past_work(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_user_past_work',{user_id:user_id})
  }
  get_user_future_goal(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_user_future_goal',{user_id:user_id})
  }
	 delete_future_goal(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'delete_future_goal',{id:id})
  }
  delete_past_work(id: any): Observable<any> {
    return this.http.post(secureendpoint + 'delete_past_work',{id:id})
  }
  get_funnel_checklist(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_funnel_checklist',{user_id:user_id})
  }
  // submit_feedback

  submit_feedback(data: any): Observable<any> {
    return this.http.post(secureendpoint + 'submit_feedback', {data:data})
  } 

  //funnel api
    get_user_funnel_details(user_id: any): Observable<any> {
    return this.http.post(secureendpoint + 'get_user_funnel_details',{user_id:user_id})
  }
    update_user_funnel(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'update_user_funnel', form.value)
  }
  update_user_legal_funnel(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'update_user_legal_funnel', form.value)
  } 

  submitCirClientInformation(form: any): Observable<any> {
    return this.http.post(endpoint + 'submitCirClientInformation', form.value)
  } 
   submitCirMarriageSeparation(form: any): Observable<any> {
    return this.http.post(endpoint + 'submitCirMarriageSeparation', form.value)
  } 
   submitCirOpposingPartyInfo(form: any): Observable<any> {
    return this.http.post(endpoint + 'submitCirOpposingPartyInfo', form.value)
  } 
  submitCirChildren(form: any): Observable<any> {
    return this.http.post(endpoint + 'submitCirChildren', form.value)
  } 
  submitChildrenLivingSituation(form: any): Observable<any> {
    return this.http.post(endpoint + 'submitChildrenLivingSituation', form.value)
  }
   submitCirDeclaration(form: any): Observable<any> {
    return this.http.post(endpoint + 'submitCirDeclaration', form.value)
  }
   submitCirFinancialInformation(form: any): Observable<any> {
    return this.http.post(endpoint + 'submitCirFinancialInformation', form.value)
  }
     submitCirMonthlyIncome(form: any): Observable<any> {
    return this.http.post(endpoint + 'submitCirMonthlyIncome', form.value)
  }
    submitCirMonthlyDeductions(form: any): Observable<any> {
    return this.http.post(endpoint + 'submitCirMonthlyDeductions', form.value)
  }
  submitCirClientLivingSituation(form: any): Observable<any> {
    return this.http.post(endpoint + 'submitCirClientLivingSituation', form.value)
  }
  submitCirHealthInsurance(form: any): Observable<any> {
    return this.http.post(endpoint + 'submitCirHealthInsurance', form.value)
  }
  submitCirAssets(form: any): Observable<any> {
    return this.http.post(endpoint + 'submitCirAssets', form.value)
  }
  submitCirDebts(form: any): Observable<any> {
    return this.http.post(endpoint + 'submitCirDebts', form.value)
  }
  getCirClientInformation(user_id:any): Observable<any> {
    return this.http.get(endpoint + 'getCirClientInformation/' + user_id)
  }
   getCirMarriageSeparation(user_id:any): Observable<any> {
    return this.http.get(endpoint + 'getCirMarriageSeparation/' + user_id)
  }
   getCirOpposingPartyInfo(user_id:any): Observable<any> {
    return this.http.get(endpoint + 'getCirOpposingPartyInfo/' + user_id)
  }
   getCirChildren(user_id:any): Observable<any> {
    return this.http.get(endpoint + 'getCirChildren/' + user_id)
  }
 getSingleCirChild(id:any): Observable<any> {
    return this.http.get(endpoint + 'getSingleCirChild/' + id)
  }
   getChildrenLivingSituation(id:any): Observable<any> {
    return this.http.get(endpoint + 'getChildrenLivingSituation/' + id)
  }
    getSingleChildrenLivingSituation(id:any): Observable<any> {
    return this.http.get(endpoint + 'getSingleChildrenLivingSituation/' + id)
  }
  getCirDeclaration(id:any): Observable<any> {
    return this.http.get(endpoint + 'getCirDeclaration/' + id)
  }
  getCirFinancialInformation(id:any): Observable<any> {
    return this.http.get(endpoint + 'getCirFinancialInformation/' + id)
  }
  getCirMonthlyIncome(id:any): Observable<any> {
    return this.http.get(endpoint + 'getCirMonthlyIncome/' + id)
  }
  getCirMonthlyDeductions(id:any): Observable<any> {
    return this.http.get(endpoint + 'getCirMonthlyDeductions/' + id)
  }
  getCirClientLivingSituation(id:any): Observable<any> {
    return this.http.get(endpoint + 'getCirClientLivingSituation/' + id)
  }
   deleteCirClientLivingSituation(id:any): Observable<any> {
    return this.http.get(endpoint + 'deleteCirClientLivingSituation/' + id)
  }
  getCirHealthInsurance(id:any): Observable<any> {
    return this.http.get(endpoint + 'getCirHealthInsurance/' + id)
  }
  getCirAssets(id:any): Observable<any> {
    return this.http.get(endpoint + 'getCirAssets/' + id)
  }
  getCirDebts(id:any): Observable<any> {
    return this.http.get(endpoint + 'getCirDebts/' + id)
  }
  deleteCirAssetandDebts(id:any): Observable<any> {
    return this.http.get(endpoint + 'deleteCirAssetandDebts/' + id)
  }
  get_cir_pdf(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'cirprofile', form.value)
  }
  uploadcir_profile_new(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data',
      })
    };
    return this.http.post(endpoint + 'uploadcirpdf1',data,httpOptions);
  }
  getCirdata_doc(data:any): Observable<any> {
    return this.http.post(endpoint + 'cirprofile_doc',{data})
  }
  email_username_update(data: any,lastemail:any): Observable<any> {
    return this.http.post(endpoint + 'update_email_id',{data, lastemail})
  } 
  phone_username_update(lastphone: any,newphone:any): Observable<any> {
    return this.http.post(endpoint + 'update_mobile_id',{lastphone, newphone})
  } 
  save_cir_doc_notes(form: any): Observable<any> {
    return this.http.post(secureendpoint + 'save_cir_doc_notes', form.value)
  }
  update_self_help_status(data: any): Observable<any> {
    return this.http.post(endpoint + 'update_self_help_status',{data:data})
  } 
   update_legalbutton_status(data: any): Observable<any> {
    return this.http.post(endpoint + 'update_legalbutton_status',{data:data})
  }
   save_download_history(data: any,user_id:any): Observable<any> {
    return this.http.post(endpoint + 'save_download_history',{data:data,user_id:user_id}, {responseType: 'arraybuffer'})
  } 
  get_download_history(id:any): Observable<any> {
    return this.http.get(endpoint + 'get_download_history/' + id)
  }
  save_legal_matter_details(data: any): Observable<any> {
    return this.http.post(endpoint + 'save_legal_matter_details',{data:data})
  } 
  get_user_summary(user_id: any): Observable<any> {
    return this.http.post(endpoint + 'get_user_summary',{user_id:user_id})
  } 
}