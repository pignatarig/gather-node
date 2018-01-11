const {assert} = require('chai');

describe('User visits root', () => {
  describe('without existing items', () => {
    it('starts blank', () => {
      browser.url('/');
      assert.equal(browser.getText('#items-container'), '');
    });
  });
  
  describe('user visits root and looks for the create link', () => {
    it('user clicks the create link to go to create.html', () =>  {
      browser.url('/');
      browser.click('a[href="/items/create"]');
      assert.include(browser.getText('body'), 'Create');
    })
  })
});
