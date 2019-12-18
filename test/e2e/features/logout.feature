@logout @auth
Feature: déconnexion
    En tant que Utlisateur connecté
    Je veux pouvoir me déconnecter de mon compte
    Afin d'éviter que quelqu'un puisse utiliser ma session après mon passage

    @navigation
    Scenario: déconnexion depuis le bandeau de navigation
        Given l'utilisateur "Test" avec l'email "test.test@test.fr" et le mdp "AZERTY01" est enregistré
        And je suis connecté avec l'email "test.test@test.fr" avec le mdp "AZERTY01"
        When je clique sur la option de déconnexion du bandeau de navigation
        Then je suis déconnecté
        And je suis sur l'écran de connexion