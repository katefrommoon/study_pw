// 7 занятие - Allure report
/* 
Установка Allure: 
1. npm i allure-playwright
2. npm add allure
3. добавление файла ../Playwright/allurerc.js
4. запуск тестов npm t
5. генерация отчёта npx allure awesome ./allure-results --single-file
*/

// 8 занятие - Фикстуры. Чтобы пользователь находился в определенном состоянии, на определенной странице
//import { test, expect } from "@playwright/test"; обычно мы импортировали объект test из самого playwright
import { expect } from "@playwright/test";

// мы начинаем импортировать объект test из нашей фикстуры, т.е. к плэйрайтовскому объекту мы добавляем свою логику
import { test } from "../src/helpers/fixtures/index.js";

import { UserBuilder } from "../src/helpers/builders/user.builder.js";

test.only("Пользователь может зарегистрироваться с логином и паролем", async ({
  regPageWithUser, //вместо page - webApp, regPageWithUser etc
}) => {
  await page.screenshot({ path: "screenshot1.png" });

  await expect(regPageWithUser.yourFeed.profileNameField).toContainText(
    randomUser.username
  );

  await page.screenshot({ path: "screenshot2.png" });
});
