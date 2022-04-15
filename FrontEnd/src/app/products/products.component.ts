import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
declare const $: any;
declare const ready: any
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  page = "product"
  constructor(private titleService:Title) {
    this.titleService.setTitle("Product");
  }

  ngOnInit(): void {
    $("#preloader").css({opacity: 1, visibility: "unset", display: "unset"})
    ready()
  }

}
