import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiManager } from '../services/api';
import { ProductsService } from '../services/products.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  ProductListArray:any;
  ProductListArray0:any;
  filename:any;
  fileSelected:any;
  imageUrl:any;
  resumebase64:any;
  data:any;
  constructor(private sant: DomSanitizer,private toastr:ToastrService,private product:ProductsService,private ActivatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.listingData();
  }
  editProduct(value:any){
    let data= this.ProductListArray0.filter((item:any) => item.ID===value)

    this.router.navigate(['/listing/listingedit'],data)
  }
  deleteProduct(value:any){
    this.product.addData(ApiManager.D_PRODUCT,{'ID':value}).subscribe(response => {
      this.toastr.success("Product deleted successfully.")
      this.listingData();
    }, err=>{
      this.toastr.warning("Something is wrong !")

    })

  }
  listingData(){
    this.product.ListData(ApiManager.LISTING_API,{}).subscribe(data => {
      this.ProductListArray=data;
      this.ProductListArray0=this.ProductListArray.payload.data;
    })
  }
}
