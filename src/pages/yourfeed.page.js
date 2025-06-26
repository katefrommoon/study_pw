import { test } from "@playwright/test";

export class YourFeedPage {
  constructor(page) {
    this.page = page;
    this.profileNameField = page.getByRole("navigation");
    this.linkNewArticle = page.getByRole("link", { name: " New Article" });
    this.linkHome = page.getByRole("link", { name: "Home" });
    this.linkGlobalFeed = page.getByRole("button", { name: "Global Feed" });
    this.favoriteButton = page.locator("button:has(i.ion-heart)").first();
    this.favoriteCounter = this.favoriteButton.locator("span.counter");
    this.profileMenu = page.locator('.nav-link.dropdown-toggle');
  }
  async gotoNewArticle() {
    return test.step("Перейти к созданию статьи", async () => {
      await this.linkNewArticle.click();
    });
  }
  async gotoHome() {
    return test.step("Перейти на домашнюю страницу", async () => {
      await this.linkHome.click();
    });
  }
  async gotoGlobalFeed() {
    return test.step("Перейти к ленте статей", async () => {
      await this.linkGlobalFeed.click();
    });
  }
  async clickFavorite() {
    return test.step("Кликнуть на сердечко", async () => {
      await this.favoriteButton.click();
      await this.favoriteButton.getAttribute("class");
    });
  }
  async getFavoriteCount() {
    return test.step("Получить значение счетчика избранного", async () => {
      const text = await this.favoriteCounter.textContent();
      return parseInt(text.trim().replace(/[()]/g, ""));
    });
  }
  async clickMenu() {
    return test.step("Раскрыть меню", async () => {
      await this.profileMenu.click();
    });
  }
}
