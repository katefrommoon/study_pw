// 5 занятие
import { test, expect } from "@playwright/test";
import { UserBuilder } from "../src/helpers/builders/user.builder.js";
import { MainPage } from "../src/pages/main.page.js";
import { RegisterPage } from "../src/pages/register.page.js";
import { YourFeedPage } from "../src/pages/yourfeed.page.js";

/*
class Dog {
    color = 'white'; // свойство класса - в отличие от объектов тут операция присваивания =
    getVoice(voice) { // метод класса, т.е. функция, которая вызывается в классе
        console.log('RRR');
        console.log(voice);
    }
    constructor(name){
        this.name = name; // this - привязка контекста
    }
}
1. Создается пустой объект {} new Dog, который становится this
2. Выполняются все поля, заданные в теле класса (в порядке объявления)
3. Выполняется код внутри конструктора {инициализируются новые поля}
const belka = new Dog('Белка');
console.log(belka); // Выведутся параметры класса и name будет Белка
belka.getVoice('Дай вкусняшку!');


немного о функции
const getName = (name) => {}; // name - аргумент
*/

test("Пользователь может зарегистрироваться с логином и паролем", async ({
  page,
}) => {
  //Готовим страницы
  const mainPage = new MainPage(page);
  const registerPage = new RegisterPage(page);
  const yourFeedPage = new YourFeedPage(page);

  const randomUser = new UserBuilder() // для автоформатирования кода надо нажать Shift + Option + F
    .addEmail()
    .addPassword(14) // так как в классе задана дефолтная длина, то можно в тесте указать свою длину пароля
    .addUsername()
    .generate();

  await mainPage.open();
  await mainPage.gotoLogin();
  await registerPage.signup(randomUser);
  await expect(yourFeedPage.profileNameField).toContainText(randomUser.username);
});

// const article = new ArticleBuilder().addZagolovok().addTags();