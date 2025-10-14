import { test, expect } from './fixtures/trello-test';

test.beforeAll(async ({ request }) => {
  // Clear the database
  await request.post('http://localhost:3000/api/reset');
});

test('create board-list-card', async ({ getStartedPage, boardPage, myBoardsPage }) => {
  // Load the app
  await getStartedPage.load();

  // Create a new list
  await getStartedPage.createFirstBoard('Chores');
  await boardPage.expectNewBoardLoaded('Chores');

  // Create list
  await boardPage.addList('TODO');
  await expect(boardPage.listName).toHaveValue('TODO');

  // Add cards to list
  await boardPage.addCardToList(0, 'Buy groceries');
  await boardPage.addCardToList(0, 'Mow the lawn');
  await boardPage.addCardToList(0, 'Walk the dog');
  await expect(boardPage.cardTexts).toHaveText(['Buy groceries', 'Mow the lawn', 'Walk the dog']);

  // Navigate to home
  await boardPage.goHome();
  await myBoardsPage.expectLoaded(['Chores']);
});
