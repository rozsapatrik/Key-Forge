import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cart } from './cart.module';
import { NewItemModule } from './new-item.module';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  cartData: Cart = {
    name: "",
    email: "",
    address: "",
    phone: "",
    items: []
  };
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  order(data: Cart) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
          .collection("orders")
          .add(data)
          .then(res => {resolve(res)}, err => reject(err));
    });
  }

  addToCart(item: NewItemModule) {
    console.log(JSON.stringify(this.cartData));
    this.cartData.items.push(item);
    localStorage.setItem("cart", JSON.stringify(this.cartData.items));
  }

  getCart() {
    return this.cartData;
  }

  getOrders() {
    return this.firestore.collection("orders").snapshotChanges();
  }
}
