const I = actor();
const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const FeatureModel = require('../models/feature.model');
const ScenarioModel = require('../models/scenario.model');
const config = require('../../config');

const cleanUpDb = async() => {
  const up = UserModel.deleteMany({});
  const us = ScenarioModel.deleteMany({});
  const uf = FeatureModel.deleteMany({});

  await Promise.all([
    up,us,uf
  ]);
  
}

After(async() => {
  await cleanUpDb();
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
