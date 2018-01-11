const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('create item and visit its individual page', () => {
    it('visit /items/:id and check the title and description are correct', async () => {
      const newItem = await seedItemToDatabase();
      
      const response = await request(app).get('/items/' + newItem._id);
      
      assert.equal(parseTextFromHTML(response.text, '.single-item-title').trim(), newItem.title);
      assert.equal(parseTextFromHTML(response.text, '.single-item-description').trim(), newItem.description);
    });
  });
});
