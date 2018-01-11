const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:
describe('user visits create item', () => {
  describe('user posts a new item', () => {
    it('user visits create item posts a new item and see the item', () => {
      const {title, description, imageUrl} = buildItemObject();
      
      browser.url('/items/create');
      browser.setValue('#title-input', title);
      browser.setValue('#description-input', description);
      browser.setValue('#imageUrl-input', imageUrl);
      browser.click('#submit-button');
      
      assert.include(browser.getText('body'), title);
      assert.include(browser.getAttribute('body img', 'src'), imageUrl);
    })
  })
})
