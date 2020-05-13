const I = actor();
const FeatureModel = require('../models/feature.model');
const UserModel = require('../models/user.model');

Given('les features de l\'utilisateur avec l\'id {string}', async(idUser, featureTable) => {
  let newFeature;
  let featurePromises = [];
  featureTable.parse().hashes().forEach((ft) => {
    newFeature = new FeatureModel({_id: ft.id, name: ft.name, userId: idUser})
    featurePromises.push(newFeature.save());
  })
  await Promise.all(featurePromises);
});

Given('l\'utilisateur suivant est enregistré', async(userTable) => {
  let userData = userTable.parse().hashes();
  const fdata = {
    _id: userData[0].id, 
    pseudo: userData[0].pseudo, 
    email: userData[0].email, 
    password: userData[0].password
  }
  const nuser = new UserModel(fdata);
  await nuser.save();
})