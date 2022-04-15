import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
declare const $: any;
declare const ready: any
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  page = "contact"
  constructor(private titleService:Title) {
    this.titleService.setTitle("Contact");
  }

  ngOnInit(): void {
    $("#preloader").css({opacity: 1, visibility: "unset", display: "unset"})
    ready()
  }

}
