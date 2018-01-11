const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Write your tests below:
  
  describe('title', async () => {
    it('title should be a string', async () => {
      const titulo = 1;
      
      const item = new Item({title: titulo});
      
      assert.strictEqual(item.title, titulo.toString());
    });
    
    it('title is required', async () => {
      const item = new Item({});
      const itemValidated = item.validateSync();
      assert.equal(itemValidated.errors.title.message, 'Path `title` is required.');
    });
  });
  
  describe('description', async () => {
    it('description should be a string', async () => {
      const description = 1;
      
      const item = new Item({description: description});
      
      assert.strictEqual(item.description, description.toString());
    });
    
    it('description is required', async () => {
      const item = new Item({});
      item.validateSync();
      assert.equal(item.errors.description.message, 'Path `description` is required.');
    })
  })
  
  describe('imageUrl', async () => {
    it('imageUrl should be string', async () => {
      const imageUrl = 1;
      
      const item = new Item({imageUrl: imageUrl});
      
      assert.strictEqual(item.imageUrl, imageUrl.toString());
    });
    
    it('imageUrl is required', async () => {
      const item = new Item({});
      item.validateSync();
      assert.equal(item.errors.imageUrl.message, 'Path `imageUrl` is required.');
    })
  })

});
