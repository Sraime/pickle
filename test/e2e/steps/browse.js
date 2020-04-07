const I = actor();
const AppContext = require('./var');
const TIME_LOADING_PAGE = 1;

Given('le navigateur web est ouvert', () => {});
Given('je suis sur l\'écran d\'inscription', () => {
    I.amOnPage(AppContext.front_url+'/auth/register');
});

Given('je suis redirigé sur l\'écran d\'inscription', () => {
    I.amOnPage(AppContext.front_url+'/auth/register');
});

Given('je suis sur l\'interface de création d\'un scénario', () => {
    I.amOnPage(AppContext.front_url+'/board');
    I.wait(TIME_LOADING_PAGE); 
});

Given('je suis sur l\'interface de création d\'une feature', () => {
    I.amOnPage(AppContext.front_url+'/board')
    I.wait(TIME_LOADING_PAGE); 
});

Given('je suis sur l\'écran d\'édition d\'une nouvelle feature', () => {
    I.amOnPage(AppContext.front_url+'/board');
    I.wait(TIME_LOADING_PAGE); 
});

Given('un autre onglet sur l\'écran de d\'édition d\'une feature', () => {
    I.openNewTab();
    I.amOnPage(AppContext.front_url+'/board');
    I.wait(TIME_LOADING_PAGE); 
});

When('je retourne à l\'onglet précédent', () => {
    I.switchToPreviousTab();
});

When('je me rend sur la page de création d\'un scénario', () => {
    I.amOnPage(AppContext.front_url+'/board');
    I.wait(TIME_LOADING_PAGE); 
});

When('je clique sur le l\'option de connexion du bandeau de navigation', () => {
    I.click("Connexion","#navbar");
});

When('je clique sur la option de déconnexion du bandeau de navigation', () => {
    I.click("Déconnexion","#navbar");
    I.wait(1);
});

When('je clique sur l\'option d\'incription du bandeau de navigation', () => {
    I.click("Inscription","#navbar");
});

When('je me rend sur l\'écran d\'accueil', () => {
    I.amOnPage(AppContext.front_url);
});

When('je me rend sur l\'interface de création d\'une feature', () => {
    I.amOnPage(AppContext.front_url+'/board')
    I.wait(TIME_LOADING_PAGE); 
});

When('je me rend sur l\'écran d\'édition d\'une nouvelle feature', () => {
    I.amOnPage(AppContext.front_url+'/board')
    I.wait(TIME_LOADING_PAGE); 
});

Then('je suis redirigé sur l\'écran de connexion', () => {
    I.amOnPage(AppContext.front_url+'/auth/login');
});