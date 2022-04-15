import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
declare const $: any;
declare const ready: any
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  page = "about"
  constructor(private titleService:Title) {
    this.titleService.setTitle("About");
  }

  ngOnInit(): void {
    $("#preloader").css({opacity: 1, visibility: "unset", display: "unset"})
    ready()
  }

}
