const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/register-form.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 100 });
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })

    await page
      .goto("http://localhost:3000/login", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user is not registered in the site', ({given,when,then}) => {
    
    let email;
    let username;
    let password;
    let passwordConfirmation;

    given('An unregistered user', async () => {
      email = "userTest@email.com"
      username = "userTest"
      password = "Contraseña_1?"
      passwordConfirmation = "Contraseña_1?"
      await expect(page).toClick("#register");
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toFill('input[name="email"]', email);
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="passwordConfirm"]', passwordConfirmation);
      
      await expect(page).toClick('#addRegister')
    });

    then('A confirmation message should be shown in the screen', async () => {
        await expect(page).toMatchElement("#addMessage", { text: "Usuario añadido correctamente" });
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});