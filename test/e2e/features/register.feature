@auth @register
Feature: inscription
    En tant que joueur 
    Je souhaite pouvoir me créer un compte
    Afin de me créer un espace personnel

    Scenario: je peux accèder à l'écran d'inscription depuis le bandeau de navigation
        Given je suis sur l'écran de connexion
        When je clique sur l'option d'incription du bandeau de navigation
        Then je suis redirigé sur l'écran d'inscription

    Scenario: la création du compte est un succè
        Given je suis sur l'écran d'inscription
        When je saisis le champ "pseudo" avec "Tym"
        And je saisis le champ "email" avec "tym.tym@tym.fr"
        And je saisis le champ "password" avec "Azerty01"
        And je valide la création du compte
        Then je suis redirigé sur l'écran de connexion

    Scenario: la validation d'un formulaire vide affiche les erreurs des champs
        Given je suis sur l'écran d'inscription
        When je valide la création du compte
        Then le message "Le Pseudo ne peut être composé que de lettres et des chiffres (3 à 15 caractères)" est affiché
        And le message "Cet email n'est pas valide" est affiché
        And le message "Le mot de passe doit être composé de 8 à 30 caractères" est affiché

    Scenario Outline: le pseudo est invalide
        Given je suis sur l'écran d'inscription
        When je saisis le champ "pseudo" avec "<pseudo>"
        Then le message "Le Pseudo ne peut être composé que de lettres et des chiffres (3 à 15 caractères)" est affiché

        Examples:
        | pseudo            |
        | Ty                |
        | xxxxxxxxxxxxxxxx  |
        | @@@               |

    Scenario Outline: l'email est invalide
        Given je suis sur l'écran d'inscription
        When je saisis le champ "email" avec "<email>"
        Then le message "Cet email n'est pas valide" est affiché

        Examples:
        | email     |
        | xxx       |
        | xx.xx     |
    
    
    Scenario Outline: l'email est invalide
        Given je suis sur l'écran d'inscription
        When je saisis le champ "password" avec "<mdp>"
        Then le message "Le mot de passe doit être composé de 8 à 30 caractères" est affiché

        Examples:
        | mdp                               |
        | xxxxxxx                           |
        | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   |

    Scenario: l'enregistre d'un utilisateur avec un pseudo déjà utilisé provoque une erreur
        Given l'utilisateur "Toto" avec l'email "toto.titi@gmail.com" et le mdp "Azerty01" est enregistré
        And je suis sur l'écran d'inscription
        When je saisis le champ "pseudo" avec "Toto"
        And je saisis le champ "email" avec "tym.tym@tym.fr"
        And je saisis le champ "password" avec "Azerty01"
        And je valide la création du compte
        Then le message "Ce pseudo n'est pas disponible" est affiché

    Scenario: l'enregistre d'un utilisateur avec un email déjà utilisé provoque une erreur
        Given l'utilisateur "Toto" avec l'email "toto.titi@gmail.com" et le mdp "Azerty01" est enregistré
        And je suis sur l'écran d'inscription
        When je saisis le champ "pseudo" avec "Tym"
        And je saisis le champ "email" avec "toto.titi@gmail.com"
        And je saisis le champ "password" avec "Azerty01"
        And je valide la création du compte
        Then le message "Cet email n'est pas disponible" est affiché