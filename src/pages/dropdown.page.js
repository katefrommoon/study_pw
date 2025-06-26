import { test } from "@playwright/test";

export class DropdownPage {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.locator('a.dropdown-item', { hasText: 'Logout' });
  }
  async logout() {
    return test.step("Разлогиниться", async () => {
      this.logoutButton.click();
    });
  }
}
