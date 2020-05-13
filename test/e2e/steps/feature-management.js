const I = actor();

Then('la liste des features est la suivante :', (featureTable) => {
  featureTable.parse().hashes().forEach((ft, index) => {
    I.see(ft.name, '#feature-table tbody tr:nth-child('+(index+1)+') td:first-child');
  })
});

When('je clique sur la ligne contenant {string} de la liste des features', (featureName) => {
  I.click(featureName)
});
