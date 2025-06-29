import { test } from "@playwright/test";

export class NewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleField = page.getByRole("textbox", { name: "Article Title" });
    this.articleAboutField = page.getByRole("textbox", {
      name: "What's this article about?",
    });
    this.articleField = page.getByRole("textbox", {
      name: "Write your article (in",
    });
    this.tagField = page.getByRole("textbox", { name: "Enter tags" });
    this.publishButton = page.getByRole("button", { name: "Publish Article" });
  }
  async createNewArticle(randomArticle) {
    const { articleTitle, about, article,tag } = randomArticle
    return test.step("Создание новой статьи", async () => {
      await this.articleTitleField.click();
      await this.articleTitleField.fill(articleTitle);
      await this.articleAboutField.click();
      await this.articleAboutField.fill(about);
      await this.articleField.click();
      await this.articleField.fill(article);
      await this.tagField.click();
      await this.tagField.fill(tag);
      await this.publishButton.click();
    });
  }
}