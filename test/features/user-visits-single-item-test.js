const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('user visits item individual page', () => {
  it('user creates item and then visits the individual item page', () => {
    const {title, description, imageUrl} = buildItemObject();
    
    browser.url('/items/create');
    
    browser.setValue('#title-input', title);
    browser.setValue('#description-input', description);
    browser.setValue('#imageUrl-input', imageUrl);
    browser.click('#submit-button');
    
    browser.click('.item-card a')
    
    assert.include(browser.getText('body'), description);
  });
});