@FeatureBoard
Feature: board de création des scenario d'une Feature
    En tant que Concepteur des scenarios de tests
    Je veux construire un les scenarios de ma Feature en Gherkin
    Afin de structurer et standardiser leur écriture

    @US30
    Scenario: accès au board de création d'une feature
        Given le navigateur web est ouvert
        When je me rend sur l'écran d'édition d'une nouvelle feature
        Then la feature contient 1 scénarios

    @US19
    Scenario: ajout d'un nouveau scénario
        Given je suis sur l'écran d'édition d'une nouvelle feature
        When je clique sur l'option d'ajout d'un scénario
        Then la feature contient 2 scénarios

    @US26
    Scenario: ajout d'un step dans un scénario sans impacte sur les autres
        Given je suis sur l'écran d'édition d'une nouvelle feature
        And les scénarios suivant sont enregistrés :
            | name |
            | S1   |
            | S2   |
        When j'ajoute les steps suivants :
            | scenarioNumber | sectionName | stepName |
            | 1              | Given       | step1    |
        Then les steps suivant ne sont pas présents :
            | scenarioNumber | sectionName | stepName |
            | 2              | Given       | step1    |

    @US20
    Scenario: suppression d'un scenario
        Given je suis sur l'écran d'édition d'une nouvelle feature
        And les scénarios suivant sont enregistrés :
            | name |
            | S1   |
            | S2   |
        When je supprime le scenario en position 2
        Then la feature contient les scénarios dans l'ordre suivant :
            | name |
            | S1   |

    @US29
    Scenario: nommage de la feature
        Given je suis sur l'écran d'édition d'une nouvelle feature
        When je renomme la feature en "amazing feature"
        Then le nom de la feature est "amazing feature"