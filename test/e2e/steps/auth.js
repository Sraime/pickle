const I = actor();
const AppContext = require('./var');

Given('l\'utilisateur {string} avec l\'email {string} et le mdp {string} est enregistré', async (pseudo, email, mdp) => {
    await I.sendPostRequest(AppContext.back_url+'/auth/signup', {pseudo: pseudo, email: email, password: mdp});
});

Given('je suis déconnecté', () => {
    I.dontSeeElement('#pseudo-user-connected');
});

Given('je suis connecté avec l\'email {string} avec le mdp {string}', async(email, mdp) => {
    I.amOnPage(AppContext.front_url+'/auth/login');
    I.fillField('email', email);
    I.fillField('password', mdp);
    I.click('connexion', "#login-form");
});

When('je suis sur l\'écran de connexion', () => {
    I.amOnPage(AppContext.front_url+'/auth/login');
});

When('je saisis l\'email {string}', (email) => {
    I.fillField('email', email);
});

When('je saisis le mdp {string}', (mdp) => {
    I.fillField('password', mdp);
});

When('je valide la connexion', () => {
    I.click('connexion', "#login-form");
});

When('je valide la création du compte', () => {
    I.click('Valider', "#register-form");
});

Then('je suis connecté en tant que {string}', (pseudo) => {
    I.seeTextEquals(pseudo, '#pseudo-user-connected');
});

Then('le message d\'erreur {string} s\'affiche dans le cadre de connexion', (msg) => {
    I.see(msg, {css: '.card-login'});
});




