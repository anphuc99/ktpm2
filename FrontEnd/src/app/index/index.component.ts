import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
declare const $: any;
declare const ready: any
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  page = "index"
  constructor(private titleService:Title) {
    this.titleService.setTitle("Home");
  }

  ngOnInit(): void {
    $("#preloader").css({opacity: 1, visibility: "unset", display: "unset"})
    ready()
  }

}
