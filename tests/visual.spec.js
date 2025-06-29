import { test, expect } from '@playwright/test';

test("Визуальная регрессия", async ({ page }) => {
  await page.goto("https://realworld.qa.guru/");
  await expect(page.locator('.navbar-brand')).toBeVisible();
  expect(page).toHaveScreenshot("realworldHome.png", {
    mask: [page.locator(".date"), page.locator(".counter")], // Замаскировать динамический контент ( даты и каунтеры)
    fullPage: true,
    animations: "disabled",
    threshold: 0.1, //сколько процентов допустимо изменений по сравнению с предыдущец версией снэпшота
  });
  const pageContent = await page.locator("body").innerText();
  expect(pageContent).toMatchSnapshot("realworldHome.txt");
});

test("Визуальная регрессия с моками", async ({ page }) => {
  page.route("**/tags", async (route) => {
    const json = {
      tags: [
        "понедельник",
        "пятничка",
        "Константиновский Константин Константинович",
      ],
    };
    await route.fulfill({ json });
  });
  await page.goto("https://realworld.qa.guru/");
  await expect(page.locator(".navbar-brand")).toBeVisible();
  expect(page).toHaveScreenshot();
});

test("Визуальная регрессия с модификацией запроса", async ({ page }) => {
  page.route('**/tags', async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    json.tags.unshift("пятничка");
    await route.fulfill({ json });
  });
  await page.goto("https://realworld.qa.guru/");
  await expect(page.locator(".navbar-brand")).toBeVisible();
  expect(page).toHaveScreenshot();
});


test('Визуальная регрессия_1', async ({ page }) => {
    await page.goto('https://realworld.qa.guru/');
    await expect(page.locator('.navbar-brand')).toBeVisible();
    await expect(page).toHaveScreenshot('realworldHome.png', {
        mask: [page.locator('.date'), page.locator('.counter')], // Замаскировать динамический контент ( даты и каунтеры)
        fullPage: true,
        animations: 'disabled',
        threshold: 0.1,
    });
});