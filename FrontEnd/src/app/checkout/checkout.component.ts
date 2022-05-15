import { Component, OnInit } from '@angular/core';
import {Title,} from "@angular/platform-browser";
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import API_URL from '../API_URL';
import Gol from '../GolValiable';
declare const $: any;
declare const ready: any

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  page = "checkout"
  info:any = {
    name: null,
    number: null,
    email: null,
    address: null,
    note: null,
  }
  sum:any
  constructor(private titleService:Title, private httpClient:HttpClient, private router: Router) { }

  ngOnInit(): void {
    $("#preloader").css({opacity: 1, visibility: "unset", display: "unset"})
    let cart = JSON.parse(Gol.getCookie("cart"))
    console.log(cart.length)
    if(cart.length <= 0) {
      this.router.navigate(["/"])
      return
    }
    this.httpClient.post(API_URL.GET("getCart"),{cart: cart}).subscribe((data)=>{
      this.sum = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(this.total(data))
      ready()
    })
  }

  total(cart:any){
    let total = 0
    cart.forEach((e:any) => {
      total+= e.price*e.amount
    });
    return total
  }

  onSubmit(){
    let Continue:Boolean = true
    for (const [key, value] of Object.entries(this.info)) {
      if(value == null){
        this.info[key] = ""
        Continue = false
      }
    }
    if(Continue){
      let cart = JSON.parse(Gol.getCookie("cart"))
      this.httpClient.post(API_URL.GET("checkout"),{cart,info: this.info}).subscribe((data:any)=>{
        if(data.rs){
          alert("Order sent")
          Gol.setCookie("cart","[]")
          this.router.navigate(["/"])
        }
        else{
          alert("Error")
          console.log(data.msg)
        }
      })
    }
  }

}
