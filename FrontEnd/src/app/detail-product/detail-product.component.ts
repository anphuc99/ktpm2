import { Component, OnInit } from '@angular/core';
import {Title,} from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import API_URL from '../API_URL';
import Gol from '../GolValiable';
declare const $: any;
declare const ready: any
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  page = "detail"
  title: any
  detail: any
  constructor(private titleService:Title,private route: ActivatedRoute, private httpClient:HttpClient) {
    this.titleService.setTitle("detail");
  }

  ngOnInit(): void {
    $("#preloader").css({opacity: 1, visibility: "unset", display: "unset"})
    let id = this.route.snapshot.params['id']
    this.httpClient.get(API_URL.GET("detail/"+id)).subscribe((data: any)=>{
      data.price = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(data.price)
      data.discount = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(data.discount)
      this.detail = data
      ready()
    })
  }

  addToCart(id:number){
    let cart = Gol.getCookie("cart")
    if(cart ==""){
      cart = "[]"
    }

    let data = JSON.parse(cart)
    let rs
    for(let e of data){
      if(e.id == id){
        e.amount++
        rs = true
        break
      }
    }

    if(!rs){
      data.push({
        id: id,
        amount: 1
      })
    }

    Gol.setCookie("cart",JSON.stringify(data),30)

    alert("Add to cart successfully!")
  }

}
