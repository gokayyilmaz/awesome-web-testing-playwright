import { test as base } from '@playwright/test';
import { BoardPage } from 'tests/pages/board';
import { GetStartedPage } from 'tests/pages/get-started';
import { MyBoardsPage } from 'tests/pages/my-boards';

type TrelloFixtures = {
  getStartedPage: GetStartedPage;
  boardPage: BoardPage;
  myBoardsPage: MyBoardsPage;
};

export const test = base.extend<TrelloFixtures>({
  getStartedPage: async ({ page }, use) => {
    await use(new GetStartedPage(page));
  },
  boardPage: async ({ page }, use) => {
    await use(new BoardPage(page));
  },
  myBoardsPage: async ({ page }, use) => {
    await use(new MyBoardsPage(page));
  },
});

export { expect } from '@playwright/test';
