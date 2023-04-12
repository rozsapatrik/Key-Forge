import { AfterContentChecked, Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { AdminGuard } from 'src/app/guards/admin.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedInUser?: firebase.default.User | null;
  isReallyReallyAdmin = false;
  cartSize = 0;

  constructor(private userv: UserService, private router: Router, private toastr: ToastrService, private agurd: AdminGuard, private caserv: CartService) { }
  ngAfterContentChecked(): void {
    this.checkAdminAndCart();
  }

  checkAdminAndCart() {
    let isReallyAdmin = JSON.parse(localStorage.getItem("admin") as string);
    if (isReallyAdmin === "true") {
      this.isReallyReallyAdmin = true;
    }
    else {
      this.isReallyReallyAdmin = false;
    }
    let cartItems = JSON.parse(localStorage.getItem("cart") || "{}");
    this.cartSize = cartItems.length | 0;
  }

  ngOnInit(): void {
    this.userv.isLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem("user", JSON.stringify(this.loggedInUser));

      this.checkAdminAndCart();

    }, error => {
      console.log(error);
      localStorage.setItem("user", JSON.stringify("null"));
    });
  }

  logout() {
    this.userv.logout().then(() => {
      localStorage.setItem("admin", JSON.stringify("false"));
      this.isReallyReallyAdmin = false;
      this.agurd.isReallyAdmin = "false";
      this.checkAdminAndCart();

      this.router.navigateByUrl("home").then(() => window.location.reload());
      this.toastr.success("Logged out successfully!", "Logout");
    }).catch(error => {
      this.toastr.error("Can't logout now", "Logout error");
    });
  }
}
