import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    this.authService.usersignedin.subscribe(
      (user: User) => {
        this.router.navigate(['/']);
      }
    );
  }

  ngOnInit() {
  }

  signIn(form: NgForm) {
    if (!form.valid) {
      //alert("ciao");
      return false;

    }
    const result = this.authService.signIn(form.value.email, form.value.password);
    if (result) {
      this.router.navigate(['/']);
    }
  }

}
