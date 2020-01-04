import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { timeout } from 'q';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    authService.usersignedup.subscribe(
      () => router.navigate(['/'])
    );
  }

  ngOnInit() {
  }

  signUp(form: NgForm) {
    this.authService.signUp(form.value.name, form.value.email, form.value.password);
  }

}
