import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'; //для установки библиотеки npm install @faker-js/faker

// Объявление переменной let dog;
// Присвоение переменной dog = 'Belka';

// Объявление и присвоение переменных let dogSecond = 'Strelka';

// let day = '11aprill';
//  day = 'aprill'

// блочная область видимости {}

//const SALARY = 1; SALARY = 2; const PI = 3.14151926535;

/*
Примитивы
1) number 
let num = 42;
let pi = 3.14;

2) string
let name = 'Alise';
let nameSecond = "Alice";
let nameThird = `Alice`;
let fives = `1+${nameThird}`;

3) boolean
let isTrue = true;
let lifePain = false;

4) null - специальное обозначение ничего
let empty = null;

5) undefined - значение по умолчанию для неинициализированных переменных
let x;
console.log(x);

6) symbol - для уникальных идентификаторов. Уникальный примитивный тип данных, даже одинаковые описания → разные символы
let id = Symbol('id');

7) bigint - целые числа произвольной длины
let bigNum = 12332434340888875525n;

8) 8 тип данных

Объекты - коллекция свойств (массивы, функции, даты)

*/
//Function Declaration
/* function hello (name){
    console.log (`Привет ${name}!`)
} */
async function registerRandomUser (page, name, email, password){
    await page.goto('https://realworld.qa.guru/');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'Your Name' }).click();
    await page.getByRole('textbox', { name: 'Your Name' }).fill(name);
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Sign up' }).click();
};

// Async Function Expression
const registerRandomUserVersion2 = async (page, name, email, password) => {
    const username = faker.internet.username();
    await page.goto('https://realworld.qa.guru/');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByRole('textbox', { name: 'Your Name' }).click();
    await page.getByRole('textbox', { name: 'Your Name' }).fill(username);
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill(faker.internet.email());
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(faker.internet.password());
    await page.getByRole('button', { name: 'Sign up' }).click();
    return username;
};
// Стрелочная функция const greet = (name) => `Hello, ${name}!`;
// IIFE

test('Пользователь может зарегистрироваться с логином и паролем', async ({ page }) => {
    const username = await registerRandomUserVersion2(page);
    await expect(page.getByRole('navigation')).toContainText(username);
    await page.screenshot({ path: 'screenshot.png' }); //делает скриншот
});