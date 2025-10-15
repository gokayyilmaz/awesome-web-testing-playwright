import { test as base } from '@playwright/test';
import { BoardPage } from 'tests/pages/board';
import { MyBoardsPage } from 'tests/pages/my-boards';

type TrelloFixtures = {
  boardPage: BoardPage;
  myBoardsPage: MyBoardsPage;
};

export const test = base.extend<TrelloFixtures>({
  boardPage: async ({ page }, use) => {
    await use(new BoardPage(page));
  },
  myBoardsPage: async ({ page }, use) => {
    await use(new MyBoardsPage(page));
  },
});

export { expect } from '@playwright/test';
