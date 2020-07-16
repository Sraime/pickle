const I = actor();
const FeatureModel = require("../models/feature.model");
const UserModel = require("../models/user.model");
const ScenarioModel = require("../models/scenario.model");
const BackgroundModel = require("../models/background.model");

Given(
  "les features de l'utilisateur avec l'id {string}",
  async (idUser, featureTable) => {
    let newFeature;
    let featurePromises = [];
    featureTable
      .parse()
      .hashes()
      .forEach((ft) => {
        newFeature = new FeatureModel({
          _id: ft.id,
          name: ft.name,
          userId: idUser,
        });
        featurePromises.push(newFeature.save());
      });
    await Promise.all(featurePromises);
  }
);

Given("une nouvelle Feature avec l’identifiant {string}", async (featureId) => {
  const f = new FeatureModel({ _id: featureId });
  const sc = new ScenarioModel({ featureId: featureId });
  const background = new BackgroundModel({ featureId: featureId });
  await Promise.all([sc.save(), f.save(), background.save()]);
});

Given(
  "une Feature sans Scénario avec l’identifiant {string}",
  async (featureId) => {
    const f = new FeatureModel({ _id: featureId });
    const background = new BackgroundModel({ featureId: featureId });
    await Promise.all([f.save(), background.save()]);
  }
);

Given("l'utilisateur suivant est enregistré", async (userTable) => {
  let userData = userTable.parse().hashes();
  const fdata = {
    _id: userData[0].id,
    pseudo: userData[0].pseudo,
    email: userData[0].email,
    password: userData[0].password,
  };
  const nuser = new UserModel(fdata);
  await nuser.save();
});

Given("les features suivantes :", async (featuresDataTable) => {
  let featuresBackgroundSavePromises = [];
  let newFeature;
  let newBackground;
  featuresDataTable
    .parse()
    .hashes()
    .forEach((featureData) => {
      newFeature = new FeatureModel({
        _id: featureData.id,
        name: featureData.name,
      });
      newBackground = new BackgroundModel({ featureId: featureData.id });
      featuresBackgroundSavePromises.push(newFeature.save());
      featuresBackgroundSavePromises.push(newBackground.save());
    });
  await Promise.all(featuresBackgroundSavePromises);
});

Given(
  "le scenario {string} de la feature avec l'identifiant {string} avec les steps suivants :",
  async (scenarioName, featureId, stepsTable) => {
    let scData = {
      name: scenarioName,
      featureId: featureId,
      givenSteps: [],
      whenSteps: [],
      thenSteps: [],
    };
    stepsTable
      .parse()
      .hashes()
      .forEach((step) => {
        scData[step.sectionName.toLowerCase() + "Steps"].push({
          name: step.stepName,
        });
      });
    const ns = new ScenarioModel(scData);
    await ns.save();
  }
);

Given(
  "le Background de la feature avec l'identifiant {string} avec le step {string}",
  async (featureId, stepName) => {
    await BackgroundModel.deleteOne({ featureId: featureId });
    const nb = new BackgroundModel({
      featureId: featureId,
      givenSteps: [{ name: stepName }],
    });
    await nb.save();
  }
);
