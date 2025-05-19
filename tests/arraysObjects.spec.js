import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'; 
/* Урок 3
let myDog = {
    name: "Belka",
    age: 4,
    getVoice: function () { // если есть какое-то свойство, куда записана функция, то такое свойство называется методом
        console.log("Гав!");
    },
    getHighVoice(something) { 
        console.log(something);
    },
    // мутабельность объекта
    "secret santa": 'present'
};
myDog.name;
myDog.getHighVoice('Meat!');
myDog.surname = 'Danilova';
// delete myDog.name
Object.keys(myDog);
Object.entries(myDog); // отдает ключ - значение

// Массивы
let myHome = [100, 'Bond', 'the end', [3, 5, 6]];
myHome[0];
myHome.length; // количество элементов в массиве / размер
myHome[myHome.length-1][1]; */

const getRandomUser = () => {
    const randomUser = {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }
    return randomUser;
};
// Деструктуризация
// Если мы знаем какие есть свойства у объекта, то можем в фигурных скобках перечислить эти свойства, 
// поставить равно и написать имя объекта, то JS автоматически создаст переменные и присвоит значения из объекта
/* myThirdDog = {
    name: "Bond",
    age: 12
};
const {name, age} = myThirdDog; */

const register = async (page, randomUser) => {
    // вынести адрес сервера
    const { username, email, password } = randomUser;
    await page.goto('https://realworld.qa.guru/');

    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'Your Name' }).click();
 // await page.getByRole('textbox', { name: 'Your Name' }).fill(randomUser.username); - можно так вызывать из объекта свойства
    await page.getByRole('textbox', { name: 'Your Name' }).fill(username);
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Sign up' }).click();
    return username;
};

test('Пользователь может зарегистрироваться с логином и паролем', async ({ page }) => {
    const randomUser = getRandomUser();
    const username = await register(page, randomUser);
    await page.screenshot({ path: 'screenshot1.png' });
    await expect(page.getByRole('navigation')).toContainText(username);
    await page.screenshot({ path: 'screenshot2.png' });
});

test.skip('Авторизованный пользователь может посмотреть список статей', async ({ page }) => {
    const username = await registerRandomUserVersion2(page);
    await page.waitForLoadState('networkidle'); // ждет пока загрузится страница полностью
    const filteredArticles = await page
        .locator('article-preview')
        .filter({
            hasText: 'Gustave', // ищет текст в любом месте элемента или его потомков
        })
        .click();
   // await page.screenshot({ path: 'screenshot1.png' });
   // await expect(page.getByRole('navigation')).toContainText(username);
});