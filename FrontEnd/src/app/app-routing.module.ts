import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { IndexComponent } from './index/index.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: "", component: IndexComponent
  },
  {
    path: "product", component: ProductsComponent
  },
  {
    path: "about", component: AboutComponent
  },
  {
    path: "contact", component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
