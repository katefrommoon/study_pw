import { faker } from '@faker-js/faker'; 
export class UserBuilder {
    addUsername() {
        this.username = faker.internet.username();
        return this; // возвращаем объект, чтобы можно было продолжить цепочку
    }
    addEmail() {
        this.email = faker.internet.email();
        return this;
    }
    addPassword(symbol = 10) {
        this.password = faker.internet.password({ lenght: symbol });
        return this;
    }
    generate()
    {
        return {
            username: this.username,
            email: this.email,
            password: this.password
        }
    }
}