@GherkinGenerator @Board
Feature: génération du code gherkin d'une feature

  Background:
    Given une Feature sans Scénario avec l’identifiant "5e9cb1ac31111718631563fd"

  @US27
  Scenario: generation du code avec un scénario seulement
    Given le scenario "S1" de la feature avec l'identifiant "5e9cb1ac31111718631563fd" avec les steps suivants :
      | sectionName | stepName |
      | Given       | step1    |
      | When        | step2    |
      | Then        | step3    |
    And je suis sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    And le nom de la feature est "amazing feature"
    When je demande la generation du code gherkin
    Then le code gherkin généré est :
      """
      Feature: amazing feature

        Scenario: S1
          Given step1
          When step2
          Then step3
      """

  @Background
  Scenario: generation du code avec un scénario et un Background
    Given le Background de la feature avec l'identifiant "5e9cb1ac31111718631563fd" avec le step "step1"
    And le scenario "S1" de la feature avec l'identifiant "5e9cb1ac31111718631563fd" avec les steps suivants :
      | sectionName | stepName |
      | Given       | step2    |
    And je suis sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    When je demande la generation du code gherkin
    Then le code gherkin généré est :
      """
      Feature: 

        Background: 
          Given step1

        Scenario: S1
          Given step2
      """

  @Background
  Scenario: generation du code avec un Background
    Given le Background de la feature avec l'identifiant "5e9cb1ac31111718631563fd" avec le step "step1"
    And je suis sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    When je demande la generation du code gherkin
    Then le code gherkin généré est :
      """
      Feature: 

        Background: 
          Given step1
      """

  @US28
  Scenario: téléchargement du code gherkin
    Given je suis sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    And le scenario "S1" de la feature avec l'identifiant "5e9cb1ac31111718631563fd" avec les steps suivants :
      | sectionName | stepName |
      | Given       | step1    |
      | When        | step2    |
      | Then        | step3    |
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