import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throws } from 'assert';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../shared/cart.service';
import { NewItemModule } from '../shared/new-item.module';
import { NewItemService } from '../shared/new-item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  wannaFoam: boolean = false;

  orderBys:Array<{id: string, name: string}> = [
    {id: "expensiveToCheap", name: "Expensive to cheap"},
    {id: "cheapToExpansive", name: "Cheap to expensive"},
    {id: "alpha", name: "Alphabetic"},
    {id: "alphaReverse", name: "Reverse alphabetic"},
  ];

  constructor(public service : NewItemService, private toastr: ToastrService, private carserv: CartService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getItemsService("name", "asc");
  }
  
  lista?: NewItemModule[];
  getItemsService(name: string, direction: "asc" | "desc") {
    this.service.getItems(name, direction).subscribe(actionArray => {
      this.lista = actionArray.map(i => {
        this.loading = false;
        const data = i.payload.doc.data() as NewItemModule
        return {
          id: i.payload.doc.id,
          description: data.description,
          image: data.image,
          name: data.name,
          price: data.price
        } as unknown as NewItemModule;
      })
    })
  }

  foamLista?: NewItemModule[];
  chosenOrder?: {id: string, name: string};
  
  changeOrder() {
    switch (this.chosenOrder?.id) {
      case "expensiveToCheap":
          this.getItemsService("price", "desc");
        break;
      case "cheapToExpansive":
        this.getItemsService("price", "asc");
        break;
      case "alpha":
        this.getItemsService("name", "asc");
        break;
      case "alphaReverse":
        this.getItemsService("name", "desc");
        break; 
    }
  }

  addToCart(i: NewItemModule) {
    this.toastr.success(i.name+" has been added to your cart!","Cart");
    this.carserv.addToCart(i);
  }

}