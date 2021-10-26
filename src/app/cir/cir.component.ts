import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Title } from "@angular/platform-browser";
declare var $: any;
@Component({
	selector: 'app-cir',
	templateUrl: './cir.component.html',
	styleUrls: ['./cir.component.css']
})
export class CirComponent implements OnInit {
	
order: string = 'name';
	public href: string = "";
	@Input() name: any;
	statelist: any;
	interestslist: any;
	img_status: any;
	dropdownSettings = {};
	profile_percentage: any;
	show_notes_field = false;
	sub_legal_area_div = true;
	legalhidesaveprenext = true;
	familyhidesaveprenext = true;
	petshidesaveprenext = true;
	interesthidesaveprenext = true;
	otherlegalprevnexr = true;
	basicfprofile_submitted = false;
	legalissueForm_submitted = false;
	interest_submitted = false;
	show_date_error: boolean = false;
	updatefamilyForm_submitted = false;
	editpetForm_submitted = false;
	selectedFile = null;
	disabled = false;
	ShowFilter = true;
	limitSelection = true;
	legalresources: Array<any> = [];
	sublegalresources: Array<any> = [];
	genderlist: any = [];
	genderlist_new: any = [];
	legalInterest: any = [];
	dropdownList: any = [];
	mySettings: Array<any> = [];
	selectedlegalresources: Array<any> = [];
	selected_sub_legalresources: Array<any> = [];
	selectedlegalInterest: Array<any> = [];

	selectedlegalInterests: Array<any> = [];
	// dropdownSettings: IDropdownSettings = {};
	editpetnotesForm: any
	filedata: any
	qsg: any
	petnotes_details: any
	getuseractivity: any
	AddnewInterestForm: any
	imageSrc: any
	selectedpdf: any = [];
	pet_list: any = [];
	fam_list: any = [];
	myForm: any;
	pdfForm: any;
	single_pet: any;
	email: any;
	array: any;
	gender_pronoun_field: boolean = false;
	add_family_dob_field: boolean = true;
	edit_family_dob_field: boolean = true;
	add_pet_dob_field: boolean = true;
	edit_pet_dob_field: boolean = true;
	age_message: boolean = false;
	sub_legal_area_inputfield: boolean = false;
	show_notes_button: boolean = true;
	prevnetbutton: boolean = true;
	buttonaddfmaily: boolean = true;
	savebutton_legal: boolean = true;
	savebutton_pets: boolean = true;
	savebutton_family: boolean = true;
	savebutton_otherlegal: boolean = true;
	age_input: boolean = false;
	show_hide_int_form: boolean = false;
	show_hide_interests_list: boolean = false;
	show_hide_interests_lists: boolean = false;
	showincome: boolean = false;
	update_pic: boolean = false;
	showfamilyaddform: boolean = false;
	showpetaddform: boolean = false;
	showfirstpetform: boolean = false;
	show_hide_int_button: boolean = false;
	interest_form_text: any = "Add Interest";
	showadd_interestform: boolean = false;
	showlegaladdform: boolean = false;
	show_other_legaladdform: boolean = false;
	showfirstfamilyform: boolean = false;
	showothrinterest: boolean = false;
	showothrlegalinterest: boolean = false;
	continuenext: boolean = false;
	showpdfview: boolean = false;
	shownext: boolean = false;
	editfamilyform: boolean = false;
	editpetsform: boolean = false;
	otherrelationfield: boolean = false;
	removeotherbutton: boolean = false;
	removeotherlegalbutton: boolean = false;
	showfirst_legal_form: boolean = false;
	showfirst_othetlegal_form: boolean = false;
	showlegaltable: boolean = true;
	showotherlegaltable: boolean = true;
	single_legaldetails: any;
	single_other_legaldetails: any;
	editsingle_legal_form: boolean = false;
	sub_legal_area: boolean = false;
	editsingle_other_legal_form: boolean = false;
	check_dob: boolean = false;
	estimate_msg_hide: boolean = false;
	age_msg_indiate: boolean = false;
	past_work_submitted: boolean = false;
	future_goal_submitted: boolean = false;
	loggeduser_id: any;
	legal_type_id: any;
	incomedetails: any;
	userlegaldetails: any;
	getuserpetsdetails: any;
	userprofessionaldetails: any;
	userotherlegaldetails: any;
	editpetForm: any;
	data: any = [];
	serverErrors = [];
	userdetails: any;
	cirprofile: any = [];
	BasicProfileForm: any;
	getuserinstdetails: any;
	incomeForm: any;
	profesionForm: any;
	legalissueForm: any;
	interestForm: any;
	otherLegalForm: any;
	legalinterestForm: any;
	getuserfamilydetails: any;
	updatefamilyForm: any;
	familyForm: any;
	familymemberdetails: any;
	notes_details: any = [];
	addressForm: any;
	editpetformdetails: any;
	get_user_legaldetails: any;
	get_other_legal_details: any;
	get_other_legal_nullparent_id: any;
	get_sub_interests: any;
	other_legal_details: any;
	legal_area: any[] = [];
	//past work
	cueent_past_title:boolean=true;
	pastworkform: any
	future_goalform: any;
	past_work: any;
	future_goal: any;
	past_work_other: boolean = false;
	future_work_other: boolean = false;
	professionlist: any = [];
	files: File[] = [];
	public addresses: any[] = [{
		id: 1,
		name: '',
		lastname: '',
		email: '',
		phone: '',
		relation: '',
		age: '',
		age_number: '',
		user_id: '',
		notes: '',
		otherrelation: '',
		emergency_member: '',
		gender: '',
		gender_pronoun: '',
	}];
	public userpets: any[] = [{
		id: 1,
		species: '',
		breed: '',
		birthdate: '',
		age_number: '',
		notes: '',
		user_id: '',
	}];
	public newinterests: any[] = [{
		id: 1,
		name: '',
		describe: '',
		// user_id:'',
	}];
	public userlegal: any[] = [{
		id: 1,
		legal_type: '',
		legal_issue: '',
		legal_issue_description: '',
		user_id: '',
	}];

	public otheruserlegal: any[] = [{
		id: 1,
		legal_area: '',
		sub_legal_area: '',
		user_id: '',
		other: '',
		describe: ''
	}];

