const I = actor();
const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const ScenarioModel = require('../models/scenario.model');
const config = require('../../config');

Before(async() => {
  if(mongoose.connection.readyState === 0) {
    var mongoDB = 'mongodb://'+config.mongodb.host+':'+config.mongodb.port+'/'+config.mongodb.db+'';
    mongoose.connect(mongoDB, { useNewUrlParser: true })
    .then(()=> {})
    .catch((e)=> console.error("DB error !", e));
  }
  await cleanUpDb();
});

const cleanUpDb = async() => {
  await UserModel.deleteMany({});
  await ScenarioModel.deleteMany({});
  const sc = new ScenarioModel({});
  await sc.save();
}

After(async() => {
  await cleanUpDb();
  mongoose.connection.close()
    .then(()=> {})
    .catch((e)=> console.error("DB closing error !", e));
});

Fail(async(test, err) => {
  
});

When('je saisis le champ {string} avec {string}', (name, value) => {
  I.fillField(name, value);
});

Then('le message {string} est affiché', (msg) => {
  I.see(msg);
});

Then('le message suivant est affiché:', (msg) => {
  I.see(msg.content);
});