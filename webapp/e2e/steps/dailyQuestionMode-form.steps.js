const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/dailyQuestionMode-form.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    console.log('Starting Puppeteer dailyMode... githubactyions.env', process.env.GITHUB_ACTIONS);

    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 20 });
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })

    await page
      .goto("http://localhost:3000/addUser", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

  });

  afterEach(async () => {    
    await page.waitForTimeout(1000);

    await page.goto("http://localhost:3000/home", {
      waitUntil: "networkidle0",
    });
  });

  //test para crear el usuario
  test('The user is not registered in the site', ({given,when,then}) => {
    
    let email;
    let username;
    let password; 
    let passwordConfirmation;    

    given('An unregistered user', async () => {      
      email = "userTestDailyQuestionGame@email.com"
      username = "userTestDailyQuestionGame"
      password = "Contraseña_1?"
      passwordConfirmation = "Contraseña_1?"
    });

    when('I fill the data in the form and press submit', async () => {      
      
      await expect(page).toFill('input[name="email"]', email);
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="passwordConfirm"]', passwordConfirmation);
      
      await expect(page).toClick('#addRegister');
      
      await page.goto("http://localhost:3000/login", {
      waitUntil: "networkidle0",
      });

      //nos logeamos con ese usuario
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      
      await expect(page).toClick('#login');
    });

    then('The user is logged', async () => {
      await expect(page).toMatchElement("#iconoUsuario");
    });
  })

  test('User play the daily question', ({when,then}) => {

    when('I play the daily question', async () => {     
        //vamos a las opciones del usuario 
        await expect(page).toClick("#button-diario-game");

        //empieza el juego y respoonde la pregunta
        await expect(page).toClick("#buttonAnswer0");        
    });

    then('I should see a message with my game results', async () => {      
        //comprobamos que se ha acabado el juego
        await expect(page).toMatchElement(".finDelJuego");
    });
  })
  
  test('User wants to play the daily question but he/she/they already played it', ({when,then}) => {

    when('I try to play the daily question', async () => {     
        //vamos a las opciones del usuario 
        await expect(page).toClick("#button-diario-game");

         //pendiente de implementar
    });

    then('I should see a message with a message', async () => {      
        //pendiente de implementar
    });
  })

});