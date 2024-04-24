const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/multiplayerMode-form.feature');

let pageHost;
let pageUser;
let browserHost;
let browserUser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browserHost = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 20 });
    pageHost = await browserHost.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })

    await pageHost
      .goto("http://localhost:3000/addUser", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

      browserUser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 20 });
      pageUser = await browserUser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })

    await pageUser
      .goto("http://localhost:3000/addUser", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

  });

  //test para crear el usuario
  test('The users are not registered in the site', ({given,when,then}) => {
    
    let emailHost;
    let usernameHost;
    let passwordHost; 
    let passwordConfirmationHost;    

    given('A not registered users', async () => {      
      emailHost = "userTestBasicGame@email.com"
      usernameHost = "userTestBasicGame"
      passwordHost = "Contraseña_1?"
      passwordConfirmationHost = "Contraseña_1?"
    });

    when('I fill the data in the form and press submit', async () => {      
      
      await expect(pageHost).toFill('input[name="email"]', emailHost);
      await expect(pageHost).toFill('input[name="username"]', usernameHost);
      await expect(pageHost).toFill('input[name="password"]', passwordHost);
      await expect(pageHost).toFill('input[name="passwordConfirm"]', passwordConfirmationHost);
      
      await expect(pageHost).toClick('#addRegister');
      
      await pageHost.goto("http://localhost:3000/login", {
      waitUntil: "networkidle0",
      });

      //nos logeamos con ese usuario
      await expect(pageHost).toFill('input[name="username"]', usernameHost);
      await expect(pageHost).toFill('input[name="password"]', passwordHost);
      
      await expect(pageHost).toClick('#login');
    });

    then('The users are logged', async () => {
      await expect(pageHost).toMatchElement("#iconoUsuario");
    });
  })


});