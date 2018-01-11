const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('GET /items/create', () => {
    it('renders an empty form', async () => {
      const response = await request(app).get('/items/create');
            
      assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
    });
  });
  
  describe('POST /items/create', () => {
    it('should store the item on DB', async () => {
      const response = await request(app).post('/items/create').type('form').send(itemToCreate);
      
      const createdItem = await Item.findOne(itemToCreate);
      
      assert.isNotNull(createdItem, 'El item es null, no ha sido creado');
    });
    
    it('should redirect to /', async() => {      
      const response = await request(app).post('/items/create').type('form').send(itemToCreate);
      
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/')
    });
    
    it('Post request with no title should display error message', async () => {
      const item = {description: 'descripcion', imageUrl: 'http://google.com'}
      
      const response = await request(app).post('/items/create').type('form').send(item);
      
      const items = await Item.find({});
      
      assert.equal(items.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required') 
    });
    
    it('Post request with no description should display error message', async () => {
      const item = {title: 'título', description: '', imageUrl: 'http://google.com'}
      
      const response = await request(app).post('/items/create').type('form').send(item);
      
      const items = await Item.find({});
      
      assert.equal(items.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required') 
    })
    
    it('Post request with no imageUrl should display error message', async () => {
      const item = {title: 'título', description: 'descripcion', imageUrl: ''}
      
      const response = await request(app).post('/items/create').type('form').send(item);
      
      const items = await Item.find({});
      
      assert.equal(items.length, 0);
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required') 
    })
  });

});
