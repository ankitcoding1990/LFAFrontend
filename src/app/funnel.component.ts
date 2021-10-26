import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder ,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import Swal from 'sweetalert2';
import { SpinnerVisibilityService } from 'ng-http-loader';
declare var $: any;
import { Title } from "@angular/platform-browser";

@Component({
	selector: 'app-funnel',
	templateUrl: './funnel.component.html',
	styleUrls: ['./funnel.component.css']
})
export class FunnelComponent implements OnInit {
	date_error_message:boolean = false;
	isDisabled_past_to = false;
	isDisabled_future = false;
	date_error_message_from:boolean = false;
	date_error_message_future:boolean = false;
	userdetails: any;
	funnel_data: any;
	email: any;
	nav_value: any;
	main_nav: any;
	loggeduser_id: any;
	// dob form
	show_dob_form: boolean = true;
	dobform_submitted = false;
	dobform: any;
	Addressform:any;
	show_address_form:boolean=false;
	// gender form
		gender_pronoun_field: boolean = false;
	genderlist: any = [];
	show_gender_form: boolean = false;
	genderform_submitted = false;
	genderform: any;
	// pronoun form
	show_pronouns_form: boolean = false;
	pronounform_submitted = false;
	pronounform: any;
	//legal form
	custom_legalform: any;
	legal_matter_when_signup: any;
	yes_no_button: boolean = true;
	no_have_legal_matter: boolean = false;
	legal_matter_dropdoen: boolean = false;
	legal_issue_dropdoen: boolean = false;
	legal_description: boolean = false;
	show_legal_form: boolean = false;
	what_u_want: boolean = false;
	next_button: boolean = false;
	title_legal:boolean = true;
	legalform_submitted = false;
	legalform: any;
	get_sub_interests: any;
	get_other_legal_details: any;
	// family
	gender_pronoun_field_family:boolean=false;
	family_friend_title:boolean=true;
	family_hint:boolean=true;
	familyForm_submitted: boolean = false;
	show_family_section: boolean = true;
	show_family_form: boolean = false;
	familyform: any;
	kids_form: boolean = false;
	edit_family_dob_field: boolean = true;
	edit_family_dob_field_emergency:boolean=true;
	age_input: boolean = false;
	age_input_emergency:boolean=false;
	show_family_kids_form: boolean = false;
	show_family_other_msg: boolean = false;
	emergency_active: boolean = false;
	pets_active: boolean = false;
	all_three_removed: boolean = false;

