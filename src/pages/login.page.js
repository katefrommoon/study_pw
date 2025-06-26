import { test } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByRole("textbox", { name: "Email" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
  }
  async login(randomUser) {
    const { email, password } = randomUser;
    await this.emailField.click();
    await this.emailField.fill(email);
    await this.passwordField.click();
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
