import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CartShoppingComponent } from './cart-shopping/cart-shopping.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { IndexComponent } from './index/index.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: "", component: IndexComponent
  },
  {
    path: "product/:category", component: ProductsComponent,
  },
  {
    path: "product", redirectTo: "product/",
  },
  {
    path: "about", component: AboutComponent
  },
  {
    path: "contact", component: ContactComponent
  },
  {
    path: "detail/:id", component: DetailProductComponent
  },
  {
    path: "cart", component: CartShoppingComponent
  },
  {
    path: "checkout", component: CheckoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
