const I = actor();
const AppContext = require('./var');

Given('je suis sur l\'écran d\'inscription', () => {
    I.amOnPage(AppContext.front_url+'/auth/register');
});

Given('je suis redirigé sur l\'écran d\'inscription', () => {
    I.amOnPage(AppContext.front_url+'/auth/register');
});

Given('je suis sur l\'interface de création d\'un scénario', () => {
    I.amOnPage(AppContext.front_url+'/board');
});

When('je me rend sur la page de création d\'un scénario', () => {
    I.amOnPage(AppContext.front_url+'/board');
});

When('je clique sur le l\'option de connexion du bandeau de navigation', () => {
    I.click("Connexion","#navbar");
});

When('je clique sur la option de déconnexion du bandeau de navigation', () => {
    I.click("Déconnexion","#navbar");
});

When('je clique sur l\'option d\'incription du bandeau de navigation', () => {
    I.click("Inscription","#navbar");
});

When('je me rend sur l\'écran d\'accueil', () => {
    I.amOnPage(AppContext.front_url);
});

Then('je suis redirigé sur l\'écran de connexion', () => {
    I.amOnPage(AppContext.front_url+'/auth/login');
});