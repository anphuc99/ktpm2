import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {HttpClient} from '@angular/common/http';
import API from "../API_URL";
declare const $: any;
declare const ready: any
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  page = "index"
  products:any
  constructor(private titleService:Title,private httpClient:HttpClient) {
    this.titleService.setTitle("Home");
  }

  ngOnInit(): void {
    $("#preloader").css({opacity: 1, visibility: "unset", display: "unset"})
    this.httpClient.get(API.GET("index")).subscribe((data: any)=> {
      data.forEach((e: any) => {
        e.price = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(e.price)
      });
      this.products = data

      ready()
    })
    ready()
  }

}
