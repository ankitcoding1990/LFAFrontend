import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  loggedIn = false;

  isAuthenticated(){
  	return new Promise(
  		(resolve,reject) => {
  			setTimeout(() => {
  				resolve(this.loggedIn);
  			},800);
  		});
  }

  loggedInUser(){
  	this.loggedIn = true;
  }

  loggedOutUser(){
  	this.loggedIn = false;
  }
}