	// emergency
	emergencyForm_submitted: boolean = false;
	show_emergency_tab: boolean = false;
	show_family_emergency_conf: boolean = false;
	emergencyform: any;
	show_emergency_section: boolean = true;
	//pets
	pets_submitted: boolean = false;
	add_pet_dob_field: boolean = true;
	show_pet_section: boolean = true;
	show_pets_confimation: boolean = false;
	show_pet_form: boolean = false;
	petsform: any;
	//PROFESSION
	profession_other:boolean=false;
	income_professionform: any;
	income_proForm_submitted: boolean = false;
	show_start_profession: boolean = false;
	income_profession: boolean = false;
	professionlist: any = [];
	title_profession:boolean=true;
	//pastwork
	pastworkform: any
	goal_past_work: boolean = false;
	previous_work: boolean = false;
	current_work_title:boolean=false;
	past_work_title:boolean=false;
	past_work_submitted: boolean = false;
	//future goal
	future_goalform: any;
	future_enddate_form: any;
	future_goals: boolean = false;
	future_goal_end: boolean = false;
	future_goal_other:boolean=false;
	// interest
	more_interest:boolean=false;
	selected_interest:any;
	interestform: any;
	interest_first_field:boolean=true;
	interestform_submitted: boolean = false;
	show_interests: boolean = false;
	show_interests_description: boolean = false;
	add_more_interest: boolean = false;
	interestslist: any;
	//other legal
	prev_buton_legal:boolean=true;
	more_Legal_matter:boolean=false;
	other_legal_form: any;
	legal_other_title:boolean=true;
	other_legal_interest: boolean = false;
	congratulations: boolean = false;
	almostDone:boolean=false;
	addnewinterest_other:boolean=false;
	update_funnel_status:any;
	family_child_relation:boolean=true;
	continue_from:any;
	cueent_past_present:boolean=true;
	currently_isChecked=false;
	qsg: any;
	profile_percentage:any;
	bar_percentage:any;
	completesection:any;
	checkDobProfileInitial(control: FormControl) {
		let dob_value = control.value;
		var DobProfileInitialError = {
			dobProfileError: {
				enteredName: dob_value
			}
		}
		if (dob_value == null || dob_value == "" || dob_value == undefined) {
			return null;
		}
		var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
		if (!(date_regex.test(dob_value))) {
			
			return DobProfileInitialError;
		}
		else if ((dob_value.length == 10) && (dob_value.substring(6, 10) < 1901 || dob_value.substring(6, 10) > new Date().getFullYear())) {
			return DobProfileInitialError;
		}
		else {
			return null;
		}

	}
	checkWorkMonth=(control: FormControl)=>{
		
		let dob_value = control.value;
		
		var DobProfileInitialError_Month = {
			dobProfileError_month: {
				enteredName: dob_value
			}
		}
		if (dob_value == null || dob_value == "" || dob_value == undefined) {
			this.date_error_message=false;
			return null;
		}
			var todayDate = new Date();
			var todayDay = new Date().getDate();
			var maindate=dob_value.split('/');
			var NewDatevalue=maindate[1]+'-'+maindate[0]+'-'+ todayDay;
			var checkDate = new Date(NewDatevalue);
			var date_regex = /^(0?[1-9]|1[012])\/(19|20)\d{2}$/;
			
			if (!(date_regex.test(dob_value))) {
				console.log('error');
				this.date_error_message=true;
				this.isDisabled_past_to=true;
				return DobProfileInitialError_Month;
				
			}
			else if ((dob_value.length != 7)) {
				
				this.date_error_message=true;
				this.isDisabled_past_to=true;
				return DobProfileInitialError_Month;
			}
			else if (todayDate <= checkDate) {
				this.date_error_message=true;
				this.isDisabled_past_to=true;
				return DobProfileInitialError_Month;
			}
			
			else {
				this.date_error_message=false;
				this.isDisabled_past_to=false;
				return null;
			}
		
		
		

	}
	checkWorkMonth_from=(control: FormControl)=>{
		
		let dob_value = control.value;
		var DobProfileInitialError_Month = {
			dobProfileError_month: {
				enteredName: dob_value
			}
		}
		if (dob_value == null || dob_value == "" || dob_value == undefined) {
			this.date_error_message_from=false;
			return null;
		}
			var todayDate = new Date();
			var todayDay = new Date().getDate();
			var maindate=dob_value.split('/');
			var NewDatevalue=maindate[1]+'-'+maindate[0]+'-'+ todayDay;
			var checkDate = new Date(NewDatevalue);
			
			var date_regex = /^(0?[1-9]|1[012])\/(19|20)\d{2}$/;
			
			if (!(date_regex.test(dob_value))) {
				this.date_error_message_from=true;
				this.isDisabled_past_to=true;
				return DobProfileInitialError_Month;
				
			}
			else if ((dob_value.length != 7)) {
				this.date_error_message_from=true;
				this.isDisabled_past_to=true;
				return DobProfileInitialError_Month;
			}
			else if (todayDate <= checkDate) {
				this.date_error_message_from=true;
				this.isDisabled_past_to=true;
				return DobProfileInitialError_Month;
			}
			
			else {
				this.isDisabled_past_to=false;
				this.date_error_message_from=false;
				
				return null;
			}
	}
	checkWorkMonth_future=(control: FormControl)=>{
		
		let dob_value = control.value;
		var DobProfileInitialError_Month_Future = {
			dobProfileError_month_future: {
				enteredName: dob_value
			}
		}
		if (dob_value == null || dob_value == "" || dob_value == undefined) {
			this.date_error_message_future=false;
			return null;
		}
			var todayDate = new Date();
			var todayDay = new Date().getDate();
			var maindate=dob_value.split('/');
			var NewDatevalue=maindate[1]+'-'+maindate[0]+'-'+ todayDay;
			var checkDate = new Date(NewDatevalue);
			
			var date_regex = /^(0?[1-9]|1[012])\/(19|20)\d{2}$/;
			
			if (!(date_regex.test(dob_value))) {
				this.date_error_message_future=true;
				this.isDisabled_future=true;
				return DobProfileInitialError_Month_Future;
				
			}
			else if ((dob_value.length != 7)) {
				this.date_error_message_future=true;
				this.isDisabled_future=true;
				return DobProfileInitialError_Month_Future;
			}
			else if (todayDate >= checkDate) {
				this.date_error_message_future=true;
				this.isDisabled_future=true;
				return DobProfileInitialError_Month_Future;
			}
			
			else {
				this.date_error_message_future=false;
				this.isDisabled_future=false;
				return null;
			}
	}
	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private dataService: DataService,
		private router: Router,
		private titleService: Title,
		private spinner: SpinnerVisibilityService

	) {
		this.titleService.setTitle("lawforall | Profile Funnel");

	}

	ngOnInit(): void {
		this.spinner.show();
		this.spinner.hide();

		if (localStorage.getItem("email") != null) {
			this.email = localStorage.getItem("email");
			this.loggeduser_id = localStorage.getItem("user_id");

		} else {
			this.router.navigate(['/sign-in'])
		}
		this.bar_percentage=0;
		this.nav_value = "DOB";
		this.main_nav = "PROFILE";
		if (sessionStorage.getItem("continue_from") != null) {
			this.continue_from  = sessionStorage.getItem("continue_from");

			if(this.continue_from == 1)
			{
				this.show_dob_form=false;
				this.show_legal_form=true;
				this.main_nav = "LEGAL DETAILS";
				this.nav_value = "LEGAL MATTER CONFIRM";
				this.show_legal_dropdown();
				
			}
			if(this.continue_from == 2)
			{
			this.show_dob_form=false;
			this.skip_description();
			this.main_nav = "FAMILY";
			this.nav_value = "LIST";
			}
			if(this.continue_from == 3)
			{
				this.show_dob_form=false;
				this.show_family_form=false;
				this.goal_past_work = true;
				this.show_pets_confimation = false;
				this.nav_value = "MORE";
				this.main_nav = "PROFESSION";
				
			}
			if(this.continue_from == 4)
			{
				this.show_dob_form=false;
				this.nav_value = "ADD";
				this.main_nav = "INTERESTS";
				this.show_interests = true;
				this.interest_first_field=true;
			}
			if(this.continue_from == 5)
			{
				this.show_dob_form=false;
				this.skip_more_interest();
				this.nav_value = "";
				this.main_nav = "OTHER LEGAL MATTER";
			}
			if(this.continue_from == 6)
			{

			this.show_dob_form=false;
			this.congratulations = true;
			this.other_legal_interest = false;
			this.nav_value="";
			this.main_nav = "PROFILE CONGRATULATIONS";
			}
		}
		this.genderlist = [
			{ id: 1, name: 'Female' },
			{ id: 2, name: 'Male' },
			{ id: 3, name: 'Other' },
			{ id: 4, name: 'Prefer not to say' },

		];
		this.dobform = this.formBuilder.group({
			dob: ['' ,this.checkDobProfileInitial],
			user_id: ['', Validators.required],
			percentage:[10]
		});
		this.Addressform = this.formBuilder.group({
			user_id: ['', Validators.required],
			address: [''],
			percentage:[20]
		});
		this.genderform = this.formBuilder.group({
			gender: [''],
			user_id: [this.loggeduser_id, Validators.required],
			percentage:[15]
		});
		this.pronounform = this.formBuilder.group({
			pronoun: [''],
			user_id: ['', Validators.required],
		});
		this.custom_legalform = this.formBuilder.group({
			custom_legal_issue: [''],
			user_id: ['', Validators.required],
		});
		this.income_professionform = this.formBuilder.group({
			profession: [''],
			income: [''],
			user_id: ['', Validators.required],
			other:[''],
			other_income:[''],
			income_profession_form: ['income_profession_form'],
			percentage:[70]
		});
		this.interestform = this.formBuilder.group({
			interest: ['', Validators.required],
			user_id: ['', Validators.required],
			describe: [''],
			interest_form: ['interest_form'],
			new_interest:[''],
			percentage:[90]
		});
		this.legalform = this.formBuilder.group({
			user_id: ['', Validators.required],
			legal_type: ['', Validators.required],
			legal_issue: [''],
			legal_issue_description: [''],
			percentage:[40]
		});
		this.familyform = this.formBuilder.group({
			member_name: ['', Validators.required],
			user_id: ['', Validators.required],
			otherrelation: [''],
			age: ['', this.checkDobProfileInitial],
			phone:[''],
			member_email:[''],
			relation: [''],
			lastname: [''],
			age_number: [''],
			emergency_member: [0],
			gender:[''],
			gender_pronoun:[''],
			percentage:[50]
		});
		this.emergencyform = this.formBuilder.group({
			member_name: ['', Validators.required],
			user_id: ['', Validators.required],
			otherrelation: [''],
			age: ['', this.checkDobProfileInitial],
			relation: [''],
			lastname: [''],
			age_number: [''],
			emergency_member: [1],
			phone:[''],
			member_email:[''],
			gender:[''],
			gender_pronoun:[''],
			percentage:[5]
		});
		this.petsform = this.formBuilder.group({
			name: [''],
			user_id: ['', Validators.required],
			breed: [''],
			birthdate: ['', this.checkDobProfileInitial],
			species: [''],
			lastname: [''],
			age_number: [''],
			pet_form: ['pet_form'],
			percentage:[50]
		});
		this.pastworkform = this.formBuilder.group({
			user_id: ['', Validators.required],
			income: [''],
			profession: [''],
			date_from: ['',this.checkWorkMonth_from],
			date_to: [''],
			update_to_present:[''],
			other:[''],
			current_job:[0],
			percentage:[70],
			past_work:['past_work']
		});
		this.future_goalform = this.formBuilder.group({
			user_id: ['', Validators.required],
			income: [''],
			profession: [''],
			form_type: ['future_goal'],
			other:[''],
			percentage:[70]
		});
		this.future_enddate_form = this.formBuilder.group({
			user_id: ['', Validators.required],
			end_date: ['',this.checkWorkMonth_future],
			percentage:[70]
		});
		this.completesection = this.formBuilder.group({
			user_id: [this.loggeduser_id, Validators.required],
			percentage:[60]
		});
		this.update_funnel_status = this.formBuilder.group({
			user_id: [this.loggeduser_id, Validators.required],
			funnel_status: [1],
		});
		this.other_legal_form = this.formBuilder.group({
			user_id: ['', Validators.required],
			legal_area: ['', Validators.required],
			sub_legal_area: [''],
			describe:[''],
			other_legal_form: ['other_legal_form'],
			percentage:[100]
		});
		this.professionlist=["Physician",
		"Engineer",
		"Software Developer",
		"Teacher",
		"Lawyer",
		"Dentist",
		"Technician",
		"Registered Nurse",
		"Nurse Practitioner ",
		"Veterinarian",
		"Accountant",
		"Psychologist",
		"Pharmacist",
		"Scientist",
		"Occupational Therapist",
		"Technologist",
		"Physiotherapist",
		"Surgeon",
		"Architect",
		"Consultant",
		"Statistician",
		"Biomedical Engineer",
		"Economist",
		"Financial Manager",
		"Secretary",
		"Actuary",
		"Dietitian",
		"Dental Hygienist",
		"Financial Analyst",
		"Nurse Anaesthetist",
		"Medical Assistant",
		"Paralegal",
		"Web Designer",
		"Financial Adviser",
		"Licensed Practical Nurse",
		"Labourer",
		"Judge",
		"Engineering Technician",
		"Emergency Medical Technician",
		"Paramedic",
		"Operator",
		"Pharmacy Technician",
		"Landscape Architect",
		"Respiratory Therapist",
		"Appraiser",
		"Midwife",
		"Drafter",
		"Industrial Engineer",
		"Chef",
		"Paraveterinary Worker",
		"Legal Secretary"];
		this.professionlist.sort()
		
		this.dobform.get("user_id").setValue(this.loggeduser_id);
		this.Addressform.get("user_id").setValue(this.loggeduser_id);
		this.genderform.get("user_id").setValue(this.loggeduser_id);
		this.pronounform.get("user_id").setValue(this.loggeduser_id);
		this.legalform.get("user_id").setValue(this.loggeduser_id);
		this.familyform.get("user_id").setValue(this.loggeduser_id);
		this.emergencyform.get("user_id").setValue(this.loggeduser_id);
		this.income_professionform.get("user_id").setValue(this.loggeduser_id);
		this.pastworkform.get("user_id").setValue(this.loggeduser_id);
		this.interestform.get("user_id").setValue(this.loggeduser_id);
		this.future_goalform.get("user_id").setValue(this.loggeduser_id);
		this.future_enddate_form.get("user_id").setValue(this.loggeduser_id);
		this.custom_legalform.get("user_id").setValue(this.loggeduser_id);
		this.petsform.get("user_id").setValue(this.loggeduser_id);
		this.other_legal_form.get("user_id").setValue(this.loggeduser_id);
		this.familyform.get("gender").patchValue('');
		this.getotherlegalinterests();
		this.get_interests();
		this.get_user_funnel_data();
		this.get_user_basic_info();
		this.get_funnel_checklist();
		$(document).ready(function () {
			let $jqDate = $('.dob_slashes');
			$jqDate.bind('keyup', function (this: any, ev: any) {
				if (ev.which !== 8) {
					let input = $(this).val();
					let out = input.replace(/\D/g, '');
					let len = out.length;

					if (len > 1 && len < 4) {
						out = out.substring(0, 2) + '/' + out.substring(2, 3);
					} else if (len >= 4) {
						out = out.substring(0, 2) + '/' + out.substring(2, 4) + '/' + out.substring(4, len);
						out = out.substring(0, 10)
					}
					$(this).val(out)
				}
			});
			let $jqDate_month = $('.month_dob_slashes');
			$jqDate_month.bind('keyup', function (this: any, ev: any) {
				if (ev.which !== 6) {
					let input = $(this).val();
					let out = input.replace(/\D/g, '');
					let len = out.length;
					 if (len >= 4) {
						out = out.substring(0, 2) +  '/' + out.substring(2, len);
						out = out.substring(0, 7)
					}
					$(this).val(out)
				}
			});
		})
	}

	get dob_FormControl() {
		return this.dobform.controls;
	}
	get gender_FormControl() {
		return this.genderform.controls;
	}
	get pronoun_FormControl() {
		return this.pronounform.controls;
	}
	get familyFormControl() {
		return this.familyform.controls;
	}
	get pastworkFormControl() {
		return this.pastworkform.controls;
	}
	get emergencyFormControl() {
		return this.emergencyform.controls;
	}
	get income_proFormControl() {
		return this.income_professionform.controls;
	}
	get interestFormControl() {
		return this.interestform.controls;
	}
	get petsFormControl() {
		return this.petsform.controls;
	}
	prev_section(data:any)
	{
		if(data.target.value == "dob")
		{
		this.show_dob_form = true;
		this.show_gender_form = false;
		this.nav_value = "DOB";
		this.main_nav = "PROFILE";
		}
		if(data.target.value == "gender")
		{
			this.show_pronouns_form=false;
			this.show_gender_form=true;
				this.nav_value = "GENDER";
				this.show_address_form=false;
		}
		if(data.target.value == "pronoun")
		{
			this.main_nav = "PROFILE";
			this.show_address_form=false;
			this.show_legal_form=false;
			const gender: string = this.genderform.get('gender').value;
			if (gender == "Other" || gender == "Prefer not to say") 
			{
			this.show_pronouns_form=true;
			this.show_address_form=false;
			this.nav_value = "PRONOUN";
			}else{
				this.nav_value = "GENDER";
				this.show_gender_form=true;
			}
		}
		if(data.target.value == "have_legal")
		{
			this.what_u_want=false;
			this.have_legal_no();
		}
		if(data.target.value == "address")
		{
			this.show_address_form=true;
			this.nav_value="ADDRESS";
			this.main_nav="PROFILE";
			this.show_legal_form=false;
		}
		if(data.target.value == "have_legal_again")
		{
			this.nav_value = "LEGAL MATTER CONFIRM";
			this.legal_matter_dropdoen=false;
			this.title_legal=true;
			this.have_legal_no();
		}
		if(data.target.value == "just_confirm")
		{
			this.yes_no_button=true;
			this.no_have_legal_matter=false;
			this.title_legal=true;
			this.legal_issue_dropdoen=false;
			this.nav_value = "LEGAL MATTER CONFIRM";
		}
		if(data.target.value == "legal_matter")
		{

			this.legal_issue_dropdoen=false;
			this.show_legal_dropdown();
		}
		if(data.target.value == "legal_issue")
		{
			this.show_legal_issue(data);
		}
		if(data.target.value == "legal_description")
		{
		// this.show_legal_form = true;
		this.show_family_form = false;
			if (sessionStorage.getItem("prev_section") == "legal_yes_case") {
				this.show_legal_description();
				this.show_legal_form = true;
				sessionStorage.removeItem("prev_section");
			}else if(sessionStorage.getItem("prev_section") == "legal_materr_case_yes") {
					this.nav_value = "LEGAL MATTER";
				this.main_nav="LEGAL DETAILS"
				this.legal_matter_dropdoen = true;
				this.show_legal_form=true;
				sessionStorage.removeItem("prev_section");
			}else{
			this.show_legal_form = true;
			}
			
		}
		if(data.target.value == "threeTabs")
		{
		this.show_family_kids_form=false;
		this.show_family_other_msg=false;
		this.goal_past_work=false;
		this.show_pet_form=false;
		this.show_start_profession=false;
		this.family_friend_title=true;
		this.show_family_emergency_conf=false;
		this.skip_description();
		}
		if(data.target.value == "family_form")
		{
		this.show_emergency_tab=false;
		this.show_family_emergency_conf=false;
		this.show_pets_confimation=false;
		this.show_family_form=true;
		this.nav_value = "LIST";
		this.main_nav = "FAMILY";
		}
		if(data.target.value == "emergency_form")
		{
		this.show_pets_confimation=false;
		this.show_pet_form=false;
		this.show_family_emergency_conf=true;
		this.main_nav = "PETS";
		this.nav_value = "";
		}
		if(data.target.value == "currently_employee")
		{
			this.title_profession=true;
				this.income_profession=false;
				this.goal_past_work=false;
				this.show_start_profession=true;
		}
		if(data.target.value == "past_future")
		{
				this.future_goals=false;
				this.previous_work=false;
				this.future_goal_end=false;
				this.show_interests=false;
				this.goal_past_work=true;
				this.main_nav="PROFESSION";
				this.nav_value="MORE";
		}
		if(data.target.value == "show_interest")
		{
			this.show_interests_description=false;
			this.add_more_interest=false;
			this.other_legal_interest=false;
				this.almostDone=false;
				this.interest_first_field=true;
				this.show_interests=true;
				this.nav_value = "ADD";
				this.main_nav="INTERESTS";
		}
		if(data.target.value == "show_other_legal")
		{
			this.congratulations=false;
				this.other_legal_interest=true;
				this.main_nav="OTHER LEGAL MATTER";
		}
		if(data.target.value == "show_almostdone")
		{
			this.other_legal_interest=false;
				this.almostDone=true;
				this.main_nav="ALMOST DONE";
				this.nav_value="";
		}


	}
	get_gender_value(event: any) {
		var gender = event.target.value;
		if (gender == "Other" || gender == "Prefer not to say") {
			// this.skip_gender();
			// this.gender_pronoun_field_family=false;
			// this.show_address_form=true;
		} else{
			this.show_address_form=false;
		this.gender_pronoun_field=true;
		}
	}
	get_gender_value_family(e:any)
	{
		var gender = e.target.value;
		if (gender == "Other" || gender == "Prefer not to say") {

			this.gender_pronoun_field_family=true;
		} else{

		this.gender_pronoun_field_family=false;
		}
	}
	get_user_basic_info() {
		this.userdetails = [];
		this.dataService.getuserdetails(this.email).subscribe((data: {}) => {
			this.userdetails = data;
			this.legal_matter_when_signup = "<b>" + this.userdetails.result.legal_metter + "</b>";
			sessionStorage.setItem('legal_id', this.userdetails.result.legal_type);
			//this.legalform.get("legal_type").patchValue(this.userdetails.result.legal_type);
			this.legalform.get("legal_type").setValue(this.userdetails.result.legal_type);
		})
	}
	get_user_funnel_data() {

		this.funnel_data = [];
		this.dataService.get_user_funnel_details(this.loggeduser_id).subscribe((data: {}) => {
			this.funnel_data = data;
			this.profile_percentage = data;
			this.bar_percentage = this.profile_percentage.perecentage
			
		  $(document).ready(function() {
			var value = $('#bar_value').val();
			$('.progress_bar').css({'width':value });

       });
			this.dobform.get("dob").setValue(this.funnel_data.data.dob);
			if(this.funnel_data.data.gender == null || this.funnel_data.data.gender == "")
			{
				
				this.genderform.get("gender").patchValue('');
			}else{
				this.genderform.get("gender").patchValue(this.funnel_data.data.gender);
				
			}
			
			this.Addressform.get("address").patchValue(this.funnel_data.data.address);
			if (this.funnel_data.data.gender == "Other" || this.funnel_data.data.gender == "Prefer not to say") {
			this.gender_pronoun_field=false;
			}else{
				this.gender_pronoun_field=true;
			}
			this.pronounform.get("pronoun").setValue(this.funnel_data.data.pronoun);
			if(this.funnel_data.data === null || this.funnel_data.data === "no data found" )
			{
				this.legalform.get("legal_issue_description").patchValue('');
			}else{
				this.legalform.get("legal_issue_description").patchValue(this.funnel_data.data.legal_description);
			
			}
			if(this.funnel_data.data === null || this.funnel_data.data === "no data found" || this.funnel_data.data.legal_metter === "")
			{
					this.legalform.get("legal_issue").patchValue('');
			}else{
			this.legalform.get("legal_issue").patchValue(this.funnel_data.data.legal_issue);
			
						}
			
		});
	}
	save_address()
	{
				this.dataService.update_user_funnel(this.Addressform).subscribe(
				(response:any) => {
					this.get_user_funnel_data();
					sessionStorage.setItem('user_type','welcome_letter');
					this.get_funnel_checklist();
					sessionStorage.setItem('continue_from','1');
						this.show_address_form=false;
						this.skip_pronoun();

				})
	}
	save_dob() {
		this.dobform_submitted = true;
		if (this.dobform.valid) {
			this.dataService.update_user_funnel(this.dobform).subscribe(
				(response:any) => {
					this.get_user_funnel_data();
					// this.genderform.get("gender").patchValue('');	
					this.show_dob_form = false;
					this.show_gender_form = true;
					this.nav_value = "GENDER";
				})
	}

	}
	skip_gender()
	{
	this.dobform_submitted = true;
	this.show_gender_form = false;
	this.show_pronouns_form = true;
	this.nav_value = "PRONOUN";
	}
	save_gender() {
	const gender: string = this.genderform.get('gender').value;

	// if(gender == '')
	// {
	// 	this.show_pronouns_form = false;
	// 	this.show_gender_form=false
	// 	this.show_address_form=true;
	// 	this.nav_value="ADDRESS";
	// }else{
		this.genderform_submitted=true;
		if(this.genderform.valid)
		{
		this.dataService.update_user_funnel(this.genderform).subscribe(
		(response:any) => {
			this.skip_gender();
			this.get_user_funnel_data();
			if (gender == "Female" || gender == "Male") {
					// this.skip_pronoun();
					this.show_pronouns_form = false;
					this.show_address_form=true;
					this.nav_value="ADDRESS";
			}else{
					this.skip_gender();
					this.gender_pronoun_field_family=false;
					}
				})
			}
		//}
			
			
		
	}
	save_pronoun() {
		if (this.pronounform.valid) {
			this.dataService.update_user_funnel(this.pronounform).subscribe(
				(response:any) => {
					// this.skip_pronoun();
					this.show_pronouns_form=false;
					this.show_address_form=true;
					this.nav_value="ADDRESS";
				})
		}else{
				this.show_pronouns_form=false;
				this.show_address_form=true;
				this.nav_value="ADDRESS";
		}
	}
	skip_pronoun() {

		this.main_nav = "LEGAL DETAILS";
		this.nav_value = "LEGAL MATTER CONFIRM";
		this.show_pronouns_form = false;
		this.show_legal_form = true;
		this.nav_value = "LEGAL MATTER CONFIRM";
		this.legal_issue_dropdoen=false;

	}
	save_custom_legalform() {
		Swal.fire({
			icon: 'success',
			title: 'Thank you for sharing ',
			html: 'We understand this process can be complicated and isn’t the most delightful matter to talk about. Rest assured, you’re doing the right thing! <br> <br>Let’s keep getting your account set up.',
		})
		sessionStorage.setItem('prev_section', "legal_no_case");
		this.dataService.update_user_funnel(this.custom_legalform).subscribe(
			(response:any) => {
				sessionStorage.setItem('user_type','welcome_letter');
					this.get_user_funnel_data();
				this.show_family_form = true;
				this.what_u_want = false;
				this.show_legal_form = false;

			})
	}
	save_legal() {
	
		const description: string = this.legalform.get('legal_issue_description').value;
		if (description != "") {
			Swal.fire({
			icon: 'success',
			title: 'Thank you for sharing ',
			html: 'We understand this process can be complicated and isn’t the most delightful matter to talk about. Rest assured, you’re doing the right thing! <br> <br>Let’s keep getting your account set up.',
		})
		}
		sessionStorage.setItem('prev_section', "legal_yes_case");
		this.dataService.update_user_funnel(this.legalform).subscribe(
			(response:any) => {
				sessionStorage.setItem('continue_from', "2");
				sessionStorage.setItem('user_type','welcome_letter');
				this.get_funnel_checklist();
				this.get_user_funnel_data();
				this.show_legal_form = false;
				this.show_family_form = true;
				this.main_nav = "FAMILY";
				this.nav_value = "LIST";
			})
	}


	have_legal_no() {
		this.main_nav = "LEGAL DETAILS";
		this.no_have_legal_matter = true;
		this.yes_no_button = false;
	}
	what_you_want() {
		this.main_nav = "LEGAL DETAILS";
		this.no_have_legal_matter = false;
		this.what_u_want = true;
		this.next_button = false;
	}
	show_legal_dropdown() {
		//this.legalform.get("legal_issue_description").setValue('');
		// this.prev_buton_legal=true;
		this.main_nav = "LEGAL DETAILS";
		this.legal_description = false;
		this.yes_no_button = false;
		this.title_legal=false;
		this.no_have_legal_matter = false;
		this.legal_matter_dropdoen = true
		this.nav_value = "LEGAL MATTER";
	}
	show_legal_issue(data:any) {
		
		if(data.target.value == "skip_legal_matter")
			{
			this.prev_buton_legal=false;
			if(sessionStorage.getItem('bar') == null)
			{
			sessionStorage.setItem('bar','five');
			var old = $('#bar_value').val();
			var value = parseInt(old) + parseInt('55');
			$('.progress_bar').css({'width':value });
			this.bar_percentage = 25;
			//$('.progress-bar-animated').html('25% Complete')
			}
		}
		if(data.target.value == "with_legal_matter")
		{
			this.prev_buton_legal=true;
			
		}		
		if(data.target.value != "with_legal_matter")
		{
		if (sessionStorage.getItem("legal_id") != null) {

			var id = sessionStorage.getItem("legal_id");
			this.get_sub_interests = [];
		this.dataService.get_sub_legal_interests(id).subscribe(
			(response:any) => {
				this.get_sub_interests = response.data;
			});
		}
		}
		this.main_nav = "LEGAL DETAILS";
		this.legal_description = false;
		this.nav_value = "LEGAL ISSUE";
		 
		this.legal_issue_dropdoen = true;
		this.legal_matter_dropdoen = false;
		this.yes_no_button=false;
		this.no_have_legal_matter=false;
		this.title_legal=false;
		// this.legalform.get("legal_issue_description").setValue('');
	}
	show_legal_description() {
		this.main_nav = "LEGAL DETAILS";
		this.nav_value = "LEGAL DESCRIPTION";
		this.legal_issue_dropdoen = false;
		this.legal_description = true;
		if(sessionStorage.getItem('barissue') == null)
			{
			sessionStorage.setItem('barissue','ten');
			var old = $('#bar_value').val();
			var value = parseInt(old) + parseInt('110');
			$('.progress_bar').css({'width':value });
			// $('.progress-bar-animated').html('35% Complete')
			this.bar_percentage = 35;
			}
	}
	dont_have_matter()
	{
		sessionStorage.setItem('prev_section', 'legal_materr_case_yes');
		this.show_legal_form=false;
		this.skip_description();
		this.dataService.update_user_funnel(this.legalform).subscribe(
			(response:any) => {
				sessionStorage.setItem('continue_from', "2");
				sessionStorage.setItem('user_type','welcome_letter');
				this.get_funnel_checklist();
				})
	}
	save_family() {
		this.familyForm_submitted = true;
		if (this.familyform.valid) {
			this.dataService.update_user_funnel(this.familyform).subscribe(
				(response:any) => {
						this.get_user_funnel_data();
					this.show_family_kids_form = false;
					if(this.nav_value == "FAMILY / ADD")
					{
					this.show_family_emergency_conf = true;
					this.nav_value = "FAMILY / MORE";
					}else{
					this.show_family_other_msg = true;
					this.nav_value = "DEPENDENTS / MORE";
					
				}
				})
		}
	}
	counter(i: number) {
		return new Array(i);
	}
	show_family_form_section()
	{
		this.nav_value = "FAMILY / ADD";
		this.show_family_other_msg = false;
		this.show_family_form = false;
		this.show_family_kids_form = true;
	}
	show_family_kids(e:any) {

		 this.familyform.reset();
		this.familyform.get('member_name').clearValidators();
		this.familyform.get('member_name').updateValueAndValidity();
		this.familyform.get("user_id").setValue(this.loggeduser_id);
		this.familyform.get("emergency_member").setValue(0);
		this.familyform.get("percentage").setValue(50);
		this.familyform.get("relation").patchValue('');
		this.familyform.get("gender").patchValue('');
		this.familyform.get("age_number").patchValue('');
		this.edit_family_dob_field=true;
		this.gender_pronoun_field_family=false;
		this.age_input=false;
		$(".checkSurfaceEnvironment-3").prop("checked", false);
	    $('.showotherrelationfield').hide();
		this.show_family_form_section();
		this.family_friend_title=true;
		this.show_family_emergency_conf=false;
		this.family_friend_title=false;
		$(".checkSurfaceEnvironment-4").prop("checked", false);
		if(e.target.value == "family_member")
		{
			this.nav_value = "DEPENDENTS / ADD";
			this.family_child_relation=false;
			this.family_hint=true;
			this.familyform.get("emergency_member").setValue(0);
		}else{
			this.nav_value == "FAMILY / ADD"
			this.family_child_relation=true;
			this.family_hint=false;
			this.familyform.get("emergency_member").setValue(0);
		}

	}
	onChangeage_set_emergency(e:any)
	{
			if (e.target.checked) {
				this.familyform.get("emergency_member").setValue(1);
			}else{
				this.familyform.get("emergency_member").setValue(0);
			}
	}
	onChangeage_edit_emergency(e:any)
	{
		if (e.target.checked) {

			this.age_input_emergency = true;
			this.edit_family_dob_field_emergency = false;
		} else {

			this.emergencyform.get("age").setValue('');
			this.emergencyform.get("age_number").patchValue('');
			this.age_input_emergency = false;
			this.edit_family_dob_field_emergency = true;
		}
	}
	onChangeage_edit_family(e: any) {
		
		if (e.target.checked) {

			this.age_input = true;
			this.edit_family_dob_field = false;
		} else {

			this.familyform.get("age").setValue('');
			this.familyform.get("age_number").patchValue('');
			this.age_input = false;
			this.edit_family_dob_field = true;
		}
	}
	onChange_pet_edit(e: any) {
		if (e.target.checked) {
			this.petsform.get("age_number").patchValue('');
			this.petsform.get("birthdate").setValue('');
			this.add_pet_dob_field = false;
		} else {
			this.petsform.get("birthdate").setValue('');
			this.petsform.get("age_number").patchValue('');
			this.add_pet_dob_field = true;
		}
	}
	show_emergency_form() {

			this.show_family_form = false;
			this.nav_value = "EMERGENCY CONTACT";
			this.show_emergency_tab = true;
			this.show_family_other_msg = false;
			this.show_family_kids_form = false;
			

	}
	save_emergency_contact() {
		this.emergencyForm_submitted = true;
		if (this.emergencyform.valid) {
			this.dataService.update_user_funnel(this.emergencyform).subscribe(
				(response:any) => {
					this.show_again_emergency();
						this.get_user_funnel_data();
					this.show_family_emergency_conf = true;
					this.show_emergency_tab = false;
					this.nav_value = "FAMILY / MORE";
				})
		}
	}
	show_again_emergency() {
		this.emergencyform.reset();
		this.emergencyform.get('member_name').clearValidators();
		this.emergencyform.get('member_name').updateValueAndValidity();
		this.emergencyform.get("user_id").setValue(this.loggeduser_id);
		this.emergencyform.get("emergency_member").setValue(1);
		this.emergencyform.get("relation").patchValue('');
		this.emergencyform.get("age_number").patchValue('');
		this.emergencyform.get("gender").patchValue('');
		this.show_family_emergency_conf = false;
		this.gender_pronoun_field_family=false;
		// this.show_emergency_tab = true;
		this.show_pets_confimation=false;
		$(".checkSurfaceEnvironment-2").prop("checked", false);
	}
	show_pets_conf() {

			this.show_family_form = false;
			this.main_nav = "PETS";
			this.nav_value = "ADD";
			this.show_pet_form = true;
			this.show_family_emergency_conf = false;	
			this.petsform.get('name').clearValidators();
			this.petsform.get('name').updateValueAndValidity();
			this.petsform.get('species').clearValidators();
			this.petsform.get('species').updateValueAndValidity();
			this.petsform.get("user_id").setValue(this.loggeduser_id);
			this.petsform.get('name').setValue('');
			this.petsform.get('lastname').setValue('');
			this.petsform.get('species').setValue('');
			this.petsform.get('breed').setValue('');
			this.petsform.get('birthdate').setValue('');
			this.petsform.get('age_number').patchValue('');
			this.petsform.get('percentage').setValue(50);
			this.add_pet_dob_field=true;	
			$(".checkSurfaceEnvironment-2").prop("checked", false);


	}
	show_pets_form() {
		this.nav_value = "";
		this.show_pet_form = true;
		this.show_pets_confimation = false;
	}
	save_pets() {
		this.pets_submitted = true;
		if (this.petsform.valid) {
			this.dataService.update_user_funnel(this.petsform).subscribe(
				(response:any) => {
						this.get_user_funnel_data();
					this.show_pets_confimation  = true;
					this.show_pet_form = false;
					this.nav_value = "MORE";
					// this.petsform.reset();
					this.petsform.get('name').clearValidators();
      				this.petsform.get('name').updateValueAndValidity();
      				this.petsform.get('species').clearValidators();
      				this.petsform.get('species').updateValueAndValidity();
					this.petsform.get("user_id").setValue(this.loggeduser_id);
					this.petsform.get('name').setValue('');
					this.petsform.get('species').setValue('');
					this.petsform.get('breed').setValue('');
					this.petsform.get('lastname').setValue('');
					this.petsform.get('birthdate').setValue('');
					this.petsform.get('age_number').patchValue('');
					this.add_pet_dob_field=true;	
					$(".checkSurfaceEnvironment-2").prop("checked", false);

				})
		}
	}
	profession_chnage(e:any)
	{
		if(e.target.value == "other")
		{
			this.profession_other=true;
		}else{
			this.profession_other=false;
		}
	}
	future_goal_other_show(e:any)
	{
		if(e.target.value == "other")
		{
			this.future_goal_other=true;
		}else{
			this.future_goal_other=false;
		}
	}
	show_profession_form() {
		this.show_family_form=false;
		this.show_start_profession = true;
		this.show_pets_confimation = false;
		this.nav_value = "ACTIVE";
		this.main_nav = "PROFESSION";
		sessionStorage.setItem('continue_from', "3");
		sessionStorage.setItem('user_type','welcome_letter');
		this.dataService.update_user_funnel(this.completesection).subscribe(
				(response:any) => {
					sessionStorage.setItem('user_type','welcome_letter');
						this.get_funnel_checklist();
						this.get_user_funnel_data();
					})
	}
	show_income_profession() {
		$('.showotherprofession').hide();
		$('.showother').hide();
		this.income_professionform.get('other').setValue('');
		this.income_professionform.get('other_income').setValue('');
		this.income_professionform.get('profession').patchValue('');
		this.income_professionform.get('income').patchValue('');
		this.income_professionform.get('other').setValue('');
		this.income_professionform.get('percentage').setValue(70);
		this.income_professionform.get('other_income').setValue('');
		this.show_start_profession = false;
		this.income_profession = true;
		this.nav_value = "CURRENT";
	}
	skip_profession_income() {

		this.show_start_profession = false;
		this.goal_past_work = true;
		this.nav_value = "MORE";
	}
	skip_future_past() {

		this.goal_past_work = false;
		this.almostDone = true;
		this.nav_value = "";
		this.main_nav = "ALMOST DONE";
		this.completesection.get("percentage").setValue(80);
		sessionStorage.setItem('continue_from', "4");
		sessionStorage.setItem('user_type','welcome_letter');
		this.get_funnel_checklist();
		this.dataService.update_user_funnel(this.completesection).subscribe(
				(response:any) => {
						this.get_user_funnel_data();
					})
	}
	skip_goal() {
		this.interestform.reset();
		this.interestform.get("user_id").setValue(this.loggeduser_id);
		this.interestform.get("interest").patchValue('');
		this.interestform.get("interest_form").setValue('interest_form');
		this.interestform.get("percentage").setValue(90);
		this.more_interest=false;
		this.future_goal_end = false;
		this.nav_value = "ADD";
		this.main_nav = "INTERESTS";
		this.show_interests = true;
		this.interest_first_field=true;
	}
	show_past_futute_conf()
	{
		this.income_profession = false;
		this.goal_past_work = true;
		this.nav_value = "MORE";
	}
	save_income_profession() {
		this.income_proForm_submitted = true;
		if (this.income_professionform.valid) {
			this.dataService.update_user_funnel(this.income_professionform).subscribe(
				(response:any) => {
						this.get_user_funnel_data();
					 this.income_profession=false;
					if(this.nav_value == "CURRENT / MORE")
				{
					this.title_profession=true;
					this.show_past_futute_conf();
				}else{
				this.income_professionform.get('profession').patchValue('');
				this.income_professionform.get('income').patchValue('');
				this.income_professionform.get('other').setValue('');
				this.income_professionform.get('other_income').setValue('');
				this.income_professionform.get('other').setValue('');
				this.income_professionform.get('other_income').setValue('');
				this.income_professionform.get('percentage').setValue(70);
				this.income_professionform.get('income_profession_form').setValue('income_profession_form');
					
					
					this.goal_past_work=true;
					this.nav_value = "MORE";
				$('.showotherprofession').hide();
				$('.showother').hide();
				}
				
				
				})
		}
	}
	
	show_current_work()
	{
		this.show_start_profession=false;
		this.show_past_work();
		this.nav_value = "CURRENT";
		this.current_work_title=true;
			this.past_work_title=false;
			this.currently_isChecked=false;
		this.pastworkform.get("current_job").setValue(1);
		this.pastworkform.get("past_work").setValue('past_work');
		$(".currently_checkedbox").prop("checked", false);
	}
	show_past_work() {
		this.cueent_past_present=true;
		this.past_work_title=true;
		this.current_work_title=false;
		this.previous_work = true;
		this.goal_past_work = false;
		this.nav_value = "PAST";
		this.pastworkform.get("profession").patchValue('');	
		this.pastworkform.get("income").patchValue('');
		this.pastworkform.get("date_from").setValue();
		this.pastworkform.get("date_to").setValue('');
		this.pastworkform.get("other").setValue('');
		this.pastworkform.get("past_work").setValue('past_work');
		
		this.profession_other=false;
		this.pastworkform.get("current_job").setValue(0);
		this.pastworkform.get("percentage").setValue(70);
		this.pastworkform.get("update_to_present").setValue('');
	}
	save_previous_work() {
		this.past_work_submitted = true;
		if (this.pastworkform.valid) {
			this.dataService.update_user_funnel(this.pastworkform).subscribe(
				(response:any) => {
						this.get_user_funnel_data();
					this.previous_work = false;
					this.future_goal_end = false;
					this.goal_past_work=true;
					this.main_nav = "PROFESSION";
					this.nav_value = "MORE";
					// this.nav_value = "INTERESTS";
					// this.main_nav = "ICEBREAKER";
					// this.show_interests = true;
				})
		}
	}
	show_future_goal_tab(e:any)
	 {
		this.future_goals = true;
		this.goal_past_work = false;
		this.previous_work = false;
		this.nav_value = "GOALS";
		this.future_goal_end=false;
		if(e.target.value == "reset")
		{
		this.future_goalform.get("profession").patchValue('');	
		this.future_goalform.get("income").patchValue('');
		this.future_goalform.get("other").setValue('');
		this.future_goalform.get("percentage").setValue(70);
		this.future_goalform.get("form_type").setValue('future_goal');
		this.future_goal_other=false;
		this.future_enddate_form.get("end_date").setValue('');
		this.future_enddate_form.get("percentage").setValue(70);
		}
		
		

	}
	save_future_goal() {
		this.dataService.update_user_funnel(this.future_goalform).subscribe(
			(response:any) => {
					this.get_user_funnel_data();
					
				this.future_goal_other=false;
				this.future_goal_end = true;
				this.future_goals = false;
				this.nav_value = "GOALS / END";
				this.future_goalform.get("other").setValue('');
				this.future_enddate_form.get("end_date").setValue('');
			})
	}
	// skip__future_goal() {
	// 	this.future_goal_end = true;
	// 	this.future_goals = false;
	// }
	save_future_end_date() {
		this.dataService.update_user_funnel(this.future_enddate_form).subscribe(
			(response:any) => {
					this.get_user_funnel_data();
				this.future_enddate_form.reset();
				this.future_enddate_form.get("user_id").setValue(this.loggeduser_id);
				this.goal_past_work=true;
				this.future_goal_end = false;
				this.nav_value = "MORE";
			})
	}
	show_interest_descrition()
	{
		this.interest_first_field=false;
		this.show_interests_description=true;
		this.nav_value = "DESCRIBE";
	}
	onchnage_interest(e:any)
	{
		if(e.target.value == "addinterest")
		{
			this.addnewinterest_other=true;

		}else{
			this.addnewinterest_other=false;
		}
		this.selected_interest=e.target.value;
		
	}
	save_intersts() {
		this.interestform_submitted = true;

		this.dataService.update_user_funnel(this.interestform).subscribe(
			(response:any) => {
					this.get_user_funnel_data();
				this.show_interests_description = false;
				this.show_interests=false;
				this.nav_value = "MORE";
				this.more_interest = true;
				this.addnewinterest_other=false;

			})

	}
	skip_interests() {
		this.show_interests_description = true;
		this.nav_value = "DESCRIBE";
		this.main_nav = "INTERESTS";
		this.show_interests = false;
	}

	save_intersts_description() {
		this.dataService.update_user_funnel(this.interestform).subscribe(
			(response:any) => {
				this.get_user_funnel_data();
				this.show_interests_description = false;
				this.nav_value = "ADD MORE";
				this.add_more_interest = true;
			})
	}
	skip_interest_describe() {
		this.show_interests_description = false;
		this.nav_value = "ADD MORE";
		this.add_more_interest = true;
	}
	getotherlegalinterests() {
		this.get_other_legal_details = [];
		this.dataService.get_othet_instdetail().subscribe((data: {}) => {
			this.get_other_legal_details = data;
	});
	
	}
	save_add_more_interest() {
		this.interestform_submitted = true;

		this.dataService.update_user_funnel(this.interestform).subscribe(
			(response:any) => {
		this.add_more_interest = false;
		this.nav_value = "";
		this.main_nav = "OTHER LEGAL MATTER";
		this.other_legal_interest = true;
	})
	}
	skip_more_interest() {
		this.more_interest=false;
		this.more_Legal_matter=false;
		this.add_more_interest = false;
		this.nav_value = "";
		this.main_nav = "OTHER LEGAL MATTER";
		this.other_legal_interest = true;
		
	}
	save_other_legal_interest() {
		console.log('testothjer');
		this.dataService.update_user_funnel(this.other_legal_form).subscribe(
			(response:any) => {
					this.get_user_funnel_data();
					sessionStorage.setItem('continue_from', "5");
					sessionStorage.setItem('user_type','welcome_letter');
					this.get_funnel_checklist();
				this.other_legal_form.get("legal_area").patchValue('');
				this.other_legal_form.get("sub_legal_area").patchValue('');
				this.other_legal_form.get("other_legal_form").setValue('other_legal_form');
				 this.other_legal_form.get("describe").setValue('');
				 this.other_legal_form.get("percentage").setValue(100);
				this.more_Legal_matter=true;
				this.other_legal_interest = false;
				this.nav_value = "MORE"
				
				
			})
	}
	skip_other_legal() {
		// this.more_Legal_matter=false;
		// this.congratulations = true;
		// this.other_legal_interest = false;
		// this.nav_value="";
		// this.main_nav = "PROFILE CONGRATULATIONS";
		$("#success_message_pop").show();
	}
	get_interests() {

		this.interestslist = [];
		this.dataService.get_interests(this.loggeduser_id).subscribe((data: {}) => {
			this.interestslist = data;
		});
	}
	onChange_other_interests(event: any) {
		
		this.get_sub_interests = [];
		this.dataService.get_sub_legal_interests(event).subscribe(
			(response:any) => {
				this.get_sub_interests = response.data;
				this.get_sub_interests.sort();
			});
		var data = { 'legal_id': event, 'user_id': this.loggeduser_id };
		this.dataService.save_legal_matter_details(data).subscribe(
			(response:any) => {
			this.get_user_funnel_data();
			});
	}
	onChange_other_issueform(event:any)
	{
		var data = { 'legal_issue': event, 'user_id': this.loggeduser_id };
		this.dataService.save_legal_matter_details(data).subscribe(
			(response:any) => {
			this.get_user_funnel_data();
			});
	}
	doSomething(event:any)
	{
		var data = { 'legal_description': event.target.value, 'user_id': this.loggeduser_id };
		this.dataService.save_legal_matter_details(data).subscribe(
			(response:any) => {
			this.get_user_funnel_data();
			});
	}
	skip_description() {

		this.show_legal_form = false;
		this.show_family_form = true;
		this.main_nav = "FAMILY";
		this.nav_value = "LIST";

	}
	move_to_summary()
	{
		$('#closebutton_notes').trigger('click');
		this.dataService.update_user_funnel(this.update_funnel_status).subscribe(
			(response:any) => {
		sessionStorage.setItem('movetosummary', 'movetosummary');
		this.router.navigate(['/complete-profile'])
	})
	}
	update_to_present(e:any)
	{
		if(e.target.checked)
		{
			this.cueent_past_present=false;
			this.pastworkform.get("update_to_present").setValue('Present');
		}else{
			this.cueent_past_present=true;
			this.pastworkform.get("update_to_present").setValue('');
		}
	}
	get_funnel_checklist()
	{
		if(sessionStorage.getItem('user_type') == null )
		{
		$("#funnel_popup").modal('show');

		}

		this.dataService.get_funnel_checklist(this.loggeduser_id).subscribe(
				(data:any) => {
					this.qsg = data;

				})
	}

}
