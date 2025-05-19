export class MainPage {
    constructor (page) {
        this.page = page;
        this.signupButton = page.getByRole('link', { name: 'Sign up' });
    }
    async open () {
        await this.page.goto('https://realworld.qa.guru/');
    }
    async gotoLogin () {
        await this.signupButton.click();
    }
}