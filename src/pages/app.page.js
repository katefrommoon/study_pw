import { MainPage, RegisterPage, YourFeedPage, ArticlePage, NewArticlePage, LoginPage, DropdownPage } from "./index";

export class App {
    constructor(page) {
        this.page = page;
        this.main = new MainPage(page);
        this.register = new RegisterPage(page);
        this.yourFeed = new YourFeedPage(page);
        this.article = new ArticlePage(page);
        this.dropdown = new DropdownPage(page);
        this.newArticle = new NewArticlePage(page);
        this.login = new LoginPage(page);
    }
}