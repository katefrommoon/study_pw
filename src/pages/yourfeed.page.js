import { test } from "@playwright/test";

export class YourFeedPage {
  constructor(page) {
    this.page = page;
    this.profileNameField = page.getByRole("navigation");
    this.linkNewArticle = page.getByRole('link', { name: ' New Article' });
    this.linkHome = page.getByRole("link", { name: "Home" });
    this.linkGlobalFeed = page.getByRole('button', { name: 'Global Feed' })
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
}