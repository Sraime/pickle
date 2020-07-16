@BoardSynchro @Board
Feature: synchronisation du board avec les autres utilisateur

  Background:
    Given une nouvelle Feature avec l’identifiant "5e9cb1ac31111718631563fd"

  Scenario: synchronisation de l'ajout d'un scenario
    Given je suis sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    And un autre onglet sur l'écran de d'édition de la feature "5e9cb1ac31111718631563fd"
    When je clique sur l'option d'ajout d'un scénario
    And je retourne à l'onglet précédent
    Then la feature contient 2 scénarios

  Scenario: synchronisation de la suppression d'un scenario
    Given je suis sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    And un autre onglet sur l'écran de d'édition de la feature "5e9cb1ac31111718631563fd"
    And les scénarios suivant sont enregistrés :
      | name |
      | S1   |
      | S2   |
    When je supprime le scenario en position 2
    And je retourne à l'onglet précédent
    Then la feature contient les scénarios dans l'ordre suivant :
      | name |
      | S1   |

  @SynchroTest
  Scenario: synchronisation du renommage d'un scenario
    Given je suis sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    And un autre onglet sur l'écran de d'édition de la feature "5e9cb1ac31111718631563fd"
    When je renomme le scénario en "scénario nominal"
    And je retourne à l'onglet précédent
    Then la feature contient les scénarios dans l'ordre suivant :
      | name |
      | scénario nominal |

  Scenario: synchronisation de l'ajout de steps à un Scénario
    Given je suis sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    And un autre onglet sur l'écran de d'édition de la feature "5e9cb1ac31111718631563fd"
    When j'ajoute les steps suivants :
      | scenarioNumber | sectionName | stepName |
      | 1              | Given       | step1    |
      | 1              | When        | step2    |
      | 1              | Then        | step3    |
    And je retourne à l'onglet précédent
    Then les steps suivant sont présents :
      | scenarioNumber | sectionName | stepName |
      | 1              | Given       | step1    |
      | 1              | When        | step2    |
      | 1              | Then        | step3    |

  @Background
  Scenario: synchronisation de l'ajout d'un step au Background
    Given je suis sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    And un autre onglet sur l'écran de d'édition de la feature "5e9cb1ac31111718631563fd"
    When j'ajoute le step "step1" dans le Background
    And je retourne à l'onglet précédent
    Then le Background contient le step "step1"

  @SynchroDelStep
  Scenario: synchronisation de la suppression d'un step
    Given je suis sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    And les steps suivants sont enregistrés :
      | scenarioNumber | sectionName | stepName |
      | 1              | Given       | step1    |
    And un autre onglet sur l'écran de d'édition de la feature "5e9cb1ac31111718631563fd"
    When je supprime le step "step1" de la section "Given"
    And je retourne à l'onglet précédent
    Then les steps suivant ne sont pas présents :
      | scenarioNumber | sectionName | stepName |
      | 1              | Given       | step1    |

  @SynchroEditStep
  Scenario: synchronisation du renommage d'un step
    Given je suis sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    And les steps suivants sont enregistrés :
      | scenarioNumber | sectionName | stepName |
      | 1              | Given       | step1    |
    And un autre onglet sur l'écran de d'édition de la feature "5e9cb1ac31111718631563fd"
    When je renomme le step "step1" de la section "Given" en "updated"
    And je retourne à l'onglet précédent
    Then les steps suivant sont présents :
      | scenarioNumber | sectionName | stepName |
      | 1              | Given       | updated  |

  @indep
  Scenario: les modification du board ne sont pas propagées aux utilisateur d'un autre board
    Given une nouvelle Feature avec l’identifiant "5b9bb1bb31111718631563bb"
    And je suis sur l'interface d'édition de la feature "5e9cb1ac31111718631563fd"
    And un autre onglet sur l'écran de d'édition de la feature "5b9bb1bb31111718631563bb"
    When je clique sur l'option d'ajout d'un scénario
    And je renomme la feature en "amazing feature"
    And j'ajoute les steps suivants :
      | scenarioNumber | sectionName | stepName |
      | 1              | Given       | step1    |
    And je retourne à l'onglet précédent
    Then le nom de la feature n'est pas renseigné sur le board
    And la feature contient 1 scénarios