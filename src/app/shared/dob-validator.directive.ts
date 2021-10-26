
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appDobValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: DobValidatorDirective, multi: true}
  ]
})
export class DobValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    /* validation rules */
    const dob_value = control.value;
	var DobProfileInitialError = {
		dobProfileError: true
	}
    /* check validation rules */
	console.log(dob_value)
    if (dob_value==null)
		{
			return null;
		}
		var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
		if (!(date_regex.test(dob_value))) {
			return DobProfileInitialError
		}
		else if ((dob_value.length == 10) && (dob_value.substring(6, 10) < 1901 || dob_value.substring(6, 10) > new Date().getFullYear())) {
			return DobProfileInitialError
		}
		else {
			return null;
		}
  }

}

