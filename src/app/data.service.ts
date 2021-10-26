import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const endpoint = 'https://reporting.lawforall.com/portal/api/';
const endpoint2 = 'http://localhost:8000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
	'Access-Control-Request-Headers':'access-control-allow-origin,Content-type'
  })
};

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getselfhelpguides(): Observable<any> {
    return this.http.get(endpoint + 'selfthelpguide')
  }
 
	emailverified(form: any): Observable<any> {
    return this.http.post(endpoint + 'veriftyemail', form.value)
  }
  emailotpverify(form: any): Observable<any> {
    return this.http.post(endpoint + 'veriftyotp', form.value)
  }
  mobileverifies(form: any): Observable<any> {
    return this.http.post(endpoint + 'verify_mobile', form.value)
  }
 verify_mobile_otp(form: any): Observable<any> {
    return this.http.post(endpoint + 'verify_mobile_otp', form.value)
  }
  updatebasicprofile(form: any): Observable<any> {
    return this.http.post(endpoint + 'update_basicprofile_non_buyer', form.value)
  }
  changepass(form: any): Observable<any> {
    return this.http.post(endpoint + 'change_password', form.value)
  }
  updateuserlncome(form: any): Observable<any> {
    return this.http.post(endpoint + 'user_income_details', form.value)
  }
  updatelegalissueForm(form: any): Observable<any> {
    return this.http.post(endpoint + 'legal_details', form.value)
  } 
  updateprofessiondetails(form: any): Observable<any> {
    return this.http.post(endpoint + 'user_profession_details', form.value)
  }
  updateinterestdetails(form: any): Observable<any> {
    return this.http.post(endpoint + 'user_interest_details', form.value)
  }
  updateothtlegalinterest(form: any): Observable<any> {
    return this.http.post(endpoint + 'user_othtlegalinterest_details', form.value)
  }
  getuserdetails(email: any): Observable<any> {
    return this.http.post(endpoint + 'getuserdetails',{email:email})
  }
  updateuserfamilydetails(addresses: any,user_id:any): Observable<any> {
    return this.http.post(endpoint + 'nonbuyer_family_details',{addresses:addresses,user_id:user_id})
  }
   getcirprofile(): Observable<any> {
    return this.http.get(endpoint + 'cirprofile')
  } 
  getlegalresourcesstates(): Observable<any> {
    return this.http.get(endpoint + 'getlegalresourcestates')
  }
	getguideyid(id: any): Observable<any> {
    return this.http.post(endpoint + 'getguidebyid',{id:id})
  }
  getuserincomedetails(user_id: any): Observable<any> {
    return this.http.post(endpoint + 'getincomebyuserid',{user_id:user_id})
  }
 getuserlegaldetails(id: any): Observable<any> {
    return this.http.post(endpoint + 'getuserlegaldetails',{id:id})
  }
  getuserfamilydetail(user_id: any): Observable<any> {
    return this.http.post(endpoint + 'getuserfamilydetails',{user_id:user_id})
  }
 getuserotherlegaldetails(user_id: any): Observable<any> {
    return this.http.post(endpoint + 'getuserotherlegaldetails',{user_id:user_id})
  }
  getuserinstdetail(user_id: any): Observable<any> {
    return this.http.post(endpoint + 'getuserinsterstdetail',{user_id:user_id})
  }
getuserprofessiondetails(user_id: any): Observable<any> {
    return this.http.post(endpoint + 'getuserprofessiondetails',{user_id:user_id})
  }
  getselectedlegalissuepdf(legal_type: any,user_id:any): Observable<any> {
    return this.http.post(endpoint + 'getselectedlegalissuepdf',{legal_type:legal_type,user_id:user_id})
  }
  getselectedstatebuttons(state_id: any): Observable<any> {
    return this.http.post(endpoint + 'getselectedstatebuttons',{state_id:state_id})
  } 
  deletefamilymember(id: any): Observable<any> {
    return this.http.post(endpoint + 'delete_family_member',{id:id})
  } 
  delete_legal_details_byid(id: any): Observable<any> {
    return this.http.post(endpoint + 'delete_legal_details_byid',{id:id})
  } 
  delete_other_legal_details_byid(id: any): Observable<any> {
    return this.http.post(endpoint + 'delete_other_legal_details_byid',{id:id})
  } 
  deletepet(id: any): Observable<any> {
    return this.http.post(endpoint + 'delete_pet',{id:id})
  } 
  editfamilymember(id: any): Observable<any> {
    return this.http.post(endpoint + 'edit_family_member',{id:id})
  } 
  get_single_pet_details(id: any): Observable<any> {
    return this.http.post(endpoint + 'get_single_pet_details',{id:id})
  } 
  getotherlegaldetailsbyid(id: any): Observable<any> {
    return this.http.post(endpoint + 'getotherlegaldetailsbyid',{id:id})
  } 
  getuserpetsdetail(user_id: any): Observable<any> {
    return this.http.post(endpoint + 'getuser_pet_sdetail',{user_id:user_id})
  } 
  get_user_legal_details(user_id: any): Observable<any> {
    return this.http.post(endpoint + 'get_user_legal_details',{user_id:user_id})
  } 
  get_sub_legal_interests(event: any): Observable<any> {
    return this.http.post(endpoint + 'get_sub_legal_verticals',{event:event})
  } 
  update_user_pets_details(data: any): Observable<any> {
    return this.http.post(endpoint + 'update_user_pets_details',{data:data})
  }
  update_user_other_legals_details(data: any): Observable<any> {
    return this.http.post(endpoint + 'update_user_other_legals_details',{data:data})
  } 
  check_user_activity(data: any): Observable<any> {
    return this.http.post(endpoint + 'check_user_activity',{data:data})
  }
  get_legal_resurce_buttons(): Observable<any> {
    return this.http.get(endpoint + 'get_legal_resurce_buttons')
  }
  get_othet_instdetail(): Observable<any> {
    return this.http.get(endpoint + 'get_legal_verticals')
  }
  get_other_parentnull(): Observable<any> {
    return this.http.get(endpoint + 'get_other_parentnull')
  }
   uploadpdffile(form: any): Observable<any> {
    return this.http.post(endpoint + 'uploadcirpdf',form.value)
  }
  update_family_member_details(form: any): Observable<any> {
    return this.http.post(endpoint + 'update_family_member_details',form.value)
  } 
  update_user_legals_details(data: any): Observable<any> {
    return this.http.post(endpoint + 'update_user_legals_details',{data:data})
  }
  update_single_pet_details(form: any): Observable<any> {
    return this.http.post(endpoint + 'update_single_pet_details',form.value)
  }
 
  
	  
  
		
}