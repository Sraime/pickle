const I = actor();

When('je clique sur l\'option d\'ajout d\'un scénario', () => {
    I.click('.btn-add-scenario');
});

Then('la feature contient {int} scénarios', (nbScenarios) => {
    I.seeNumberOfElements('scenario-builder',nbScenarios)
});