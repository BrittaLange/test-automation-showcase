import { test, expect } from '@playwright/test';

test.afterAll(async ({page}) => {
  // Delete customer
});

test('has title', async ({ page }) => {
  await page.goto('http://localhost/simple-crud-webapp/app/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Simple CRUD Web App/);
});

test('Create customer with valid data', async ({ page }) => {
  await page.goto('http://localhost/simple-crud-webapp/app/');
  // Expected values.
  const name = 'John Wayne';
  const location = 'Denver';
  // Fill name into input field name.
  await page.locator('#inputName').fill(name);
  // Fill location into input field location.
  await page.locator('#inputLocation').fill(location);
  // Click button "save".
  await page.getByText('Save').click();
  // Expect customer to be displayed in list.
  const row = await page.locator('tr').filter({hasText: 'John Wayne'});
  console.log(row);
  const actualName = await row.innerText();
  console.log(actualName);
});