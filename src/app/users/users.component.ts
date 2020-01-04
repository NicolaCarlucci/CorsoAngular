import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/User';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    title = 'Users';
    users: User[] = [];
    @Output() updateUser = new EventEmitter<User>();

    constructor(private service: UserService) { }

    ngOnInit() {
        this.service.getUsers().subscribe(
            response => {
                this.users = response['data']
            },
            error => {
                return alert(error.message);
            }
        );
    }

    onDeleteUser(user: User) {
        const deleteUserConfirm = confirm('Vuoi davvero eliminare utente ' + user.name);
        if (deleteUserConfirm) {
            this.service.deletUser(user).subscribe(
                (response) => {
                    if (response['success']) {
                        const idx = this.users.indexOf(user);
                        this.users.splice(idx, 1);
                        alert("Utente eliminato correttamente");
                    } else {
                        alert(response['message']);
                    }
                }
            );
        }
    }

    onSelectUser(user: User) {
        const userCopy = Object.assign({}, user);
        this.updateUser.emit(userCopy);
    }
}