	showError() {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
			footer: ''
		})
	}

	showActionError() {
		Swal.fire({
			icon: 'warning',
			title: 'Only one action at a time',
			text: 'Please save your work or cancel to continue',
			footer: ''
		})
	}

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

	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private dataService: DataService,
		private router: Router,
		private titleService: Title,
		private spinner: SpinnerVisibilityService

	) {
		this.titleService.setTitle("lawforall | Complete profile");

	}
	ngOnInit() {

		this.spinner.show();
		if (localStorage.getItem("email") != null) {
			this.email = localStorage.getItem("email");
			this.loggeduser_id = localStorage.getItem("user_id");

		} else {
			this.router.navigate(['/sign-in'])
		}
		if (sessionStorage.getItem("movetosummary") != null) {
			$('#v-pills-summary-tab').trigger('click');
			sessionStorage.removeItem("movetosummary");
		}
		this.get_qsg();
		this.getstates();
		this.get_interests();
		this.check_userprofile_status();
		this.checkuseractivity();
		this.get_other_vertical();
		this.get_user_basic_info();
		this.getpetdetais();
		this.get_user_legal_details();
		this.getotherlegalinterests();
		this.getotherlegalinterests_parent_id();
		this.get_Selected_interest();
		this.getuserfamily();
		// this.getcirprofile();
		this.getuserincomedetails();
		this.get_all_pet_notes();
		this.get_all_family_notes();
		this.get_user_past_work();
		this.get_user_future_goal();


		this.BasicProfileForm = this.formBuilder.group({
			phone: ['', [Validators.required, Validators.pattern("^((\\+1-?)|0)?[0-9]{10}$")]],
			// phone: ['',[Validators.required, Validators.pattern("^([()\- x+]*\d[()\- x+]*){7,16}$")]],
			user_id: ['', Validators.required],
			home_phone: ['', Validators.pattern("^((\\+1-?)|0)?[0-9]{10}$")],
			country: ['', Validators.required],
			city: [''],
			state: ['', Validators.required],
			zip_code: ['', Validators.pattern("^((\\+1-?)|0)?[0-9]{5}$")],
			address: [''],
			name: ['', Validators.required],
			lastname: ['', Validators.required],
			email: ['', Validators.required],
			dob: ['', this.checkDobProfileInitial],
			gender: [''],
			gender_pronoun: [''],
		});
		this.pastworkform = this.formBuilder.group({
			user_id: ['', Validators.required],
			income: [''],
			profession: ['', Validators.required],
			date_from: [''],
			date_to: [''],
			id: [''],
			description: [''],
			other: [''],
			current_job:[0]
		});
		this.future_goalform = this.formBuilder.group({
			user_id: ['', Validators.required],
			income: [''],
			profession: ['', Validators.required],
			start_date: [''],
			end_date: [''],
			id: [''],
			description: [''],
			other: ['']
		});

		this.legalissueForm = this.formBuilder.group({
			legal_type: ['', Validators.required],
			legal_issue: [''],
			legal_issue_description: [''],
			user_id: ['', Validators.required],
			id: ['', Validators.required],
		});

		this.incomeForm = this.formBuilder.group({
			income: ['', Validators.required],
			other_income: [''],
			user_id: ['', Validators.required],
			profession: ['', Validators.required],
			other: ['', Validators.required],
		});
		this.profesionForm = this.formBuilder.group({
			profession: ['', Validators.required],
			other: [''],
			user_id: ['', Validators.required],
		});
		this.interestForm = this.formBuilder.group({
			interest: ['', Validators.required],
			other: [''],
			user_id: ['', Validators.required],
		});
		this.legalinterestForm = this.formBuilder.group({
			legal_area: ['', Validators.required],
			sub_legal_area: [''],
			id: ['', Validators.required],
			user_id: ['', Validators.required],
			other: ['', null],
			describe: ['', null],
		});
		this.pdfForm = this.formBuilder.group({
			file: [null, Validators.required],
			user_id: ['', Validators.required],
			// avatar: ['', Validators.required],
			legal_type: ['', Validators.required],
		});
		this.updatefamilyForm = this.formBuilder.group({
			member_email: [null],
			member_name: ['', Validators.required],
			user_id: ['', Validators.required],
			otherrelation: [null],
			age: ['', this.checkDobProfileInitial],
			relation: [''],
			id: ['', Validators.required],
			lastname: [null],
			phone: [null],
			age_number: [null],
			notes: [null],
			emergency_member: [null],
			gender: [null],
			gender_pronoun: [null],
		});
		this.editpetForm = this.formBuilder.group({
			species: ['', Validators.required],
			name: ['', Validators.required],
			user_id: ['', Validators.required],
			breed: ['', null],
			birthdate: ['', this.checkDobProfileInitial],
			age_number: ['', null],
			notes: ['', null],
			id: ['', Validators.required],
		});
		this.otherLegalForm = this.formBuilder.group({
			user_id: ['', Validators.required],
			legal_area: ['', Validators.required],
			sub_legal_area: ['', Validators.required],
		});
		this.editpetnotesForm = this.formBuilder.group({
			id: ['', Validators.required],
			notes: ['', Validators.required],
		});

		this.dropdownSettings = {
			singleSelection: false,
			idField: 'id',
			textField: 'name',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 3,
			allowSearchFilter: true
		};

		this.selected_sub_legalresources = [
		];
		this.professionlist = ["Physician",
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
		this.genderlist_new = [
			{ id: 1, name: 'Female' },
			{ id: 2, name: 'Male' },
			{ id: 3, name: 'Decline to Answer' },
			{ id: 4, name: 'Other' },

		];
		this.genderlist = [
			{ id: 1, name: 'Female' },
			{ id: 2, name: 'Male' },
			{ id: 3, name: 'Other' },
			{ id: 4, name: 'Prefer not to say' },

		];
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
		})
	}
	get phone() { return this.BasicProfileForm.get('phone'); }
	get user_id() { return this.BasicProfileForm.get('user_id'); }
	get home_phone() { return this.BasicProfileForm.get('home_phone'); }
	get interest() { return this.interestForm.get('interest'); }
	get legal_areas() { return this.legalinterestForm.get('legal_area'); }
	get legal_type() { return this.pdfForm.get('legal_type'); }

	get registerFormControl() {
		return this.BasicProfileForm.controls;
	}
	get legalissueFormControl() {
		return this.legalissueForm.controls;
	}
	get updatefamilyFormControl() {
		return this.updatefamilyForm.controls;
	}
	get editpetFormControl() {
		return this.editpetForm.controls;
	}
	get interestFormControl() {
		return this.interestForm.controls;
	}
	get pastworkFormControl() {
		return this.pastworkform.controls;
	}
	get futuregoalFormControl() {
		return this.future_goalform.controls;
	}
	showothrinterests() {
		this.showothrinterest = true;
		this.removeotherbutton = true;
	}
	removeothrinterests() {
		this.interestForm.get("other").setValue('');
		this.showothrinterest = false;
		this.removeotherbutton = false;
	}
	removeothr_legal_interests() {
		this.showothrlegalinterest = false;
		this.removeotherlegalbutton = false;
	}
	showothrlegalinterests() {
		this.showothrlegalinterest = true;
		this.removeotherlegalbutton = true;
	}
	get_user_basic_info() {
		this.userdetails = [];
		this.dataService.getuserdetails(this.email).subscribe((data: {}) => {
			this.userdetails = data;
			this.BasicProfileForm.get("phone").setValue(this.userdetails.result.phone);
			this.BasicProfileForm.get("user_id").setValue(this.userdetails.result.user_id);
			this.BasicProfileForm.get("name").setValue(this.userdetails.result.name);
			this.BasicProfileForm.get("lastname").setValue(this.userdetails.result.lastname);
			this.BasicProfileForm.get("email").setValue(this.userdetails.result.email);
			this.BasicProfileForm.get("home_phone").setValue(this.userdetails.result.home_phone);
			this.BasicProfileForm.get("country").setValue(this.userdetails.result.country);
			this.BasicProfileForm.get("state").setValue(this.userdetails.result.state);
			this.BasicProfileForm.get("city").setValue(this.userdetails.result.city);
			this.BasicProfileForm.get("zip_code").setValue(this.userdetails.result.zip_code);
			this.BasicProfileForm.get("address").setValue(this.userdetails.result.address);
			this.BasicProfileForm.get("dob").setValue(this.userdetails.result.dob);
			this.BasicProfileForm.get("gender").patchValue(this.userdetails.result.gender);

			if (this.userdetails.result.gender === 'Male' || this.userdetails.result.gender === 'Female' || this.userdetails.result.gender === null) {
				this.gender_pronoun_field = false;
			} else {
				this.BasicProfileForm.get("gender_pronoun").setValue(this.userdetails.result.gender_pronoun);
				this.gender_pronoun_field = true;
			}
			this.legalissueForm.get("user_id").setValue(this.userdetails.result.user_id);
			this.incomeForm.get("user_id").setValue(this.userdetails.result.user_id);
			this.profesionForm.get("user_id").setValue(this.userdetails.result.user_id);
			this.interestForm.get("user_id").setValue(this.userdetails.result.user_id);
			this.legalinterestForm.get("user_id").setValue(this.userdetails.result.user_id);
			this.pdfForm.get("user_id").setValue(this.userdetails.result.user_id);
			this.addressForm?.get("user_id").setValue(this.userdetails.result.user_id);
			this.pastworkform.get("user_id").setValue(this.loggeduser_id);
			this.future_goalform.get("user_id").setValue(this.loggeduser_id);
		});
	}
	show_furure_other(e: any) {
		if (e.target.value == "Other") {
			this.future_work_other = true;
		} else {
			this.future_work_other = false;
			this.future_goalform.get("other").setValue('');
		}

	}
	show_past_other(e: any) {
		if (e.target.value == "Other") {
			this.past_work_other = true;
		} else {
			this.past_work_other = false;
			this.pastworkform.get("other").setValue('');
		}
	}

	save_previous_work() {
		this.past_work_submitted = true;
		if (this.pastworkform.valid) {

			this.dataService.save_past_work(this.pastworkform).subscribe((data: {}) => {
				$('.close_past_work').trigger('click');
				this.show_popup();
				this.get_user_past_work();
			});
		}
	}
	get_user_past_work() {
		this.past_work = [];
		this.dataService.get_user_past_work(this.loggeduser_id).subscribe((data: {}) => {
			this.past_work = data;

		});
	}
	get_user_future_goal() {
		this.future_goal = [];
		this.dataService.get_user_future_goal(this.loggeduser_id).subscribe((data: {}) => {
			this.future_goal = data;

		});
	}
	save_future_goal() {
		this.future_goal_submitted = true;
		if (this.future_goalform.valid) {
			this.dataService.save_future_goal(this.future_goalform).subscribe((data: {}) => {

				$('.close_future_goal').trigger('click');
				this.show_popup();
				this.get_user_future_goal();
			});
		}
	}
	delete_future_goal(id: any) {
		var future_goal_data = this.future_goal.data.find((item: any) => item.id === id)
		Swal.fire({
			title: 'Are you sure?',
			text: "Delete future goal - " + future_goal_data.profession + " ?",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it'
		}).then((result) => {
			if (result.isConfirmed) {
				this.dataService.delete_future_goal(id).subscribe((data: {}) => {
					this.get_user_future_goal();
					this.show_popup();
				})
			}
		})
	}
	delete_past_work(id: any) {
		var past_work_data = this.past_work.data.find((item: any) => item.id === id)
		Swal.fire({
			title: 'Are you sure?',
			text: "Delete Past work experience - " + past_work_data.profession + " ?",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it'
		}).then((result) => {
			if (result.isConfirmed) {
				this.dataService.delete_past_work(id).subscribe((data: {}) => {
					this.get_user_past_work();
					this.show_popup();
				})
			}
		})
	}
	edit_past_work(id: any, profession: any, income: any, date_from: any, date_to: any, description: any, current:any) {
		if(current == 1)
		{
			this.pastworkform.get("current_job").setValue(1);
			this.cueent_past_title=false;
		}else{
			this.pastworkform.get("current_job").setValue(0);
			this.cueent_past_title=true;
		}
		this.pastworkform.get("id").setValue(id);
		this.pastworkform.get("profession").patchValue(profession);
		this.pastworkform.get("income").patchValue(income);
		this.pastworkform.get("date_from").setValue(date_from);
		this.pastworkform.get("date_to").setValue(date_to);
		this.pastworkform.get("description").setValue(description);
	}
	edit_future_goal(id: any, profession: any, income: any, start_date: any, end_date: any, description: any) {
		this.future_goalform.get("id").setValue(id);
		this.future_goalform.get("profession").patchValue(profession);
		this.future_goalform.get("income").patchValue(income);
		this.future_goalform.get("start_date").setValue(start_date);
		this.future_goalform.get("end_date").setValue(end_date);
		this.future_goalform.get("description").setValue(description);
	}
	reset_add_past_from(e:any) {

		this.past_work_submitted = false;
		this.past_work_other=false;
		this.pastworkform.markAsUntouched();
		this.pastworkform.get("id").setValue('');
		this.pastworkform.get("profession").patchValue('');
		this.pastworkform.get("income").patchValue('');
		this.pastworkform.get("date_from").setValue('');
		this.pastworkform.get("date_to").setValue('');
		this.pastworkform.get("description").setValue('');
		this.pastworkform.get("other").setValue('');
		if(e.target.value == "current")
		{
			this.cueent_past_title=false;
			this.pastworkform.get("current_job").setValue(1);
		}else{
			this.cueent_past_title=true;
			this.pastworkform.get("current_job").setValue(0);
		}

	}
	reset_futuregoal_from() {
		this.future_goal_submitted = false;
		this.future_goalform.markAsUntouched();
		this.future_goalform.get("id").setValue('');
		this.future_goalform.get("profession").patchValue('');
		this.future_goalform.get("income").patchValue('');
		this.future_goalform.get("start_date").setValue('');
		this.future_goalform.get("end_date").setValue('');
		this.future_goalform.get("description").setValue('');
	}
	get_qsg() {
		this.qsg = [];
		this.dataService.get_qsg_post(this.loggeduser_id).subscribe((data: {}) => {
			this.qsg = data;
			this.spinner.hide();
		});
	}

	get f() {
		return this.pdfForm.controls;
	}
	get_all_family_notes() {
		this.fam_list = [];
		this.dataService.get_all_family_note(this.loggeduser_id).subscribe((data: {}) => {
			this.fam_list = data;

		});
	}
	get_all_pet_notes() {
		this.pet_list = [];
		this.dataService.get_all_pet_note(this.loggeduser_id).subscribe((data: {}) => {
			this.pet_list = data;

		});
	}
	getstates() {
		this.statelist = [];
		this.dataService.get_state_list().subscribe((data: {}) => {
			this.statelist = data;

		});
	}
	get_interests() {

		this.interestslist = [];
		this.dataService.get_interests(this.loggeduser_id).subscribe((data: {}) => {
			this.interestslist = data;
		});
	}

	checkuseractivity() {
		var data = { 'page': 'updateprofile', 'user_id': this.loggeduser_id };
		this.dataService.check_user_activity(data).subscribe(
			(response) => {
				this.getuseractivity = response.data;
			});
	}

	check_userprofile_status() {
		this.profile_percentage = [];
		this.profile_percentage = [];
		this.dataService.check_userprofile_status(this.loggeduser_id).subscribe((data: {}) => {
			this.profile_percentage = data;

			$(document).ready(function () {
				var value = $('#bar_value').val();
				if (value == "90%") {
					$('#complete_img').show();
					$('#process_img').hide();

				}
				$('.progress_bar').css({ 'width': value });

			});
		});
	}
	show_notes_textarea() {
		this.show_notes_button = false;
		this.show_notes_field = true;
		this.editpetForm.get("notes").setValue('');
	}
	//get family details
	getuserfamily() {
		this.getuserfamilydetails = [];
		this.dataService.getuserfamilydetail(this.loggeduser_id).subscribe((data: {}) => {
			this.getuserfamilydetails = data;

			if (this.getuserfamilydetails.indicator == 1) {
				this.age_msg_indiate = true;
			} else {
				this.age_msg_indiate = false;
			}
		});
	}
	// when cir pdf upload
	uploadFile(event: any) {
		this.selectedFile = event.target.files[0];
		const file = event.target.files[0];
		this.pdfForm.patchValue({
			file: file
		});
		this.pdfForm.get('file').updateValueAndValidity();
	}
	/* Upload button functioanlity */
	savepdfform() {
		this.spinner.show();

		this.dataService.uploadpdffile(this.pdfForm).subscribe(
			(response) => {
				this.spinner.hide();
				this.continuenext = true;
				this.show_popup();
			}, (error) => {
				this.spinner.hide();
				this.serverErrors = error.error;
				this.showError()
			}
		);
	}
	getotherlegalinterests() {
		this.get_other_legal_details = [];
		this.dataService.get_othet_instdetail().subscribe((data: {}) => {
			this.get_other_legal_details = data;
			let interstarr: any = this.get_other_legal_details.data;
			this.legalresources = interstarr;

		});
	}
	getotherlegalinterests_parent_id() {
		this.get_other_legal_nullparent_id = [];
		this.dataService.get_other_parentnull().subscribe((data: {}) => {
			this.get_other_legal_nullparent_id = data;

		});
	}
	// update basic profile
	updateprofile() {
		console.log(this.BasicProfileForm.value)
		this.basicfprofile_submitted = true;
		if (this.BasicProfileForm.valid) {
			this.dataService.updatebasicprofile(this.BasicProfileForm).subscribe(
				(response) => {

					$('.dob_error_msg').hide();
					this.show_popup();
					this.get_user_basic_info();

				}
				, (error) => {
					this.serverErrors = error.error;
					this.showError()
				});
		}
	}
	//gender
	get_gender_value(event: any) {
		var gender = event.target.value;
		if (gender == "Other" || gender == "Prefer not to say" || gender == "Decline to Answer") {
			this.gender_pronoun_field = true;
		} else {
			this.gender_pronoun_field = false;
			this.BasicProfileForm.get("gender_pronoun").setValue('');
		}
	}
	// get cir info
	getcirprofile() {
		this.cirprofile = [];
		this.dataService.getcirprofile().subscribe((data: {}) => {
			this.cirprofile = data;
		});
	}
	// save legal issue type
	savelegalissue() {
		this.legalissueForm_submitted = true;

		if (this.legalissueForm.valid) {
			this.dataService.updatelegalissueForm(this.legalissueForm).subscribe(
				(response) => {

					this.editsingle_legal_form = false;
					this.savebutton_legal = true;
					this.legalhidesaveprenext = true;
					this.prevnetbutton = true;
					this.showfirst_legal_form = false;

					this.get_user_legal_details();
					this.show_popup();

				}, (error) => {
					this.serverErrors = error.error;
					this.showError()
				});
		}
	}
	// save income details
	saveuserlncome() {
		this.dataService.updateuserlncome(this.incomeForm).subscribe(
			(response) => {
				this.show_popup();

			}, (error) => {
				this.serverErrors = error.error;
				this.showError()
			});
	}
	onChange_other_interest(event: any) {
		this.get_sub_interests = [];
		this.dataService.get_sub_legal_interests(event).subscribe(
			(response) => {
				this.get_sub_interests = response.data;
				this.userlegal[0].legal_issue = "";
			})
	}
	onChange_other_interests(event: any) {
		// index:number
		this.get_sub_interests = [];
		this.dataService.get_sub_legal_interests(event).subscribe(
			(response) => {
				if (event == 38) {
					$('.sub_legal_area_div').hide();
					this.sub_legal_area = false;
					this.sub_legal_area_inputfield = true;
				} else {
					$('.sub_legal_area_div').show();
					this.sub_legal_area = true;
					this.sub_legal_area_inputfield = false;
				}


				this.get_sub_interests = response.data;

				if (this.userlegaldetails?.data.legal_type == event && this.userlegaldetails?.data.legal_issue != null) {
					this.legalissueForm.get("legal_issue").patchValue(this.userlegaldetails.data.legal_issue);
				}
				else {
					this.legalissueForm.get("legal_issue").patchValue("");
				}

				if (this.single_other_legaldetails?.data.legal_area == event && this.single_other_legaldetails?.data.sub_legal_areas != null) {
					this.legalinterestForm.get("sub_legal_area").patchValue(this.single_other_legaldetails.data.sub_legal_areas);
				}
				else {
					this.legalinterestForm.get("sub_legal_area").patchValue("");
				}

				let interstarr: any = this.get_sub_interests;
				this.sublegalresources = interstarr;
			});
	}
	onChange(event: any) {
		this.selectedpdf = [];
		this.dataService.getselectedlegalissuepdf(event, this.loggeduser_id).subscribe(
			(response) => {
				this.selectedpdf = response.result;
				localStorage.setItem('legal_type', this.selectedpdf.id);
				this.pdfForm.get("legal_type").setValue(this.selectedpdf.id);
				this.showpdfview = true;
				this.continuenext = true;
			});


	}

	remove_all_interest() {
		this.dataService.remove_all_interest(this.loggeduser_id).subscribe((data: {}) => {
			//remove
		});
	}
	get_other_vertical() {
		this.userotherlegaldetails = [];
		this.dataService.getuserotherlegaldetails(this.loggeduser_id).subscribe((data: {}) => {
			this.userotherlegaldetails = data;
			if (this.userotherlegaldetails.data === "" || this.userotherlegaldetails.data === null) {
				this.userotherlegaldetails = [];
			}
		});
	}
	getuserincomedetails() {
		this.incomedetails = [];
		this.dataService.getuserincomedetails(this.loggeduser_id).subscribe((data: {}) => {
			this.incomedetails = data;
			if(this.incomedetails.data === "" || this.incomedetails.data === null)
			{
				
					this.incomeForm.get("income").patchValue('');
					this.incomeForm.get("other_income").setValue('');
			}else{
				this.incomeForm.get("income").patchValue(this.incomedetails.data.income);
			this.incomeForm.get("other_income").patchValue(this.incomedetails.data.other_income);
			}
			
		});

		this.userprofessionaldetails = [];
		this.dataService.getuserprofessiondetails(this.loggeduser_id).subscribe((data: {}) => {
			this.userprofessionaldetails = data;
			if(this.userprofessionaldetails.data === "" || this.userprofessionaldetails.data === null)
			{
				$('.showotherprofession').hide();
				  this.incomeForm.get("other").setValue('');
				    this.incomeForm.get("profession").patchValue('');
			}else{
			this.incomeForm.get("profession").patchValue(this.userprofessionaldetails.data.profession);
			this.incomeForm.get("other").patchValue(this.userprofessionaldetails.data.other);
			if(this.userprofessionaldetails.data.other !== null || this.userprofessionaldetails.data.other !== '')
			{
				  $('.showotherprofession').show();
			} else{
				  $('.showotherprofession').hide();
				  this.incomeForm.get("other").setValue('');
		
			}
			}
		});
	}
	get_user_legal_details() {
		this.get_user_legaldetails = [];
		this.dataService.get_user_legal_details(this.loggeduser_id).subscribe((data: {}) => {
			this.get_user_legaldetails = data;

		});
	}
	saveuserprofession() {
		this.dataService.updateprofessiondetails(this.profesionForm).subscribe(
			(response) => {
				this.show_popup();
			}, (error) => {
				this.serverErrors = error.error;
				this.showError()
			});
	}

	savelegalinterest() {
		this.dataService.updateothtlegalinterest(this.legalinterestForm).subscribe(
			(response) => {
				this.editsingle_other_legal_form = false;
				this.legalinterestForm.reset()
				this.get_other_vertical();
				this.otherlegalprevnexr = true;
				this.showfirst_othetlegal_form = false;
				this.show_popup();
			}, (error) => {
				this.serverErrors = error.error;
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
					footer: ''
				})
			});

	}
	addAddress() {
		this.savebutton_family = false;
		this.prevnetbutton = false;
		this.addresses.push({
			id: this.addresses.length + 1,
			name: '',
			lastname: '',
			email: '',
			phone: '',
			relation: '',
			age: '',
			age_number: '',
			user_id: '',
			notes: '',
			otherrelation: '',
			emergency_member: '',
			gender: '',
			gender_pronoun: '',
		});
	}
	Add_new_interest() {
		this.newinterests.push({
			id: this.newinterests.length + 1,
			name: '',
			describe: '',
			// user_id:'',
		});
	}
	addPets() {
		this.savebutton_pets = false;
		this.userpets.push({
			id: this.userpets.length + 1,
			name: '',
			species: '',
			breed: '',
			birthdate: '',
			age_number: '',
			notes: '',
			user_id: '',
		});
	}
	addLegals() {
		this.savebutton_legal = true;
		this.userlegal.push({
			id: this.userlegal.length + 1,
			legal_type: '',
			legal_issue: '',
			legal_issue_description: '',
			user_id: '',
		});
	}
	add_other_Legals() {
		this.savebutton_otherlegal = false;
		this.otheruserlegal.push({
			id: this.otheruserlegal.length + 1,
			legal_area: '',
			sub_legal_area: '',
			user_id: '',
			other: '',
			describe: ''
		});
	}
	removeAddresss() {
		this.savebutton_family = true;
		this.prevnetbutton = true;
		this.showfamilyaddform = false;
		this.showfirstfamilyform = false;
	}
	removeAddress(i: number) {
		if (i == 0) {
			this.savebutton_family = true;
			this.prevnetbutton = true;
		}
		this.addresses.splice(i, 1);
	}
	removePet(petForm: NgForm) {
		petForm.reset();
		this.savebutton_pets = true;
		this.showfirstpetform = false;
		this.showpetaddform = false;
		this.prevnetbutton = true;

	}
	removePets(i: number) {
		if (i == 0) {
			this.savebutton_pets = true;
		}
		this.userpets.splice(i, 1);
	}
	removenewinterest() {
		this.show_hide_int_form = false;
		this.showadd_interestform = false;
		this.show_hide_int_button = false;
		this.interesthidesaveprenext = true;
	}
	removenewinterests(i: number) {
		this.newinterests.splice(i, 1);
	}
	removelegalforms(LegalForm: NgForm) {
		this.prevnetbutton = true;
		this.showfirst_legal_form = false;
		this.savebutton_legal = true;
		this.showlegaladdform = false;
		LegalForm.resetForm();

	}
	removelegalform(i: number) {
		if (i == 0) {
			this.savebutton_legal = true;
		}
		this.userlegal.splice(i, 1);

	}
	removeotherlegalforms() {
		this.prevnetbutton = true;
		this.savebutton_otherlegal = true;
		this.show_other_legaladdform = false;
		this.showfirst_othetlegal_form = false;

	}
	removeotherlegalform(i: number) {
		if (i == 0) {
			this.savebutton_otherlegal = true;
		}
		this.otheruserlegal.splice(i, 1);
	}
	//pet details
	update_pet_single_note() {
		this.single_pet = [];
		this.dataService.update_pet_note(this.editpetnotesForm).subscribe(
			(response) => {
				this.show_popup();
				$('#closebutton_notes').trigger('click');
				this.single_pet = response.data;
				this.get_pet_notes(this.single_pet.pet_id);
			});

	}
	getpetdetais() {
		this.getuserpetsdetails = [];
		this.dataService.getuserpetsdetail(this.loggeduser_id).subscribe((data: {}) => {
			this.getuserpetsdetails = data;
			if (this.getuserpetsdetails.indicator == 1) {
				this.estimate_msg_hide = true;
			} else {
				this.estimate_msg_hide = false;
			}
		});
	}
	//family details save
	userfamilydetails(addressForm: NgForm) {
		this.dataService.updateuserfamilydetails(this.addresses, this.loggeduser_id).subscribe(
			(response) => {
				addressForm.resetForm();
				this.getuserfamily();
				this.showfamilyaddform = false;
				this.showfirstfamilyform = false;
				this.savebutton_family = true;
				this.prevnetbutton = true;
				this.show_popup();

			}, (error) => {
				this.serverErrors = error.error;
				this.showError()
			});

	}
	savecheckedinterest(id: any) {
		$('.my_class.ng-untouched.ng-pristine.ng-invalid').hide();
		var data = { 'interest_id': id, 'user_id': this.loggeduser_id };
		this.dataService.save_checked_interest(data).subscribe(
			(response) => {
				//code
			})

	}
	saveuserinterest() {

		this.get_Selected_interest();
		this.show_hide_interests_lists = false;
		this.interestForm.reset();
		this.show_popup();
		this.get_interests();

	}
	get_Selected_interest() {
		this.getuserinstdetails = [];
		this.dataService.getuserinstdetail(this.loggeduser_id).subscribe((data: {}) => {
			this.getuserinstdetails = data;
			if (!!this.getuserinstdetails.other) {
				this.showothrinterest = true;
				this.removeotherbutton = true;
				this.interestForm.get("other").patchValue(this.getuserinstdetails.other);
			}
			let interstarr: any = this.getuserinstdetails.data;
			if (interstarr != "") {
				this.selectedlegalInterests = interstarr;
			}
			else {
				this.selectedlegalInterests = [];
			}



		});
	}
	save_new_interest(AddnewInterestForm: NgForm) {
		var data = { 'interest': this.newinterests, 'user_id': this.loggeduser_id };

		this.dataService.Add_new_interest(data).subscribe(
			(response) => {
				AddnewInterestForm.reset();
				AddnewInterestForm.resetForm({
					interests: '',
				});
				this.saveuserinterest();
				this.show_hide_int_form = false;
				this.showadd_interestform = false;
				this.show_hide_int_button = false;
				this.interesthidesaveprenext = true;
			});
	}
	user_other_legal_details(user_other_legal_details: NgForm) {

		var data = { 'legal': this.otheruserlegal, 'user_id': this.loggeduser_id };
		this.dataService.update_user_other_legals_details(data).subscribe(
			(response) => {

				user_other_legal_details.reset();
				this.get_other_vertical();
				this.prevnetbutton = true;
				this.savebutton_otherlegal = true;
				this.show_other_legaladdform = false;
				this.showfirst_othetlegal_form = false;
				if (response.data == 0) {
					Swal.fire('Already Exists', 'Your Other Legal Details already exists!', 'warning')

				} else {
					this.show_popup();
				}
			}, (error) => {
				this.serverErrors = error.error;
				this.showError()
			});
	}
	show_popup() {
		Swal.fire({
			icon: 'success',
			title: 'Thank you',
			text: 'Your work has been saved!',
			showConfirmButton: false,
			timer: 1500
		})
	}
	user_legal_details(LegalForm: NgForm) {
		var data = { 'legal': this.userlegal, 'user_id': this.loggeduser_id };

		this.dataService.update_user_legals_details(data).subscribe(
			(response) => {
				LegalForm.resetForm();
				this.get_user_legal_details();
				this.prevnetbutton = true;
				this.showfirst_legal_form = false;
				this.savebutton_legal = true;
				this.showlegaladdform = false;
				this.userlegal[0].legal_type = null;
				this.show_popup();

			}, (error) => {
				this.show_popup()

			});
	}
	userpetdetails(petForm: NgForm) {

		var data = { 'pets': this.userpets, 'user_id': this.loggeduser_id };
		this.dataService.update_user_pets_details(data).subscribe(
			(response) => {
				petForm.reset();
				this.getpetdetais();
				this.savebutton_pets = true;
				this.showpetaddform = false;
				this.showfirstpetform = false;
				this.prevnetbutton = true;
				this.age_message = false;
				this.age_input = false;
				this.show_popup();

			}, (error) => {
				this.serverErrors = error.error;
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Fill required fields!',
					footer: ''
				})
			});
	}
	showincomeother() {
		this.showincome = true;
	}
	showfirstfamily() {
		this.prevnetbutton = false;
		this.savebutton_family = false;
		this.showfirstfamilyform = true;
		this.showfamilyaddform = true;

		this.age_input = false;
		this.add_family_dob_field = true;
		this.gender_pronoun_field = false;
		$('.showotherrelationfield').hide();
	}
	showfirstpets(petForm: NgForm) {
		petForm.reset();
		this.savebutton_pets = false;
		this.showfirstpetform = true;
		this.showpetaddform = true;
		this.prevnetbutton = false;

		this.age_input = false;
		this.add_pet_dob_field = true;
		petForm.resetForm({
			birthdate: '',
			age_number: ''
		});
	}
	showotherfirstlegal(otherLegalForm: NgForm) {
		otherLegalForm.reset();
		this.sub_legal_area_inputfield = false;
		this.prevnetbutton = false;
		this.savebutton_otherlegal = false;
		this.showfirst_othetlegal_form = true;
		this.show_other_legaladdform = true;
		this.otheruserlegal[0].legal_area = null;
		this.otheruserlegal[0].sub_legal_area = null;
	}
	showfirstlegal(LegalForm: NgForm) {

		$(".legal_matter_select option[value='']").attr('selected', true)

		this.prevnetbutton = false;
		this.savebutton_legal = false;
		this.showfirst_legal_form = true;
		this.showlegaladdform = true;
		this.userlegal[0].legal_type = null;
		this.userlegal[0].legal_issue = "";
	}

	hidepetsform() {
		this.show_notes_button = true;
		this.show_notes_field = false;
		this.editpetsform = false;
		this.showfirstpetform = false;
		this.petshidesaveprenext = true;
	}
	add_interest() {
		this.show_hide_int_form = true;
		this.showadd_interestform = true;
		this.show_hide_int_button = true;
		this.interest_form_text = "Add Interest"
		this.interesthidesaveprenext = false;
		this.newinterests[0].describe = "";

	}
	edit_notes(id: any, notes: any, pet_id: any) {
		this.editpetnotesForm.get("id").setValue(id);
		this.editpetnotesForm.get("notes").setValue(notes);

	}
	delete_notes(id: any, pet_id: any) {
		Swal.fire({
			title: 'Are you sure?',
			text: "Delete Note?",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it'
		}).then((result) => {
			if (result.isConfirmed) {

				this.dataService.delete_note(id).subscribe(
					(response) => {
						this.get_pet_notes(pet_id);
						Swal.fire(
							'Deleted',
							'Note deleted successfully!',
							'success'
						)
					}, (error) => {
						this.serverErrors = error.error;
						this.showError()
					});

			}
		})
	}
	edit_user_interest(id: any, AddnewInterestForm: NgForm) {
		if (this.showadd_interestform) {
			this.showActionError()

		}
		else {
			this.show_hide_int_form = true;
			this.showadd_interestform = true;
			this.show_hide_int_button = true;
			this.interest_form_text = "Edit Interest"
			this.interesthidesaveprenext = false;
			var edit_legal_data = this.selectedlegalInterests.find(item => item.id === id)
			this.newinterests[0].id = id;
			this.newinterests[0].name = edit_legal_data.name;
			this.newinterests[0].describe = edit_legal_data.describe;
		}

	}
	remove_interests_byid(id: any) {
		var interests_data = this.selectedlegalInterests.find(item => item.id === id)
		if (this.showadd_interestform) {
			this.showActionError()
		}
		else {
			Swal.fire({
				title: 'Are you sure?',
				text: "Delete Interest - " + interests_data.name + " ?",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it'
			}).then((result) => {
				if (result.isConfirmed) {
					// deletefamilymember
					var data = { 'id': id, 'user_id': this.loggeduser_id };
					this.dataService.remove_interests(data).subscribe(
						(response) => {
							this.get_Selected_interest();
							this.get_interests();
							this.interestForm.reset();
							this.show_hide_int_form = false;
							this.showadd_interestform = false;
							this.show_hide_int_button = false;
							Swal.fire(
								'Deleted',
								'Interest deleted successfully!',
								'success'
							)
						}, (error) => {
							this.serverErrors = error.error;
							this.showError()
						});

				}
			})
		}
	}
	deletefamilymember(id: any) {
		var family_members_data = this.getuserfamilydetails.data.find((item: any) => item.id === id)
		if (this.showfamilyaddform || this.editfamilyform) {
			this.showActionError()
		} else {
			Swal.fire({
				title: 'Are you sure?',
				text: "Delete Family Member - " + family_members_data.member_name + " " + family_members_data.member_last_name + " ?",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it'
			}).then((result) => {
				if (result.isConfirmed) {
					// deletefamilymember
					this.dataService.deletefamilymember(id).subscribe(
						(response) => {
							this.getuserfamily();
							Swal.fire(
								'Deleted',
								'Family Member deleted successfully!',
								'success'
							)
						}, (error) => {
							this.serverErrors = error.error;
							this.showError()
						});

				}
			})
		}
	}
	delete_legal_details_byid(id: any) {
		if (this.showlegaladdform || this.editsingle_legal_form) {
			this.showActionError()
		} else {
			var legal_details = this.get_user_legaldetails.data.find((item: any) => item.id === id)
			Swal.fire({
				title: 'Are you sure?',
				text: "Delete Legal Matter - " + legal_details.name + " (" + legal_details.sub_name + ") ?",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it'
			}).then((result) => {
				if (result.isConfirmed) {
					// deletefamilymember
					this.dataService.delete_legal_details_byid(id).subscribe(
						(response) => {
							this.get_user_legal_details();
							Swal.fire(
								'Deleted',
								'Legal matter deleted successfully!',
								'success'
							)
						}, (error) => {
							this.serverErrors = error.error;
							this.showError()
						});

				}
			})
		}
	}
	delete_other_legal_details_byid(id: any) {
		var other_legal_interests_data = this.userotherlegaldetails.data.find((item: any) => item.id === id)
		if (this.show_other_legaladdform || this.editsingle_other_legal_form) {
			this.showActionError()
		} else {
			Swal.fire({
				title: 'Are you sure?',
				text: "Delete Other Legal Interests? " ,
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it'
			}).then((result) => {
				if (result.isConfirmed) {
					// deletefamilymember
					this.dataService.delete_other_legal_details_byid(id).subscribe(
						(response) => {
							this.get_other_vertical();
							Swal.fire(
								'Deleted',
								'Legal issue deleted successfully!',
								'success'
							)
						}, (error) => {
							this.serverErrors = error.error;
							this.showError()
						});

				}
			})
		}
	}
	deletepet(id: any) {
		if (this.showpetaddform || this.editpetsform) {
			this.showActionError()
		}
		else {
			var pet_data = this.getuserpetsdetails.data.find((item: any) => item.id === id)
			Swal.fire({
				title: 'Are you sure?',
				text: "Delete Pet - " + pet_data.name + " ?",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it'
			}).then((result) => {
				if (result.isConfirmed) {
					// deletefamilymember
					this.dataService.deletepet(id).subscribe(
						(response) => {
							this.getpetdetais();
							this.showpetaddform = false;
							this.showpetaddform = false;
							Swal.fire(
								'Deleted',
								'Pet deleted successfully!',
								'success'
							)
						}, (error) => {
							this.serverErrors = error.error;
							this.showError()
						});

				}
			})
		}
	}
	edit_other_legal_issue(id: any) {
		if (this.show_other_legaladdform || (this.legalinterestForm.dirty && this.editsingle_other_legal_form)) {
			this.showActionError()

		} else {
			this.single_other_legaldetails = [];
			this.showfirst_othetlegal_form = true;
			this.editsingle_other_legal_form = true;
			this.otherlegalprevnexr = false;

			this.other_legal_details = [];
			this.dataService.getotherlegaldetailsbyid(id).subscribe((data: {}) => {
				this.single_other_legaldetails = data;

				if (this.single_other_legaldetails.data.legal_area == 38) {
					$('.sub_legal_area_div').hide();
					this.sub_legal_area_inputfield = true;
					this.legalinterestForm.get("other").setValue(this.single_other_legaldetails.data.other);
				} else {
					this.sub_legal_area_inputfield = false;
					$('.sub_legal_area_div').show();
				}
				this.legalinterestForm.get("id").setValue(this.single_other_legaldetails.data.id);
				this.legalinterestForm.get("describe").setValue(this.single_other_legaldetails.data.describe);
				this.legalinterestForm.get("legal_area").patchValue(this.single_other_legaldetails.data.legal_area);
				this.legalinterestForm.get("sub_legal_area").patchValue(this.single_other_legaldetails.data.sub_legal_areas);
				this.legalinterestForm.get("user_id").setValue(this.loggeduser_id);

			});
		}
	}
	edit_legal_issue(id: any) {
		if (this.showlegaladdform || (this.editsingle_legal_form && this.legalissueForm.dirty)) {
			this.showActionError()

		} else {
			this.prevnetbutton = false;
			this.showfirst_legal_form = true;
			this.savebutton_legal = true;
			this.legalhidesaveprenext = false;
			this.single_legaldetails = [];
			this.editsingle_legal_form = true;
			this.userlegaldetails = [];
			this.dataService.getuserlegaldetails(id).subscribe((data: {}) => {
				this.userlegaldetails = data;
				this.legalissueForm.get("id").setValue(this.userlegaldetails.data.id);
				this.legalissueForm.get("legal_issue_description").setValue(this.userlegaldetails.data.legal_issue_description);
				this.legalissueForm.get("legal_type").patchValue(this.userlegaldetails.data.legal_type);
				this.legalissueForm.get("legal_issue").patchValue(this.userlegaldetails.data.legal_issue);
				this.legalissueForm.get("user_id").setValue(this.loggeduser_id);
			});
		}
	}
	hidefamilyform() {
		this.show_notes_button = true;
		this.buttonaddfmaily = true;
		this.updatefamilyForm.reset();
		this.editfamilyform = false;
		this.familyhidesaveprenext = true;
	}
	get_pet_notes(id: any) {
		this.dataService.get_pet_notes(id).subscribe((data: any) => {
			this.petnotes_details = data.data;

		});
	}

	get_family_notes(id: any) {
		this.dataService.get_family_notes(id).subscribe((data: any) => {
			this.notes_details = data.data;

		});
	}

	editfamilymember(id: any) {
		if (this.showfamilyaddform || (this.editfamilyform && this.updatefamilyForm.dirty)) {
			this.showActionError()

		} else {
			this.familymemberdetails = [];
			this.notes_details = [];
			this.editfamilyform = true;
			this.buttonaddfmaily = false;
			this.familyhidesaveprenext = false;
			this.get_family_notes(id);


			this.dataService.editfamilymember(id).subscribe(
				(response) => {

					this.familymemberdetails = response.data;
					console.log(this.familymemberdetails)
					this.updatefamilyForm.get("id").setValue(this.familymemberdetails.id);
					this.updatefamilyForm.get("user_id").setValue(this.familymemberdetails.user_id);
					this.updatefamilyForm.get("member_name").setValue(this.familymemberdetails.member_name);
					this.updatefamilyForm.get("member_email").setValue(this.familymemberdetails.member_email);
					this.updatefamilyForm.get("age").setValue(this.familymemberdetails.age);
					this.updatefamilyForm.get("relation").patchValue(this.familymemberdetails.relation);
					this.updatefamilyForm.get("otherrelation").setValue(this.familymemberdetails.otherrelation);
					this.updatefamilyForm.get("lastname").setValue(this.familymemberdetails.lastname);
					this.updatefamilyForm.get("phone").setValue(this.familymemberdetails.phone);
					this.updatefamilyForm.get("emergency_member").patchValue(this.familymemberdetails.emergency_member);
					if (this.familymemberdetails.gender == null) {
						this.updatefamilyForm.get("gender").setValue("");
					}
					else {
						this.updatefamilyForm.get("gender").setValue(this.familymemberdetails.gender);
					}


					if (this.familymemberdetails.gender === 'Male' || this.familymemberdetails.gender === 'Female' || this.familymemberdetails.gender === null) {
						this.gender_pronoun_field = false;
					} else {
						this.updatefamilyForm.get("gender_pronoun").setValue(this.familymemberdetails.gender_pronoun);
						this.gender_pronoun_field = true;
					}

					if (this.familymemberdetails.emergency_member != 0) {
						$(".emgency_member_contact").prop("checked", true);
					} else {
						$(".emgency_member_contact").prop("checked", false);
					}
					if (this.familymemberdetails.age_number != 0 && this.familymemberdetails.age_number != null) {

						this.updatefamilyForm.get("age_number").patchValue(this.familymemberdetails.age_number);
						$(".checkSurfaceEnvironment-2").prop("checked", true);
						this.age_input = true;
						this.edit_family_dob_field = false;
						this.updatefamilyForm.get("age").setValue("");

					} else {
						$(".checkSurfaceEnvironment-2").prop("checked", false);
						this.updatefamilyForm.get("age").setValue(this.familymemberdetails.age);
						this.age_input = false;
						this.edit_family_dob_field = true;
						this.updatefamilyForm.get("age_number").patchValue("");
					}

					if (this.familymemberdetails.otherrelation == null || this.familymemberdetails.otherrelation === "") {

						$('.showotherrelationfield').hide();
					} else {

						$('.showotherrelationfield').show();
					}
				});
		}
	}


	updatefamilymember() {
		this.updatefamilyForm_submitted = true;
		if (this.updatefamilyForm.valid) {
			this.dataService.update_family_member_details(this.updatefamilyForm).subscribe(
				(response) => {
					this.updatefamilyForm.reset();
					this.editfamilyform = false;
					this.getuserfamily();
					this.buttonaddfmaily = true;
					this.familyhidesaveprenext = true;
					this.show_notes_button = true;
					this.show_notes_field = false;
					this.show_popup();
				}, (error) => {
					this.serverErrors = error.error;
					this.showError()
				});
		}


	}
	editpetdetails(id: any) {
		if (this.showpetaddform || (this.editpetsform && this.editpetForm.dirty)) {
			this.showActionError()
		}
		else {
			this.petnotes_details = [];
			this.get_pet_notes(id);
			this.showfirstpetform = true;
			this.petshidesaveprenext = false;
			this.editpetformdetails = [];
			this.editpetsform = true;
			this.dataService.get_single_pet_details(id).subscribe(
				(response) => {
					this.editpetformdetails = response.data;

					this.editpetForm.get("id").setValue(this.editpetformdetails.id);
					this.editpetForm.get("user_id").setValue(this.editpetformdetails.user_id);
					this.editpetForm.get("name").setValue(this.editpetformdetails.name);
					this.editpetForm.get("breed").setValue(this.editpetformdetails.breed ?? "");
					this.editpetForm.get("species").setValue(this.editpetformdetails.species);
					this.editpetForm.get("birthdate").patchValue(this.editpetformdetails.birthdate ?? "");
					this.editpetForm.get("age_number").patchValue(this.editpetformdetails.age_number ?? "");
					this.editpetForm.get("notes").setValue("");

					if (this.editpetformdetails.age_number != null && this.editpetformdetails.age_number != 0) {
						this.editpetForm.get("age_number").patchValue(this.editpetformdetails.age_number);
						$(".checkSurfaceEnvironment-1").prop("checked", true);
						this.age_input = true;
						this.age_message = true;
						this.edit_pet_dob_field = false;

					} else {
						$(".checkSurfaceEnvironment-1").prop("checked", false);
						this.age_message = false;
						this.age_input = false;
						this.edit_pet_dob_field = true;
						this.editpetForm.get("age_number").patchValue(0);
					}
				});
		}
	}
	updatepetdetails() {
		this.editpetForm_submitted = true;
		if (this.editpetForm.valid) {
			this.dataService.update_single_pet_details(this.editpetForm).subscribe(
				(response) => {
					this.editpetsform = false;
					this.editpetForm.reset(this.editpetForm.value)

					this.getpetdetais();
					this.showfirstpetform = false;
					this.petshidesaveprenext = true;
					this.show_notes_button = true;
					this.show_notes_field = false;
					this.show_popup();

				}, (error) => {
					this.serverErrors = error.error;
					this.showError()
				});
		}
	}
	counter(i: number) {
		return new Array(i);
	}

	onChangeage_edit_family(e: any) {
		if (e.target.checked) {

			this.age_input = true;
			this.age_message = true;
			this.edit_family_dob_field = false;
		} else {

			this.updatefamilyForm.get("age").setValue('');
			this.updatefamilyForm.get("age_number").patchValue('');
			this.age_input = false;
			this.age_message = false;
			this.edit_family_dob_field = true;
		}
	}
	edit_pet_age_number(e: any) {
		if (e.target.checked) {

			this.age_input = true;
			this.age_message = true;
			this.edit_pet_dob_field = false;
		} else {

			this.editpetForm.get("birthdate").setValue('');
			this.editpetForm.get("age_number").patchValue('');
			this.age_input = false;
			this.age_message = false;
			this.edit_pet_dob_field = true;

		}
	}
	onChange_pet_edit(e: any, petForm: NgForm) {
		if (e.target.checked) {
			this.age_input = true;
			this.age_message = true;
			this.add_pet_dob_field = false;
		} else {
			petForm.resetForm({
				birthdate: '',
				age_number: ''
			});
			this.age_input = false;
			this.age_message = false;
			this.add_pet_dob_field = true;
		}
	}
	onChangeage(e: any, addressForm: NgForm) {

		if (e.target.checked) {

			this.age_input = true;
			this.age_message = true;
			this.add_family_dob_field = false;
		} else {


			this.age_input = false;
			this.age_message = false;
			this.add_family_dob_field = true;
		}
	}
	hidelegal_issue_editform() {
		this.editsingle_legal_form = false;
		this.savebutton_legal = true;
		this.legalhidesaveprenext = true;
		this.prevnetbutton = true;
		this.showfirst_legal_form = false;

	}
	hide_legalinterestForm() {
		this.editsingle_other_legal_form = false;
		this.otherlegalprevnexr = true;
		this.showfirst_othetlegal_form = false;
	}
	onRemove(event:any) {
  
  this.files.splice(this.files.indexOf(event), 1);
}
	onSelectcirpdf(event:any) {
	this.files.push(...event.addedFiles);  
    
  
      
        for (var i = 0; i < this.files.length; i++) {   
        	//this.PdfForm.get('file').setValue(this.files[i]);
   
        }  
           const formData = new FormData();
           this.files.forEach(file => {
		    formData.append('file[]', file, file.name);
		    formData.append('user_id', this.loggeduser_id);
		 })   
        this.http.post('https://reporting.lawforall.com/portal/api/auth/uploadcirpdf', formData)  
        .subscribe(res => {  
           console.log(res);  
           alert('Uploaded Successfully.');  
        })  
}

	

}