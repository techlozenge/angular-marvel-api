import { AngularApiPage } from './app.po';

describe('angular-api App', () => {
  let page: AngularApiPage;

  beforeEach(() => {
    page = new AngularApiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
