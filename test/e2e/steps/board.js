
const I = actor();
const BoardSectionLocators = require('./locators/board-section-locators');

function addStepsFromDataTable(step) {
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
    let btnLocator = {xpath: ".//section-steps[@id = 'section-steps-given']//mat-list-item[contains(., 'step1')]//button[contains(@class,'btn-step-del')]"}
    I.click(btnLocator);
});

When('j\'ajoute les steps suivant:', (steps) => {
    addStepsFromDataTable(steps);
})

Then('la section d\'édition {string} est affichée', (sectionName) => {
    I.see(sectionName,{css: BoardSectionLocators.sectionStepsTitleLocator(sectionName)});
});

Then('la section {string} contient le step', (sectionName, stepName) => {
    I.see(stepName, {css: BoardSectionLocators.sectionStepsListLocator(sectionName)});
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
    I.see(gherkin, '#gherkin-generator .gherkin-scenario');
});
