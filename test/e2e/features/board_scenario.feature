@board
Feature: board de création d'un scénario
    En tant que Concepteur de tests
    Je veux construire un scénario via l'interface
    Afin de structurer son écriture collaborativement et facilité l'accès au Gherkin

    Scenario: accès à l'interface de création
        Given le navigateur web est ouvert
        When je me rend sur la page de création d'un scénario
        Then la section d'édition "Given" est affichée
        And la section d'édition "When" est affichée
        And la section d'édition "Then" est affichée

    Scenario Outline: ajout d'un step une section
        Given je suis sur l'interface de création d'un scénario
        When j'ajoute le step suivant à la section "<sectionName>"
            """step test"""
        Then la section "<sectionName>" contient le step
            """step test"""

            Examples:
                |sectionName|
                |Given|
                |When|
                |Then|

    Scenario Outline: ajout de plusieurs steps une section
        Given je suis sur l'interface de création d'un scénario
        When j'ajoute les steps suivant à la section "<sectionName>":
            |step1|
            |step2|
        Then la section "<sectionName>" contient les steps dans l'ordre suivant:
            |step1|
            |step2|

            Examples:
                |sectionName|
                |Given|
                |When|
                |Then|

    Scenario Outline: ajout d'un step avec plus 100 caractères
        Given je suis sur l'interface de création d'un scénario
        When j'ajoute le step suivant à la section "<sectionName>"
            """xxxxxyyyyyxxxxxyyyyyxxxxxyyyyyxxxxxyyyyyxxxxxyyyyyxxxxxyyyyyxxxxxyyyyyxxxxxyyyyyxxxxxyyyyyxxxxxyyyyy1"""
        Then la section "<sectionName>" contient le step 
            """xxxxxyyyyyxxxxxyyyyyxxxxxyyyyyxxxxxyyyyyxxxxxyyyyyxxxxxyyyyyxxxxxyyyyyxxxxxyyyyyxxxxxyyyyyxxxxxyyyyy"""

            Examples:
                |sectionName|
                |Given|
                |When|
                |Then|
    
    @DeleteStep
    Scenario: suppression d'un step dans la section Given
        Given je suis sur l'interface de création d'un scénario
        And les steps suivants ont été ajoutés
            | Given | step1 |
        When je supprime le step "step1" de la section "Given"
        Then le step "step1" n'existe pas la section "Given"

    @EditStep
    Scenario: affichage de l'écran d'édition à la sélection du step
        Given je suis sur l'interface de création d'un scénario
        And les steps suivants ont été ajoutés
            | Given | step1 |
        When j'active le mode d'édition pour le step "step1" de la section "Given"
        Then le mode d'édition d'un step s'affiche
        And le champs de modification du step contient "step1"

    @EditStep
    Scenario: modification d'un step avec validation
        Given je suis sur l'interface de création d'un scénario
        And les steps suivants ont été ajoutés
            | Given | step1 |
        And le step "step1" de la section "Given" est en mode édition
        When je modifie le texte du step en "modif step"
        And je valide la modification du step
        Then la section "Given" contient le step
            """
            modif step
            """
            
    @EditStep
    Scenario: modification d'un step avec annulation
        Given je suis sur l'interface de création d'un scénario
        And les steps suivants ont été ajoutés
            | Given | step1 |
        And le step "step1" de la section "Given" est en mode édition
        When j'annule la modification du step
        Then la section "Given" contient le step
            """
            step1
            """

    @EditScenarioName
    Scenario: nommage du scénario
        Given je suis sur l'interface de création d'un scénario
        When je renomme le scénario en "scénario nominal"
        Then le nom du scénario est "scénario nominal"