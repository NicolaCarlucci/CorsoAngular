import { Component, OnInit, Input } from '@angular/core';
import { User } from '../interfaces/User';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  private userCopy: User;
  private _user: User;

  @Input() set user(user: User) {
    this._user = user;
    this.userCopy = Object.assign({}, user);
  }

  get user() {
    return this._user;
  }

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this._user = new User();
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        if (params.get('id') !== undefined) {
          this.userService.getUser(params.get('id')).subscribe(
            response => this.user = response['data']
          );
        }
      }
    );
  }

  saveUser() {
    if (this.user.id > 0) {
      this.updateUser(this.user);
    } else {
      this.createUser(this.user);
    }
  }

  updateUser(user: User) {
    this.userService.updateUser(this.user).subscribe(
      response => {
        const user = response['data'] as User;
        console.log(response);
        if (response['success']) {
          alert('User ' + user.name + ' modificato correttamente');
        } else {
          alert('User ' + user.name + 'errore nella modifica : ' + response['message']);
        }
        this.router.navigate(['users']);

      }
    );
  }

  createUser(user: User) {
    this.userService.createUser(this.user).subscribe(
      response => {
        console.log(response);
        if (response['success']) {
          alert('User ' + user.name + ' Creato correttamente');
        } else {
          alert('User ' + user.name + 'errore nella creazione : ' + response['message']);
        }
        this.router.navigate(['users']);

      }
    );
  }

  resetForm(form) {
    if (this.user.id === 0) {
      this.user = new User();
    } else {
      this.user = this.userCopy;
    }
  }

  backToUsers() {
    this.router.navigate(['users']);
  }

}
