import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import API_URL from '../API_URL';
declare const $: any;
declare const ready: any
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  page = "product"
  categogy:any
  product:any
  path:any
  pageination: any
  constructor(private titleService:Title,private httpClient:HttpClient,private route: ActivatedRoute) {
    this.titleService.setTitle("Product");
  }

  ngOnInit(): void {
    this.pageination = []
    $("#preloader").css({opacity: 1, visibility: "unset", display: "unset"})
    this.path = this.route.snapshot.params['category']
    this.httpClient.get(API_URL.GET("getCategory")).subscribe((data:any)=>{
      this.categogy = data
    })
    let id = this.path ==""?"all":this.path
    this.httpClient.get(API_URL.GET("getProduct/"+id)).subscribe((data:any)=>{
      this.product = data[0]
      let page = Math.ceil(data[1]/6) - 1
      console.log(page)
      for(let i = 1; i<=page; i++){
        this.pageination.push(i)
      }
      console.log(data)
      ready()
    })
    // $grid.isotope({
    //   filter: ".des",
    // });
  }

  cateOnClick(categogy:any,e:any,page = 1): void{
    this.product = null
    $(".filters ul li").removeClass("active");
    $(e.target).addClass("active");
    $("#preloader").css({opacity: 1, visibility: "unset", display: "unset"})
    this.path = categogy == "all"?"":categogy
    this.httpClient.get(API_URL.GET("getProduct/"+categogy,{page})).subscribe((data:any)=>{
      this.product = data[0]
      console.log(data)
      ready()
      let page = Math.ceil(data[1]/6) - 1
      console.log(page)
      for(let i = 1; i<=page; i++){
        this.pageination.push(i)
      }
    })
  }

}
