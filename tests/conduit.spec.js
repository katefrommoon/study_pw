import { test, expect } from "@playwright/test";
import { UserBuilder } from "../src/helpers/builders/user.builder.js";
import { ArticleBuilder } from "../src/helpers/builders/article.builder.js";
import { App } from "../src/pages/app.page.js";

test("Пользователь может создать статью", async ({ page }) => {
  let app = new App(page);

  const randomUser = new UserBuilder()
    .addEmail()
    .addPassword(10)
    .addUsername()
    .generate();

  const randomArticle = new ArticleBuilder()
    .addArticleTitle()
    .addAbout()
    .addArticle()
    .addTag()
    .generate();

  await app.main.open();
  await app.main.gotoSignup();
  await app.register.signup(randomUser);
  await app.yourFeed.gotoNewArticle();
  await app.newArticle.createNewArticle(randomArticle);

  await page.screenshot({ path: "screenshot_new_article.png" });

  await expect(app.article.articleTitle).toHaveText(randomArticle.articleTitle);
  await expect(app.article.articleParagraph).toContainText(
    randomArticle.article
  );
  await expect(app.article.articleAuthor).toContainText(randomUser.username);
  // todo assert tag
});

test.skip("Пользователь может удалить статью", async ({ page }) => {
  let app = new App(page);

  const randomUser = new UserBuilder()
    .addEmail()
    .addPassword(10)
    .addUsername()
    .generate();

  const randomArticle = new ArticleBuilder()
    .addArticleTitle()
    .addAbout()
    .addArticle()
    .addTag()
    .generate();

  await app.main.open();
  await app.main.gotoSignup();
  await app.register.signup(randomUser);
  await app.yourFeed.gotoNewArticle();
  await app.newArticle.createNewArticle(randomArticle);
  await page.screenshot({ path: "screenshot_new_article.png" });
  await app.article.deleteArticle();

  // await expect(articlePage.articleAuthor).toContainText(randomUser.username);
});

test("Пользователь может добавить статью в избранное", async ({ page }) => {
  let app = new App(page);

  const randomUser = new UserBuilder()
    .addEmail()
    .addPassword(10)
    .addUsername()
    .generate();

  await app.main.open();
  await app.main.gotoSignup();
  await app.register.signup(randomUser);
  await app.yourFeed.gotoHome();
  await app.yourFeed.gotoGlobalFeed();
  const countBefore = await app.yourFeed.getFavoriteCount();
  await app.yourFeed.clickFavorite();
  const isActive = await app.yourFeed.favoriteButton.getAttribute("class");
  await expect(app.yourFeed.favoriteButton).toHaveClass(/.*active.*/);
  const countAfter = await app.yourFeed.getFavoriteCount();
  expect(countAfter).toBe(countBefore + 1);
});

test("Пользователь может удалить статью из избранного", async ({ page }) => {
  let app = new App(page);

  const randomUser = new UserBuilder()
    .addEmail()
    .addPassword(10)
    .addUsername()
    .generate();

  await app.main.open();
  await app.main.gotoSignup();
  await app.register.signup(randomUser);
  await app.yourFeed.gotoHome();
  await app.yourFeed.gotoGlobalFeed();
  await app.yourFeed.clickFavorite();
  await expect(app.yourFeed.favoriteButton).toHaveClass(/active/);
  const countBefore = await app.yourFeed.getFavoriteCount();
  console.log("countBefore = ", countBefore);
  await app.yourFeed.clickFavorite();
  const isInactive = await app.yourFeed.favoriteButton.getAttribute("class");
  await expect(app.yourFeed.favoriteButton).not.toHaveClass(/.*active.*/);
  const countAfter = await app.yourFeed.getFavoriteCount();
  console.log("countAfter = ", countAfter);
  expect(countAfter).toBe(countBefore - 1);
});

test("Пользователь может разлогиниться", async ({ page }) => {
  let app = new App(page);

  const randomUser = new UserBuilder()
    .addEmail()
    .addPassword(10)
    .addUsername()
    .generate();

  await app.main.open();
  await app.main.gotoSignup();
  await app.register.signup(randomUser);
  await app.yourFeed.clickMenu();
  await app.dropdown.logout();
  await expect (app.main.signupButton).toBeVisible();
});

test("Пользователь может залогиниться", async ({ page }) => {
  let app = new App(page);

  const randomUser = new UserBuilder()
    .addEmail()
    .addPassword(10)
    .addUsername()
    .generate();

  await app.main.open();
  await app.main.gotoSignup();
  await app.register.signup(randomUser);
  await app.yourFeed.clickMenu();
  await app.dropdown.logout();
  await app.main.gotoLogin();
  await app.login.login(randomUser);
  await expect(app.yourFeed.profileNameField).toContainText(
    randomUser.username
  );
});