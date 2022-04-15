import { Component, OnInit } from '@angular/core';
declare const cleared: any;
declare const $: any;
@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {

  HomePage: string = ""
  ProductPage: string = ""
  AboutPage: string = ""
  ContactPage: string = ""

  constructor() { }

  ngOnInit(): void {
    cleared[0] = cleared[1] = cleared[2] = 0; //set a cleared flag for each field
    function clearField(t: any) {                   //declaring the array outside of the
      if (!cleared[t.id]) {                      // function makes it static and global
        cleared[t.id] = 1;  // you could use true and false, but that's more typing
        t.value = '';         // with more chance of typos
        t.style.color = '#fff';
      }
    }

  }

  onActivateRouter(cpm: any): void {
    this.HomePage = ""
    this.ProductPage = ""
    this.AboutPage = ""
    this.ContactPage = ""
    switch(cpm.page){
      case "index":
        this.HomePage = "active"
        break
      case "product":
        this.ProductPage = "active"
        break
      case "about":
        this.AboutPage = "active"
        break
      case "contact":
        this.ContactPage = "active"
        break
    }
  }

}
