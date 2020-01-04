import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../interfaces/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';


interface Jwt {
  access_token: string;
  token_type: string;
  expires_in: number;
  user_name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLogged = false;

  @Output() usersignedin = new EventEmitter<User>();
  @Output() usersignedup = new EventEmitter<User>();
  @Output() userlogout = new EventEmitter();
  private APIAUTHURL = environment.APIAUTH;


  constructor(private httpClient: HttpClient) { }

  isUserLoggedIn() {
    return this.isUserLogged = !!localStorage.getItem('token');
  }

  signIn(email: string, password: string) {
    this.httpClient.post(this.APIAUTHURL + 'login',
      {
        // tslint:disable-next-line:object-literal-shorthand
        email: email,
        // tslint:disable-next-line:object-literal-shorthand
        password: password
      }
    ).subscribe(
      (payload: Jwt) => {
        localStorage.setItem('token', payload.access_token);
        localStorage.setItem('user', JSON.stringify(payload));
        const user = new User();
        user.name = payload.user_name;
        user.email = payload.email;
        this.usersignedin.emit(user);
        return true;
      },
      (httpErrorResponse: HttpErrorResponse) => {
        alert(httpErrorResponse.message);
        return false;
      }
    );
    return false;
  }

  signUp(name: string, email: string, password: string) {
    const user = new User();
    user.name = name;
    user.email = email;
    this.httpClient.post(this.APIAUTHURL + 'signup',
      {
        // tslint:disable-next-line:object-literal-shorthand
        name: name,
        // tslint:disable-next-line:object-literal-shorthand
        email: email,
        // tslint:disable-next-line:object-literal-shorthand
        password: password

      }
    ).subscribe(
      (payload: Jwt) => {
        localStorage.setItem('token', payload.access_token);
        localStorage.setItem('user', JSON.stringify(payload));
        user.name = payload.user_name;
        user.email = payload.email;
        this.usersignedup.emit(user);
      },
      (httpErrorResponse: HttpErrorResponse) => {
        alert(httpErrorResponse.message);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userlogout.emit();
    this.isUserLogged = false;
  }

  getUser(): User {
    const data = JSON.parse(localStorage.getItem('user'));
    const user = new User();
    if (data) {
      user.name = data.user_name;
      user.email = data.email;
      /*
      user.name = data['user_name'];
      user.email = data['email'];
      */
    }
    return user;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
