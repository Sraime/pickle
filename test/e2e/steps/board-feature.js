const I = actor();
const FeatureBoardLocators = require('./locators/board-feature-locators');
const FeatureBoardClass = require('./helpers/feature-board-helper');
const FeatureBoardHelper = new FeatureBoardClass(I);
const ScenarioModel = require('../models/scenario.model');
const FeatureModel = require('../models/feature.model');

Given('une feature avec l’identifiant {string}', async (featureId) => {
    const f = new FeatureModel({_id: featureId});
    const sc = new ScenarioModel({featureId: featureId});
    await Promise.all([sc.save(), f.save()]);
})

Given('le nom de la feature est {string}', (name) => {
    FeatureBoardHelper.renameFeature(name);
});

Given('les scénarios suivant sont enregistrés :', (scTable) => {
    scTable.parse().hashes().forEach((sc, index) => {
        if(index === 0){
            FeatureBoardHelper.renameLastScenario(sc.name);
        } else {
            FeatureBoardHelper.addScenario(sc.name);
        }
    })
});

Given('les features suivantes :', async (featuresDataTable) => {
    let featuresSavePromises = [];
    let nf;
    featuresDataTable.parse().hashes().forEach((featureData) => {
        nf = new FeatureModel({
            _id: featureData.id,
            name: featureData.name
        });
        featuresSavePromises.push(nf.save());
    });
    await Promise.all(featuresSavePromises)
});

Given('les steps suivants sont enregistrés :', (stepsTable) => {
    let indexScenario;
    stepsTable.parse().hashes().forEach((step) => {
        indexScenario = step.scenarioNumber ? step.scenarioNumber : 1;
        FeatureBoardHelper.addStep(indexScenario, step.sectionName, step.stepName);
    });
});

Given('le scenario {string} de la feature avec l\'identifiant {string} avec les steps suivants :', async (scenarioName, featureId, stepsTable) => {
    let scData = {name: scenarioName, featureId: featureId, givenSteps: [], whenSteps: [], thenSteps: []};
    stepsTable.parse().hashes().forEach((step) => {
        scData[step.sectionName.toLowerCase()+'Steps'].push({name: step.stepName});
    });
    const ns = new ScenarioModel(scData);
    await ns.save();

});

When('je clique sur l\'option d\'ajout d\'un scénario', () => {
    FeatureBoardHelper.addScenario();
});

When('j\'ajoute les steps suivants :', (stepsTable) => {
    let indexScenario;
    stepsTable.parse().hashes().forEach((step) => {
        indexScenario = step.scenarioNumber ? step.scenarioNumber : 1;
        FeatureBoardHelper.addStep(indexScenario, step.sectionName, step.stepName);
    });
});

When('je supprime le scenario en position {int}', (position) => {
    FeatureBoardHelper.deleteScenario(position);
});

When('je renomme la feature en {string}', (name) => {
    FeatureBoardHelper.renameFeature(name);
});

Then('la feature contient {int} scénarios', (nbScenarios) => {
    I.seeNumberOfElements('scenario-builder',nbScenarios)
});

Then('les steps suivant ne sont pas présents :', (stepsTable) => {
    let indexScenario;
    stepsTable.parse().hashes().forEach((step) => {
        indexScenario = step.scenarioNumber ? step.scenarioNumber : 1;
        I.dontSee(step.stepName, 
            FeatureBoardLocators.scenarioSection(indexScenario, step.sectionName)
        );
    });
});

Then('la feature contient les scénarios dans l\'ordre suivant :', (scTable) => {
    scTable.parse().hashes().forEach((sc, index) => {
        I.see(sc.name, FeatureBoardLocators.scenarioName(index+1));
    })
});


Then('les steps suivant sont présents :', (stepsTable) => {
    stepsTable.parse().hashes().forEach((step) => {
        I.see(step.stepName, FeatureBoardLocators.scenarioSection(step.scenarioNumber, step.sectionName));
    });
});

Given('le nom de la feature sur le board est {string}', (name) => {
    I.see(name, FeatureBoardLocators.featureName);
});

Then('le nom de la feature n\'est pas renseigné sur le board', () => {
    I.see('your text here', FeatureBoardLocators.featureName);
});
