import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    //Поиск элемента по типу
  await page.goto('file:///Users/katefrommoon/Desktop/Study/Playwright/demo.html');
  await page.getByRole('textbox', { name: 'Email' }).fill('ololo@mail.ru');
  await page.getByRole('textbox', { name: 'Пароль' }).fill('Qwerty123');
  await page.getByRole('button', { name: 'Войти' }).click();
  await expect(page.locator('#btn')).toContainText('Войти');
  await expect(page.locator('#btn')).toMatchAriaSnapshot(`- button "Войти"`);
  await expect(page.locator('span')).toContainText('Войти');
});
test.skip('test Class', async ({ page }) => {
  //Поиск элемента по классу
await page.goto('file:///Users/katefrommoon/Desktop/Study/Playwright/demo.html');
await page
    .locator('.el-input__inner', { name: 'Email' })
    .fill('ololo@mail.ru');
await page.locator('.el-input__inner', { name: 'Пароль' }).fill('hello123');
await page.locator('el-button').click();
});
/*
await page.getByTestId('email').click();
  await page.getByTestId('email').fill('ololo@mail.ru');
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill('Qwerty123');
  await page.getByRole('button', { name: 'Войти' }).click();
  */
  test('test by ID', async ({ page }) => {
    //Поиск элемента по ID
  await page.goto('file:///Users/katefrommoon/Desktop/Study/Playwright/demo.html');
  await page.locator('#email', { name: 'Email' }).fill('ololo@mail.ru');
  await page.locator('#password', { name: 'Пароль' }).fill('Qwerty123');
  await page.getByRole('button', { name: 'Войти' }).click();
});

test('test form', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('Ekaterina');
  await page.getByRole('textbox', { name: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Chepova');
  await page.getByRole('textbox', { name: 'name@example.com' }).click();
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('ololo@mail.ru');
  await page.locator('div').filter({ hasText: /^Female$/ }).click();
  await page.getByRole('textbox', { name: 'Mobile Number' }).click();
  await page.getByRole('textbox', { name: 'Mobile Number' }).fill('9055556667');
  await page.locator('#dateOfBirthInput').click();
  await page.getByRole('button', { name: 'Next Month' }).click();
  await page.getByRole('combobox').nth(1).selectOption('1991');
  await page.getByRole('option', { name: 'Choose Wednesday, May 1st,' }).click();
  await page.getByText('Sports').click();
  await page.getByText('Reading').click();
  await page.getByText('Music').click();
  await page.getByRole('textbox', { name: 'Current Address' }).click();
  await page.getByRole('textbox', { name: 'Current Address' }).fill('Moscow');
  await page.locator('.container > div > div:nth-child(3)').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('dialog', { name: 'Thanks for submitting the form' }).click();
  await expect(page.locator('tbody')).toContainText('ololo@mail.ru');
  await expect(page.getByRole('row', { name: 'Picture' }).getByRole('cell').nth(1)).toBeVisible();
});


test('test hw1', async ({ page }) => {
  await page.goto('https://realworld.qa.guru/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill('Pupa');
  await page.getByRole('textbox', { name: 'Email' }).fill('lupa@mail.ru');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('ololo123');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('navigation')).toContainText('Pupa');
});