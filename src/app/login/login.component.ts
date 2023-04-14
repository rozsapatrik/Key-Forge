import { AfterContentChecked, AfterViewInit, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../shared/user.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loggedUserOutput?: User;

  constructor(private userv: UserService, private router: Router, private toastr: ToastrService, private firestore: AngularFirestore, private auth: AngularFireAuth) { }


  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.minLength(6)
    ]),
  });

  async onSubmit() {
    localStorage.setItem("admin", JSON.stringify("false"));
    const loginData = this.loginForm.value;

    if (this.loginForm.valid) {
      this.userv.login(loginData.email as unknown as string, loginData.password as unknown as string).then(cred => {
        this.toastr.success("Logged in successfully!", "Login");
        this.router.navigateByUrl("home");

        this.auth.onAuthStateChanged((user) => {
          if (user) {

            this.firestore.collection("users").doc(user.uid).valueChanges().subscribe(v => {
              this.userv.userData = v as User;
              if (this.userv.userData.isAdmin) {
                localStorage.setItem("admin", JSON.stringify("true"));
              }
              else {
                localStorage.setItem("admin", JSON.stringify("false"));
              }
            });
          }
        });

      }).catch(error => {
        this.toastr.error("Email or password is incorrect!", "Login error");
      });
    }
  }
}
