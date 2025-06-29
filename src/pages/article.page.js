import { test, expect } from "@playwright/test";

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleAuthor = page.getByRole("main");
    this.articleTitle = page.locator("h1");
    this.articleParagraph = page.getByRole("paragraph");
    this.articleTag = page.locator("tag-default tag-pill tag-outline");
    this.deleteButton = this.page
      .locator('button:has-text("Delete Article")')
      .first();
    this.editButton = page.getByRole("button", { name: " Edit Article" });
  }
  async deleteArticle() {
    return test.step("Удалить статью", async () => {
      // Готовим перехват диалога заранее
      await this.page.waitForLoadState("networkidle");
      await expect(this.deleteButton).toBeVisible();
      await expect(this.deleteButton).toBeEnabled();

      // Скрин перед удалением
      await this.page.screenshot({ path: "before_delete_click.png" });

      const dialogPromise = this.page.waitForEvent("dialog");
      const dialog = await dialogPromise;
      await dialog.accept(); // Подтверждаем удаление
      await this.deleteButton.click();
    });
  }
}

//this.profileButton = page.locator('li>div[class="nav-link dropdown-toggle cursor-pointer"]');
