import { test, expect } from '@playwright/test';

let hasText: boolean | undefined;

test('Create customer with valid data', async ({ page }) => {
  let customerIsCreated: boolean | undefined;
  await page.goto('http://localhost/simple-crud-webapp/app/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Simple CRUD Web App/);
  // Arrange Test Data.
  const name = 'John Wayne';
  const location = 'Denver';
  // Act - Test steps.
  // Fill name into input field name.
  await page.locator('#inputName').fill(name);
  // Fill location into input field location.
  await page.locator('#inputLocation').fill(location);
  // Click button "save".
  await page.getByText('Save').click();
  // Assert.
  // Expect success message to be displayed.
  await expect(page.getByRole('alert')).toHaveText('New customer has been saved.');
  hasText = await page.getByRole('alert').locator('text=New customer has been saved.').count() > 0;
  if (hasText) {
    console.log('Success message exists');
  }
  // Expect customer to be displayed in table.
  const lastRow = await page.locator('table tbody tr').last();
  await expect(lastRow.locator('td').nth(0)).toHaveText(name);
  await expect(lastRow.locator('td').nth(1)).toHaveText(location);
  console.log('Created customer is displayed in the last row.');
});

test.afterEach('Teardown',async ({ page }) => {
  if (hasText) {
    // Clean up and delete the created customer.
    const lastRow = await page.locator('table tbody tr').last();
    const lastCol = await lastRow.locator('td').nth(2);
    const href = await lastCol.getByRole('link', { name: 'Delete' }).getAttribute('href');
    if (href) {
      await page.locator(`a[href="${href}"]`).click();
    }
  }
});

