import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    // note add this header for CORS pass
     let token = localStorage.getItem('token');
    let headers = null;

    if(token){
      headers = new HttpHeaders({
        // 'Content-Type' : 'application/form-data; charset=UTF-8, application/json',
		  'Access-Control-Allow-Origin': '*',
   //        'Access-Control-Allow-Headers': '*',
		 //  'Accept': 'application/json, text/plain',
		 //  'X-Requested-With':'XMLHttpRequest',
        'Authorization' : `Bearer ${token}`,
      });
    }else{
      headers = new HttpHeaders({
        // 'Content-Type' : 'application/form-data; charset=UTF-8, application/json',
         'Access-Control-Allow-Origin': '*',
          //'Access-Control-Allow-Headers': '*',
    });
    }
    const requestChange = req.clone({headers});
    console.log(requestChange);
    return next.handle(requestChange);
  }
}