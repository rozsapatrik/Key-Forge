import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { CartService } from 'src/app/shared/cart.service';
import { NewItemModule } from 'src/app/shared/new-item.module';
import { Cart } from '../../shared/cart.module';
import { NewItemService } from '../../shared/new-item.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  loading: boolean = false;

  constructor(private service: NewItemService, private cartserv: CartService) { }

  ngOnInit(): void {
    this.cartserv.getOrders().subscribe(actionArray => {
      this.oLista = actionArray.map(o => {
        const data = o.payload.doc.data() as CartWithCart
        return {
          address: data.address,
          email: data.address,
          name: data.name,
          phone: data.phone,
          items: data.cart
        }
      })
    })
  }
  
  oLista?: Cart[];
  lista?: NewItemModule[];
}

export class CartWithCart {
  email: string = "";
  address: string = "";
  name: string = "";
  phone: string = "";
  cart: Array<NewItemModule> = [];
}
