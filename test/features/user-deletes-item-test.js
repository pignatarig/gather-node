const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('user deletes item', () => {
  describe('user creates item and then deletes it from the index page', () => {
    const {title, description, imageUrl} = buildItemObject();

    beforeEach(() => {
      browser.url("/items/create");

      browser.setValue("#title-input", title);
      browser.setValue("#description-input", description);
      browser.setValue("#imageUrl-input", imageUrl);
      browser.click("#submit-button");
      browser.click('.item-card a.delete-link');
    });
    
    it('user must see a confirmation page before deleting the item', () => {
      
      assert.include(browser.getText('#delete-item-warning-message'), 'Are you sure you want to delete the item: ' + title + '?');    
    });
    it('user aborts the delete action from the confirmation page', () => {    
      browser.click('.cancel-button');
      
      assert.include(browser.getText('body'), title);
    });
    
    it('user deletes the item confirming the action', () => {
      browser.click('.delete-button');
      
      assert.notInclude(browser.getText('body'), title);
    });
  })
  
});