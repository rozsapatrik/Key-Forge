import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CartService } from './shared/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'key-forge';

  constructor(private cartserv: CartService) {}

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {sidenav.close();}
  }

  ngOnInit() {
    this.cartserv.ngOnInit();
  }

  ngOnChanges(): void {
  }
}
