const I = actor();
const BoardSectionLocators = require('./locators/board-section-locators');

Given('les scénarios suivant sont renseignés :', (scTable) => {
    let builderLocator;
    scTable.parse().hashes().forEach((sc, index) => {
        builderLocator = '.scenario-builder-card:nth-child(' + (index+1) + ')';
        if(index > 0){
            I.click('.btn-add-scenario');
            I.waitForElement(builderLocator)
        }
        I.click(builderLocator + ' .scenario-name');
        I.fillField(builderLocator + ' .input-edit-scenario-name', sc.name);
        I.click(builderLocator + ' .btn-save-scenario-name');
    })
});

When('je clique sur l\'option d\'ajout d\'un scénario', () => {
    I.click('.btn-add-scenario');
});

When('j\'ajoute les steps suivants :', (stepsTable) => {
    let indexScenario;
    stepsTable.parse().hashes().forEach((step) => {
        indexScenario = step.scenarioNumber ? step.scenarioNumber : 1;
        I.fillField({css: '.scenario-builder-card:nth-child(' + indexScenario + ') ' 
        + BoardSectionLocators.sectionStepsAddLocator(step.sectionName)}
        , step.stepName
        );
        I.pressKey('Enter');
    });
});

Then('la feature contient {int} scénarios', (nbScenarios) => {
    I.seeNumberOfElements('scenario-builder',nbScenarios)
});

Then('les steps suivant ne sont pas présents :', (stepsTable) => {
    let indexScenario;
    stepsTable.parse().hashes().forEach((step) => {
        indexScenario = step.scenarioNumber ? step.scenarioNumber : 1;
        I.dontSee(step.stepName, 
            {css: '.scenario-builder-card:nth-child(' + indexScenario + ') ' 
            + BoardSectionLocators.sectionStepsListLocator(step.sectionName)}
        );
    });
});