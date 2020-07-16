@LoadFeature @Board
Feature: chargement de la Feature à l'ouverture board
    
  Scenario: chargement des informations d'une Feature avec un Scénario
    Given les features suivantes :
      | id                       | name |
      | 5e9cb1ac31111718631563fd | FT1  |
    And le scenario "SC1" de la feature avec l'identifiant "5e9cb1ac31111718631563fd" avec les steps suivants :
      | sectionName | stepName |
      | Given       | step1    |
      | When        | step2    |
      | Then        | step3    |
    When je me rend sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    Then le nom de la feature sur le board est "FT1"
    And les steps suivant sont présents :
      | scenarioNumber | sectionName | stepName |
      | 1              | Given       | step1    |
      | 1              | When        | step2    |
      | 1              | Then        | step3    |

  @Background
  Scenario: chargement des informations d'une Feature avec un Background
    Given les features suivantes :
      | id                       | name |
      | 5e9cb1ac31111718631563fd | FT1  |
    And le Background de la feature avec l'identifiant "5e9cb1ac31111718631563fd" avec le step "step1"
    When je me rend sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    Then le Background contient le step "step1"
