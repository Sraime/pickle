@FeatureManagement
Feature: gestion des feature depuis l'espace utilisateur

  Background:
    Given l'utilisateur suivant est enregistré
        | id | pseudo | email | password |
        | 5e9cb1ac31111718631563fd | toto | test.test@test.fr | AZERTY01 |

  Scenario: Affichage des features de l'utilisateur par ordre alphabétique
    Given les features de l'utilisateur avec l'id "5e9cb1ac31111718631563fd"
        | id | name |
        | 1e9cb1ac31111718631563fd | first feature |
        | 2e9cb1ac31111718631563fd | second feature |
    When je me connecte avec le login "test.test@test.fr" et le mdp "AZERTY01"
    Then je suis redirigé sur l'écran de gestion des features
    And la liste des features est la suivante :
        | name |
        | first feature |
        | second feature |

  Scenario: Redirection vers le board de la feature au clique dans la liste
    Given les features de l'utilisateur avec l'id "5e9cb1ac31111718631563fd"
            | id | name |
            | 1e9cb1ac31111718631563fd | first feature |
    And je suis connecté avec l'email "test.test@test.fr" avec le mdp "AZERTY01"
    When je clique sur la ligne contenant "first feature" de la liste des features
    Then je suis redirigé sur le board de la feature avec l'identifiant "1e9cb1ac31111718631563fd"