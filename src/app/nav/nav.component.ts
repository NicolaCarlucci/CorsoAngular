import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public showMenu = false;
  public isUserLoggedIn = false;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onNewUser = new EventEmitter();

  public username: string;

  constructor(private authService: AuthService, private roter: Router) {
    this.authService.usersignedin.subscribe(
      (user: User) => {
        this.username = user.name;
        this.isUserLoggedIn = true;
      }
    );
    this.authService.userlogout.subscribe(
      (user: User) => {
        this.username = '';
        this.isUserLoggedIn = false;
      }
    );
    this.authService.usersignedup.subscribe(
      (user: User) => {
        this.username = user.name;
        this.isUserLoggedIn = true;
      }
    );
  }

  ngOnInit() {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    if (this.isUserLoggedIn) {
      const user = this.authService.getUser();
      this.username = user.name;
    }
  }

  newUser() {
    this.onNewUser.emit();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout(e) {
    e.preventDefault();
    this.authService.logout();
    this.roter.navigate(['login']);
  }

  signIn(e) {
    e.preventDefault();
    this.roter.navigate(['login']);
  }

  signUp(e) {
    e.preventDefault();
    this.roter.navigate(['signup']);
  }

}
