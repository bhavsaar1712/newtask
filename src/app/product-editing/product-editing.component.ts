import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiManager } from '../services/api';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-editing',
  templateUrl: './product-editing.component.html',
  styleUrls: ['./product-editing.component.css']
})
export class ProductEditingComponent implements OnInit {
  RegisterForm!: FormGroup;
  filename:any;
  imageUrl:any;
  bfile:any;
  resumebase64:any;
  fileSelected:any;
  buttonMode:any;
  ParamRoute:any;
  navigation:any;
  data:any;
              constructor(private toastr:ToastrService,private product:ProductsService,private sant: DomSanitizer,private build:FormBuilder,private activatedRoute:ActivatedRoute,private router:Router) {
                this.navigation = this.router.getCurrentNavigation();
                  this.data=this.navigation?.extras;
               }

  ngOnInit(): void {
    this.routerMode();
    this.register();
    if(this.data.length > 0)
    this.editsetdata();
  }
  // to se focus
  setFocus(targetInput: any) {
    var targetElem = document.getElementById(targetInput);
    setTimeout(function waitTargetElem() {
      if (document.body.contains(targetElem)) {
        targetElem!.focus();
      } else {
        setTimeout(waitTargetElem, 100);
      }
    }, 100);
  }
  // to set the data in edit mode
  editsetdata(){
    this.RegisterForm.get('Name')?.setValue(this.data[0].Name);
    // this.RegisterForm.get('image')?.setValue(this.data[0].image);
  }
  // this router for change mode
  routerMode(){
    this.ParamRoute=this.activatedRoute.snapshot.routeConfig?.path;
    if(this.ParamRoute=="listing/listingAdd"){
      this.buttonMode="Add"
    }else if(this.ParamRoute=="listing/listingedit"){
      this.buttonMode="Update"

    }
  }
  register(){
    this.RegisterForm=this.build.group({
      Name:new FormControl(null,Validators.required),
      image:new FormControl(null,Validators.required),
      Email:new FormControl(null,Validators.required),
    });
  }
  onSelectNewFile(elemnt: any): void {
    this.filename=elemnt.target.files[0].name;
    if (elemnt.target.files.length == 0) return;
    this.fileSelected = (elemnt.target.files as FileList)[0];
    this.imageUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () => {
      this.resumebase64 = reader.result as string;


    }



  }
  OnSubmit(RegisterForm: any){
    if(this.RegisterForm.status==="VALID"){
      this.RegisterForm.value['data']=this.resumebase64.split(',').pop();

      if(this.buttonMode==="Add"){

        this.product.addData(ApiManager.ADD_PRODUCT,this.RegisterForm.value).subscribe(response =>{
         this.toastr.success("name Added successfully.")
         this.router.navigate(['/listing']);
        }, err =>{
         this.toastr.warning("Something went wrong.")
        })
      }else if(this.buttonMode==="Update"){
        this.RegisterForm.value['ID']=this.data[0].ID;
        this.product.addData(ApiManager.EDIT_PRODUCT,this.RegisterForm.value).subscribe(response =>{
          this.toastr.success("Name Updated successfully.")
          this.router.navigate(['/listing']);
         }, err =>{
          this.toastr.warning("Something went wrong.")
         })
      }
    }else{
      if(this.RegisterForm.value['Name']==null){
        this.toastr.warning("Name is required !")
        this.setFocus('name');

      }else if(this.RegisterForm.value['Email']==null){
        this.toastr.warning("Email is required !")
        this.setFocus('description');

      }
    }
  }

}
