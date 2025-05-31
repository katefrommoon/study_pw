// 6 занятие
// Паттерн Фасад
// Паттерн Бочка
import { test, expect } from "@playwright/test";
import { UserBuilder } from "../src/helpers/builders/user.builder.js";
import { App } from "../src/pages/app.page.js";

test("Пользователь может зарегистрироваться с логином и паролем", async ({
  page,
}) => {

  const randomUser = new UserBuilder() // для автоформатирования кода надо нажать Shift + Option + F
    .addEmail()
    .addPassword(14)
    .addUsername()
    .generate();
  let app = new App(page);
  await app.main.open();
  await app.main.gotoLogin();
  await app.register.signup(randomUser);
  await page.screenshot({ path: "screenshot1.png" });
  await expect(app.yourFeed.profileNameField).toContainText(
    randomUser.username
  );
  await page.screenshot({ path: "screenshot2.png" });
});

// const article = new ArticleBuilder().addZagolovok().addTags();
