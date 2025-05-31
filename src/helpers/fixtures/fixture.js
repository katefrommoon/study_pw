import { test as base } from "@playwright/test";
import { App } from "../../pages/app.page";
import { UserBuilder } from "../builders/index";

// фикстура объявляется через base.extend
// фикстура принимает в себя несколько аргументов: первое - это зависимости
// функция use (колбэк) передает результат выполнения нашей фикстуры в тест
export const test = base.extend({
  webApp: async ({ page }, use) => {
    let app = new App(page);
    await app.main.open();
    await use(app);
  },
  loginPage: async ({ page }, use) => {
    let app = new App(page);
    await app.main.open();
    await app.main.gotoLogin();
    await use(app);
    //все шаги ниже могут быть для удаления данных
    console.log("delete all");
  },
  regPageWithUser: async ({ page }, use) => {
    const randomUser = new UserBuilder() // для автоформатирования кода надо нажать Shift + Option + F
      .addEmail()
      .addPassword(14)
      .addUsername()
      .generate();

    let app = new App(page);
    await app.main.open();
    await app.main.gotoLogin();
    await use(app);
    await app.register.signup(randomUser);
    //все шаги ниже могут быть для удаления данных
    console.log("delete all");
  },
});
