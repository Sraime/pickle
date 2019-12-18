@login @auth
Feature: connexion
    En tant que Utlisateur inscrit
    Je veux pouvoir me connecter
    Afin d'accéder à mon espace personnel

    Scenario: La page d'accueil redirige sur l'écran de login
        Given je suis déconnecté
        When je me rend sur l'écran d'accueil
        Then je suis redirigé sur l'écran de connexion

    Scenario: connexion à un compte réussi
        Given l'utilisateur "Toto" avec l'email "toto.titi@gmail.com" et le mdp "Azerty01" est enregistré
        When je suis sur l'écran de connexion
        And je saisis l'email "toto.titi@gmail.com"
        And je saisis le mdp "Azerty01"
        And je valide la connexion
        Then je suis connecté en tant que "Toto"

    Scenario Outline: erreur si l'email ou le mot de passe est incorrect
        Given l'utilisateur "<pseudo>" avec l'email "<email>" et le mdp "<mdp>" est enregistré
        When je suis sur l'écran de connexion
        And je saisis l'email "<inputEmail>"
        And je saisis le mdp "<inputMdp>"
        And je valide la connexion
        Then le message d'erreur "email ou mot de passe invalide" s'affiche dans le cadre de connexion

        Examples:
        | pseudo | email                | mdp       | inputEmail            | inputMdp  |
        | Toto   | toto.titi@gmail.com  | Azerty01  | toto.titi@gmail.com   |           |
        | Toto   | toto.titi@gmail.com  | Azerty01  |                       | Azerty01  |

    Scenario: je peux accéder à l'écran de connexion depuis le bandeau de navigation
        Given je suis sur l'écran d'inscription
        When je clique sur le l'option de connexion du bandeau de navigation
        Then je suis sur l'écran de connexion