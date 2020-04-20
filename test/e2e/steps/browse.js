const I = actor();
const AppContext = require('./var');
const TIME_LOADING_PAGE = 2;

Given('le navigateur web est ouvert', () => {});

Given('je suis sur l\'écran d\'inscription', () => {
    I.amOnPage(AppContext.front_url+'/auth/register');
});

Given('je suis sur l\'interface d\'édition de la feature {string}', (featureid) => {
    I.amOnPage(AppContext.front_url+'/board/'+featureid);
    I.wait(TIME_LOADING_PAGE); 
});

Given('un autre onglet sur l\'écran de d\'édition de la feature {string}', (featureid) => {
    I.openNewTab();
    I.amOnPage(AppContext.front_url+'/board/'+featureid);
    I.wait(TIME_LOADING_PAGE); 
});

When('je retourne à l\'onglet précédent', () => {
    I.switchToPreviousTab();
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

When('je me rend sur l\'interface d\'édition de la feature {string}', (featureid) => {
    I.amOnPage(AppContext.front_url+'/board/'+featureid)
    I.wait(TIME_LOADING_PAGE); 
});

Then('je suis redirigé sur l\'écran de connexion', () => {
    I.amOnPage(AppContext.front_url+'/auth/login');
});

Then('je suis redirigé sur l\'écran d\'inscription', () => {
    I.amOnPage(AppContext.front_url+'/auth/register');
});