import { UserInterface } from './UserInterface';

export class User implements UserInterface {
    id: number;
    name: string;
    lastname: string;
    fiscalcode: string;
    province: string;
    phone: string;
    age: number;
    email: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.lastname = '';
        this.fiscalcode = '';
        this.province = '';
        this.phone = '';
        this.age = 18;
        this.email = '';
    }
}