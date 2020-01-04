import { Component } from '@angular/core';
import { User } from './interfaces/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'UMS';
  userSelected: User = new User();
  showForm = false;

  updateUser(user: User) {
    this.showForm = true;
    this.userSelected = user;
  }

  newUser() {
    this.userSelected = new User();
    this.showForm = true;
  }
}
