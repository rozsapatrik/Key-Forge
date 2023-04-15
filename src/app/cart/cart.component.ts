import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart.service';
import { UserService } from '../shared/user.service';
import { NewItemModule } from '../shared/new-item.module';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private cartservice: CartService, private router: Router, private userv: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  stringCart = localStorage.getItem("cart");
  cartLista = JSON.parse(localStorage.getItem("cart") || "[]");
  totalPrice = this.calculatePrice();

  calculatePrice() {
    if (Array.isArray(this.cartLista)) {
      return this.cartLista.reduce((accum: any,item: { price: any; }) => accum + item.price, 0);
    }
    else {
      return 0;
    }
  }

  onDelete(item: NewItemModule) {
    const t = this.cartLista.filter((obj: NewItemModule) => obj !== item);
    console.log(this.cartLista.filter((obj: NewItemModule) => obj == item))
    this.cartservice.cartData.cart = t;
    localStorage.setItem("cart", JSON.stringify(t));
    this.cartLista = JSON.parse(localStorage.getItem("cart") || "[]");
    
    this.stringCart = localStorage.getItem("cart");
    this.totalPrice = this.calculatePrice();
    console.log(JSON.stringify(this.userData));
  }

  userData = JSON.parse(localStorage.getItem("cartUser") || "{email: '', isAdmin: false, address: '', name: '', phone: ''}");

  orderForm = new FormGroup({
    email: new FormControl(this.userData.email),
    address: new FormControl(this.userData.address),
    name: new FormControl(this.userData.name),
    phone: new FormControl(this.userData.phone),
    cart: new FormControl(this.cartLista)
  });

  onSubmit() {
    this.toastr.success("Your order was successfully sent", "Order");
    this.cartservice.order(this.orderForm.value);
    localStorage.setItem("cart", "[]");
    this.router.navigateByUrl("/home");
  }
}
