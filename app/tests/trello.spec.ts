import { test, expect } from '@playwright/test';

test.beforeAll(async ({ request }) => {
  // Clear the database
  await request.post('http://localhost:3000/api/reset');
});

test('create board-list-card', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Name of your first board').fill('Chores');
  await page.getByPlaceholder('Name of your first board').press('Enter');
  await expect(page.locator('[name="board-title"]')).toHaveValue('Chores');
  await expect(page.getByPlaceholder('Enter list title...')).toBeVisible();
  await expect(page.getByTestId('list')).not.toBeVisible();

  await page.getByPlaceholder('Enter list title...').fill('TODO');
  await page.getByPlaceholder('Enter list title...').press('Enter');
  await expect(page.locator('[data-testid="list-name"]')).toHaveValue("TODO")

  await page.getByText('Add another card').click();
  await page.getByPlaceholder('Enter a title for this card...').fill('Buy groceries');
  await page.getByRole('button', { name: 'Add card' }).click();
  await expect(page.getByText('Buy groceries')).toBeVisible();
  await page.getByPlaceholder('Enter a title for this card...').fill('Mow the lawn');
  await page.getByRole('button', { name: 'Add card' }).click();
  await expect(page.getByText('Mow the lawn')).toBeVisible();
  await page.getByPlaceholder('Enter a title for this card...').fill('Walk the dog');
  await page.getByRole('button', { name: 'Add card' }).click();
  await expect(page.getByText('Walk the dog')).toBeVisible();
  await expect(page.getByTestId('card-text')).toHaveText(['Buy groceries', 'Mow the lawn', 'Walk the dog']);

  await page.getByRole('navigation').getByRole('button').click();
  await expect(page.getByText('My Boards')).toBeVisible();
  await expect(page.getByText('Chores')).toBeVisible();

});
