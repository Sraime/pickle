@FeatureBoard
Feature: board de création des scenario d'une Feature
    En tant que Concepteur des scenarios de tests
    Je veux construire un les scenarios de ma Feature en Gherkin
    Afin de structurer et standardiser leur écriture

    @US30
    Scenario: accès au board de création d'une feature
        Given le navigateur web est ouvert
        When je me rend sur l'interface de création d'une feature
        Then la feature contient 1 scénarios