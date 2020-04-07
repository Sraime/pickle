Feature: Synchronisation du board avec les autres utilisateur

  Scenario: synchronisation de l'ajout d'un scenario
    Given je suis sur l'écran d'édition d'une nouvelle feature
    And un autre onglet sur l'écran de d'édition d'une feature
    When je clique sur l'option d'ajout d'un scénario
    And je retourne à l'onglet précédent
    Then la feature contient 2 scénarios

  Scenario: synchronisation de la suppression d'un scenario
    Given je suis sur l'écran d'édition d'une nouvelle feature
    And un autre onglet sur l'écran de d'édition d'une feature
    And les scénarios suivant sont enregistrés :
      | name |
      | S1   |
      | S2   |
    When je supprime le scenario en position 2
    And je retourne à l'onglet précédent
    Then la feature contient les scénarios dans l'ordre suivant :
      | name |
      | S1   |

  Scenario: synchronisation du renommage d'un scenario
    Given je suis sur l'écran d'édition d'une nouvelle feature
    And un autre onglet sur l'écran de d'édition d'une feature
    When je renomme le scénario en "scénario nominal"
    And je retourne à l'onglet précédent
    Then la feature contient les scénarios dans l'ordre suivant :
      | name |
      | scénario nominal |

  Scenario: synchronisation de l'ajout d'un step
    Given je suis sur l'écran d'édition d'une nouvelle feature
    And un autre onglet sur l'écran de d'édition d'une feature
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

  @SynchroDelStep
  Scenario: synchronisation de la suppression d'un step
    Given je suis sur l'écran d'édition d'une nouvelle feature
    And les steps suivants sont enregistrés :
      | scenarioNumber | sectionName | stepName |
      | 1              | Given       | step1    |
    And un autre onglet sur l'écran de d'édition d'une feature
    When je supprime le step "step1" de la section "Given"
    And je retourne à l'onglet précédent
    Then les steps suivant ne sont pas présents :
      | scenarioNumber | sectionName | stepName |
      | 1              | Given       | step1    |

@SynchroEditStep
  Scenario: synchronisation du renommage d'un step
    Given je suis sur l'écran d'édition d'une nouvelle feature
    And les steps suivants sont enregistrés :
      | scenarioNumber | sectionName | stepName |
      | 1              | Given       | step1    |
    And un autre onglet sur l'écran de d'édition d'une feature
    When je renomme le step "step1" de la section "Given" en "updated"
    And je retourne à l'onglet précédent
    Then les steps suivant sont présents :
      | scenarioNumber | sectionName | stepName |
      | 1              | Given       | updated  |