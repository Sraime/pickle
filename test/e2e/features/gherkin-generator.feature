@GherkinGenerator
Feature: génération du code gherkin d'une feature

  Background:
    Given une feature avec l’identifiant "5e9cb1ac31111718631563fd"

  @US27
  Scenario: generation du code avec un scénario
    Given je suis sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
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

  @US28
  Scenario: téléchargement du code gherkin
    Given je suis sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    And les scénarios suivant sont enregistrés :
      | name |
      | S1 |
    And les steps suivants sont enregistrés :
      | scenarioNumber | sectionName | stepName |
      | 1              | Given       | step1    |
      | 1              | When        | step2    |
      | 1              | Then        | step3    |
    When je demande la generation du code gherkin
    And je demande l'export du code gherkin généré
    Then le fichier "feature_code.feature" est téléchargé et contient le code suivant : 
      """
      Feature: 

        Scenario: S1
          Given step1
          When step2
          Then step3
      """