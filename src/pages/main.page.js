import { test } from "@playwright/test";

export class MainPage {
  constructor(page) {
    this.page = page;
    this.signupButton = page.getByRole("link", { name: "Sign up" });
    this.loginButton = page.getByRole("link", { name: " Login" });
  }
  async open() {
    return test.step("Открыть страницу", async () => {
      await this.page.goto("https://realworld.qa.guru/");
    });
  }
  async gotoSignup() {
    return test.step("Кликнуть на кнопку Sign up", async () => {
      await this.signupButton.click();
    });
  }
  async gotoLogin() {
    return test.step("Кликнуть на кнопку Login", async () => {
      await this.loginButton.click();
    });
  }
}
