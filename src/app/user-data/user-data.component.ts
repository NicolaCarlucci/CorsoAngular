import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  title = 'User Detail';

  public user: User;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (p) => {
        this.userService.getUser(p.get('id')).subscribe(
          response => this.user = response['data']
        );
      }
    );
  }

  backToUsers() {
    this.router.navigate(['users']);
  }

}
