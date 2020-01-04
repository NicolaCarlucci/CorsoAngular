import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { WebDriverLogger } from 'blocking-proxy/built/lib/webdriver_logger';
import { HttpClientModule, HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


@Injectable()
export class UserService {

    users: User[] = [];
    private APIURL = environment.APIURL;

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    getAuthHeader(): HttpHeaders {
        const header = new HttpHeaders(
            {
                Authorization: 'Bearer ' + this.authService.getToken()
            }
        );
        return header;
    }

    getUsers() {
        return this.httpClient.get(this.APIURL, {
            headers: this.getAuthHeader()
        });
    }

    getUser(id: string) {
        return this.httpClient.get(this.APIURL + '/' + id, {
            headers: this.getAuthHeader()
        });

    }

    deletUser(user: User) {
        const data = { _method: 'DELETE' };
        console.log(this.APIURL + '/' + user.id + '?_method=DELETE', {});
        return this.httpClient.post(this.APIURL + '/' + user.id + '?_method=DELETE', {}, {
            headers: this.getAuthHeader()
        });

    }

    updateUser(user: User) {
        // tslint:disable-next-line:no-string-literal
        user['_method'] = 'PUT';
        return this.httpClient.post(this.APIURL + '/' + user.id, user, {
            headers: this.getAuthHeader()
        });
    }

    createUser(user: User) {
        return this.httpClient.post(this.APIURL, user, {
            headers: this.getAuthHeader()
        });
    }
}
