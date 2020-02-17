@GherkinGenerator
Feature: génération du code gherkin d'une feature

  @US27
  Scenario: generation du code avec un scénario
    Given je suis sur l'interface de création d'une feature
    And le nom de la feature est "amazing feature"
    And les scénarios suivant sont enregistrés :
      | name |
      | S1 |
    When j'ajoute les steps suivants :
      | scenarioNumber | sectionName | stepName |
      | 1              | Given       | step1    |
      | 1              | When        | step2    |
      | 1              | Then        | step3    |
    And je demande la generation du code gherkin
    Then le code gherkin généré est :
      """
      Feature: amazing feature

        Scenario: S1
          Given step1
          When step2
          Then step3
      """