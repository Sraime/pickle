const I = actor();

Then('la feature contient {int} scénarios', (nbScenarios) => {
    I.seeNumberOfElements('scenario-builder',1)
});