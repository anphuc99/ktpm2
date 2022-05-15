import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import API_URL from '../API_URL';
import Gol from '../GolValiable';
declare const $: any;
declare const ready: any
@Component({
  selector: 'app-cart-shopping',
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.css']
})
export class CartShoppingComponent implements OnInit {
  page = "cart"
  cart:any
  constructor(private titleService:Title, private httpClient:HttpClient) { }

  ngOnInit(): void {
    $("#preloader").css({opacity: 1, visibility: "unset", display: "unset"})
    let cart = JSON.parse(Gol.getCookie("cart"))
    this.httpClient.post(API_URL.GET("getCart"),{cart: cart}).subscribe((data)=>{
      this.cart = data
      console.log(data)
      ready()
    })

  }

  increase(index:number){
    let cart = Gol.getCookie("cart")
    if(cart ==""){
      cart = "[]"
    }

    let data = JSON.parse(cart)
    data[index].amount++
    this.cart[index].amount++
    Gol.setCookie("cart",JSON.stringify(data),30)
  }

  decrease(index:number){
    let cart = Gol.getCookie("cart")
    if(cart ==""){
      cart = "[]"
    }

    let data = JSON.parse(cart)
    data[index].amount--
    this.cart[index].amount--
    if(data[index].amount <=0){
      data.splice(index,1)
      this.cart.splice(index,1)
    }
    Gol.setCookie("cart",JSON.stringify(data),30)
  }

  removeProduct(index:number){
    let cart = Gol.getCookie("cart")
    if(cart ==""){
      cart = "[]"
    }

    let data = JSON.parse(cart)
    data.splice(index,1)
    this.cart.splice(index,1)
    Gol.setCookie("cart",JSON.stringify(data),30)
  }

  total(){
    let total = 0
    this.cart.forEach((e:any) => {
      total+= e.price*e.amount
    });
    return total
  }

}
