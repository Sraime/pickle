
const I = actor();
const BoardSectionLocators = require('./locators/board-section-locators');

function addStepsFromDataTable(steps) {
    var stepName;
    var sectionName;
    steps.rows.forEach(step => {
        sectionName = step.cells[0].value;
        stepName = step.cells[1].value;
        I.fillField({css: BoardSectionLocators.sectionStepsAddLocator(sectionName)}
        , stepName);
        I.pressKey('Enter');
    });
}

Given('les steps suivants ont été ajoutés', (steps) => {
    addStepsFromDataTable(steps);
});

Given('le step {string} de la section {string} est en mode édition', (step, sectionName) => {
    sectionName = sectionName.toLowerCase();
    let stepElement = {xpath: ".//section-steps[@id = 'section-steps-"+sectionName+"']//mat-list-item[contains(., '"+step+"')]"}
    I.click(stepElement);
});

When('j\'ajoute le step suivant à la section {string}', (sectionName, stepName) => {
    I.fillField({css: BoardSectionLocators.sectionStepsAddLocator(sectionName)}
        , stepName);
    I.pressKey('Enter');
});

When('j\'ajoute les steps suivant à la section {string}:', (sectionName, steps) => {
    var stepName;
    steps.rows.forEach(step => {
        stepName = step.cells[0].value;
        I.fillField({css: BoardSectionLocators.sectionStepsAddLocator(sectionName)}
            , stepName);
        I.pressKey('Enter');
    }); 
});

When('je supprime le step {string} de la section {string}', async(step, sectionName) => {
    let btnLocator = {xpath: ".//section-steps[@id = 'section-steps-"+sectionName.toLowerCase()+"']//mat-list-item[contains(., '"+step+"')]//button[contains(@class,'btn-step-del')]"}
    I.click(btnLocator);
});

When('j\'ajoute les steps suivant:', (steps) => {
    addStepsFromDataTable(steps);
});

When('j\'active le mode d\'édition pour le step {string} de la section {string}', () => {
    let stepElement = {xpath: ".//section-steps[@id = 'section-steps-given']//mat-list-item[contains(., 'step1')]"}
    I.click(stepElement);
});

When('j\'annule la modification du step', () => {
    I.click('.mat-dialog-content .cancel-edit-step');
});

When('je valide la modification du step', () => {
    I.click('.mat-dialog-content .save-edit-step');
});

When('je modifie le texte du step en {string}', (newTexteStep) => {
    I.fillField('.mat-dialog-content input.edit-step', newTexteStep);
});

When('je renomme le scénario en {string}', (newName) => {
    I.click('.scenario-name');
    I.fillField('.input-edit-scenario-name', newName);
    I.click('.btn-save-scenario-name');
});

Then('la section d\'édition {string} est affichée', (sectionName) => {
    I.see(sectionName,{css: BoardSectionLocators.sectionStepsTitleLocator(sectionName)});
});

Then('la section {string} contient le step', (sectionName, stepName) => {
    I.see(stepName.content, {css: BoardSectionLocators.sectionStepsListLocator(sectionName)});
});

Then('la section {string} contient les steps dans l\'ordre suivant:', (sectionName, steps) => {
    var stepName;
    steps.rows.forEach(step => {
        stepName = step.cells[0].value;
        I.see(stepName, {css: BoardSectionLocators.sectionStepsListLocator(sectionName)});
    });
});

Then('le step {string} n\'existe pas la section {string}', (step, sectioName) => {
    I.dontSee(step, BoardSectionLocators.sectionStepsListLocator(sectioName));
});

Then('le scénario Gherkin n\'est pas affiché', () => {
    I.dontSeeElement('#gherkin-generator .gherkin-scenario');
});

Then('le scénario Gherkin suivant est affiché:', (gherkin) => {
    I.see(gherkin.content, 'gherkin-generator');
});

Then('le champs de modification du step contient {string}', (textContent) => {
    I.seeInField('.mat-dialog-content input.edit-step', textContent);
});

Then('le mode d\'édition d\'un step s\'affiche', () => {
    I.seeElement('.mat-dialog-title');
    I.seeElement('.mat-dialog-content');
});

Then('le nom du scénario est {string}', (scenarioName) => {
    I.see(scenarioName, '.scenario-name')
});
