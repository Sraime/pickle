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

    @GherkinGenerator
    Scenario Outline: l'affichage du scénario en Gherkin ne se fait pas si une contrainte n'est pas respectée
        Given je suis sur l'interface de création d'un scénario
        When j'ajoute les steps suivant à la section "<sectionName>":
            |step1|
        Then le scénario Gherkin n'est pas affiché
        And le message suivant est affiché:
            """
            Toute les contraintes doivent être respectées pour générer le Scénario Gherkin
            """

            Examples:
                | Given |
                | When |
                | Then |

    @GherkinGenerator
    Scenario: le scénario Gherkin est affiché quand les contraintes sont respectées
        Given je suis sur l'interface de création d'un scénario
        When j'ajoute les steps suivant:
            | Given |step1|
            | Given |step11|
            | When |step2|
            | When |step21|
            | Then |step3|
            | Then |step31|
        Then le scénario Gherkin suivant est affiché:
            """
            Given step1
            And step11
            When step2
            And step21
            Then step3
            And step31
            """