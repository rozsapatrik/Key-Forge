import { Component, Input, OnInit } from '@angular/core';
import { User } from '../shared/user.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() registeredUserInput?: User;

  registerForm = new FormGroup({
    email: new FormControl(null, [
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.minLength(6)
    ]),
    address: new FormControl(''),
    name: new FormControl(''),
    phone: new FormControl('')
  });


  constructor(private userv: UserService, private router: Router, private toastr: ToastrService, private firestore: AngularFirestore, private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  onSubmit() {
    return this.userv.register(this.registerForm.value.email as unknown as string, this.registerForm.value.password as unknown as string).then(cred => {
      this.toastr.success("Registered successfully!", "Registration");
      this.userv.login(this.registerForm.value.email as unknown as string, this.registerForm.value.password as unknown as string).then(cred => {

        this.auth.onAuthStateChanged((user) => {
          if (user) {

            this.firestore.collection("users").doc(user.uid).set({
              address: this.registerForm.value.address,
              email: this.registerForm.value.email,
              isAdmin: false,
              name: this.registerForm.value.name,
              phone: this.registerForm.value.phone
            });
          }
        });

        this.router.navigate(["admin"]);
      }).catch(error => {
        this.toastr.error("Email or password is incorrect!", "Login error");
      });
    }).catch(error => {
      this.toastr.error("Incorrect data!", "Can't register");
    });;
  }

}
