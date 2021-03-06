import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    // note add this header for CORS pass
    let token = localStorage.getItem('access_token');
    let headers = null;

    if(token){
      headers = new HttpHeaders({
        'Content-Type' : 'application/form-data; charset=UTF-8, application/json',
		 'Access-Control-Allow-Origin': '*',
   
        'Authorization' : `Bearer ${token}`,
      });
    }else{
      headers = new HttpHeaders({
        'Content-Type' : 'application/form-data; charset=UTF-8, application/json'
    });
    }
    const requestChange = req.clone({headers});
    console.log(requestChange);
    return next.handle(requestChange);
  }
}