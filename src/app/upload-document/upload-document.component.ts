import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { FormControl, FormBuilder ,Validators } from '@angular/forms';
import { Router ,ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import Swal from 'sweetalert2';
import { empty } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css']
})
export class UploadDocumentComponent implements OnInit {
  images:any = [];
  event:any;
  files:any=[];
  myerror=false;
  mysuccess=false;
  notes_list:any;
  notes_listformodal:any;
  dataArr:any;
  myForm = new FormGroup({});
  loggeduser_id:any;
  imagepath:any;
  stringJson: any;
  stringObject: any;
  CirdocNotes:any;
  addnotesfor:any;
  notesadded:boolean=false;
  notes_id:any;
  remaining:any;
  uploadtable:boolean=true;
  constructor(private dataService: DataService,
        private formBuilder: FormBuilder,
           private router: Router,
            ) { 

  }

  ngOnInit(): void {
    // var remember_token = localStorage.getItem("remember_token") || sessionStorage.getItem("remember_token");
	  // if (localStorage.getItem("token") != null && remember_token!=null) {
		// 	 this.loggeduser_id =localStorage.getItem("user_id");
			
		// }else{
		// 	this.router.navigate(['/sign-in']);
			
		// }
    this.loggeduser_id =localStorage.getItem("user_id");
    console.log('casruserid',this.loggeduser_id);
    this.CirdocNotes = this.formBuilder.group({
      id: ['', Validators.required],
      user_id: ['', Validators.required],
      notes: ['', Validators.required],
      doc_id:['']
    });
    this.getCirdataData();
    this.notesadded=true;
    this.get_all_doc_notes();
  }
  get f(){
    return this.myForm.controls;
  }
  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      
       if(!this.validateFile(event.target.files[0].name))
       {
        this.myerror=true;
        
        
       }
       else
       {
        this.myerror=false;
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
    
                  reader.onload = (event:any) => {
                    
                    this.images.push(event.target.result); 
    
                    this.myForm.patchValue({
                        fileSource: this.images
                    });
                  }
    
                  reader.readAsDataURL(event.target.files[i]);
            
                  
          }
        this.files=(event.target.files);
       }
         
       
    }
    else
    {
      this.myerror=true;
    }
  }
  show_add_notesnew(id:any,title:any)
  {
    this.notesadded=true;
    this.notes_id=id;
    this.get_all_doc_notes();
  }
  insertTeam(form:NgForm)
  {
    // console.log('dff',form.value);
    var myarray: any[] = [];
    var imgval: any[] = [];
     var formData:any= new FormData();
  
   var g : number=0;
   Array.from(this.files).forEach((v: any) => {
    
    myarray.push(v.name);
    imgval.push(v);
    
    formData.append("image"+g,v,v.name);
   g++;
  });
  formData.append("filename",myarray);
  formData.append('user_id', this.loggeduser_id);
  this.dataService.uploadcir_profile_new(formData).subscribe(res=>{
    $('.uploadimg').hide();
    $('input[name=image').val('');
    this.myerror=false;
    this.mysuccess=true;
    this.getCirdataData();
    this.myForm.reset();  
    this.files=null;
     Swal.fire(
              'Thank You',
              'Document uploaded successfully!',
              'success'
            )
    },(error) => {
      this.myerror=true;
      this.mysuccess=false;
    });
  }
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
      if (ext.toLowerCase() == 'pdf') {
          return true;
      }
      else {
          return false;
      }
  }
  removeImage(i: any) {
		this.images.splice(i, 1);
	  }
    getCirdataData()
    {
   
      this.dataService.getCirdata_doc(this.loggeduser_id).subscribe((res:any)=>{
       
        this.dataArr=res.data;
        // this.stringObject = JSON.parse(this.stringJson);
        this.imagepath=res.path;
        this.remaining = res.size;
        $(".remainingsize").html(res.size)
      })
    }
   deletefile(id:any)
   {
     Swal.fire({
      title: 'Are you sure?',
      text: "Delete Document?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result:any) => {
      if (result.isConfirmed) {

        this.dataService.delete_cir_doc(id).subscribe(
          (response) => {
             this.getCirdataData();
            Swal.fire(
              'Document',
              'Document deleted successfully!',
              'success'
            )
          });

      }
    })
   }
   add_doc_notes(id:any,user_id:any,title:any)
   {
     this.CirdocNotes.get("id").setValue(id);
     this.CirdocNotes.get("user_id").setValue(user_id);
     this.CirdocNotes.get("notes").setValue('');
     this.CirdocNotes.get("doc_id").setValue('');
     this.addnotesfor = title;
   }
   edit_doc_notes(id:any,notes:any,doc_id:any,user_id:any)
   {
    this.CirdocNotes.get("notes").setValue(notes);
    this.CirdocNotes.get("doc_id").setValue(id);
      this.CirdocNotes.get("id").setValue(doc_id);
     this.CirdocNotes.get("user_id").setValue(user_id);
   }
   save_doc_notes()
  {
    this.dataService.save_cir_doc_notes(this.CirdocNotes).subscribe((res:any)=>{
          $('#closebutton_notes').trigger('click');
          this.notes_id = this.CirdocNotes.get('id').value;
           this.notesadded=true;
           this.notes_id = isNaN;
          this.get_all_doc_notes();
        Swal.fire(
              'Document Note',
              'Document note added successfully!',
              'success'
            )
    })
  }
  deletefilenotes(id:any)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete Note?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result:any) => {
      if (result.isConfirmed) {

        this.dataService.delete_cir_doc_filenotes(id).subscribe(
          (response) => {
            this.notesadded=false;
            this.get_all_doc_notes();
            Swal.fire(
              'Document',
              'Note deleted successfully!',
              'success'
            )
          });

      }
    })
  }
  get_all_doc_notes() {
    this.notes_list = [];
    this.notesadded=true;
    var mydata = { 'doc_id': this.notes_id, 'user_id': this.loggeduser_id };
    this.dataService.get_all_doc_notes(mydata).subscribe((data: {}) => {
      
      if(!isNaN(this.notes_id))
      {
        this.notes_list = data;
        console.log('notelist',data)
      }
      else{

        this.notes_listformodal=data;
        console.log('allnotelist',data)
      }
    });
  }
}
