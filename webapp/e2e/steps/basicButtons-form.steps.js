const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/basicButtons-form.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch({headless: 'new'})
      : await puppeteer.launch({ headless: false, slowMo: 20, defaultViewport: { width: 1200, height: 800 }});
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
      email = "userTestButtons@email.com"
      username = "userTestButtons"
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

  test('User checks game play history', ({when,then}) => {

    when('I navigate to user section and press the history', async () => {     
      //vamos a las opciones del usuario 
      await expect(page).toClick("#iconoUsuario");
      
      await expect(page).toClick('#historyButton');
    });

    then('I should see a list of past games played', async () => {
      await expect(page).toMatchElement("#main-history");
    });
  })
  
  test('User checks ranking history', ({when,then}) => {

    when('I navigate to the user section and press the ranking section', async () => {      
      //vamos a las opciones del usuario 
      await expect(page).toClick("#iconoUsuario");
      
      await expect(page).toClick('#rankingButton');
    });

    then('I should see a list of users ranked by their scores', async () => {
      await expect(page).toMatchElement("#rankingDiv");
    });
  })

  test('User switches to dark mode', ({when,then}) => {

    when('I toggle the dark mode switch', async () => {      
      await expect(page).toClick("#dark-mode-switch");
    });

    then('The interface should switch to dark mode', async () => {
      await page.waitForSelector('#navbar');

      // obtenemos el estilo 
      const backgroundColor = await page.$eval('#navbar', el => getComputedStyle(el).backgroundColor);

      // Verifica que el color de fondo coincida con el oscuro
      expect(backgroundColor).toBe('rgb(0, 28, 23)');
    });
  })

  test('User switches to light mode', ({when,then}) => {

    when('I toggle the light mode switch', async () => {      
      //para cambiar a modo oscuro 
      await expect(page).toClick("#dark-mode-switch");
      //volvemos a cambiar a modo claro
      await expect(page).toClick("#dark-mode-switch");
    });

    then('The interface should switch to light mode', async () => {
      await page.waitForSelector('#navbar');

      // obtenemos el estilo 
      const backgroundColor = await page.$eval('#navbar', el => getComputedStyle(el).backgroundColor);

      // Verifica que el color de fondo coincide con el claro
      expect(backgroundColor).toBe('rgb(254, 245, 198)');
    });
  })

  test('User switches to english', ({when,then}) => {

    when('I navigate to the settings section and press english from the language dropdown', async () => {      
      //pulsamos en los idiomas y cambiamos al ingles
      await expect(page).toClick("#change-language-button");
      await expect(page).toClick("#english-menu-item");
    });

    then('The interface should switch to english', async () => {
      const idiomaText = await page.$eval('#idioma', el => el.textContent);

      //verificamos que el texto del elemento sea "EN"
      expect(idiomaText.trim()).toBe('EN');
    });
  })

  test('User switches to spanish', ({when,then}) => {

    when('I navigate to the settings section and press spanish from the language dropdown', async () => {      
      //pulsamos en los idiomas y cambiamos al ingles para poder comprobar que se cambia otra vez a español
      await expect(page).toClick("#change-language-button");
      await expect(page).toClick("#english-menu-item");

      //pulsamos en los idiomas y cambiamos al español
      await expect(page).toClick("#change-language-button");
      await expect(page).toClick("#spanish-menu-item");
    });

    then('The interface should switch to spanish', async () => {
      const idiomaText = await page.$eval('#idioma', el => el.textContent);

      //verificamos que el texto del elemento sea "EN"
      expect(idiomaText.trim()).toBe('ES');
    });
  })

  test('User logout', ({when,then}) => {

    when('I navigate to the user section and press logout', async () => {   
      await expect(page).toClick("#iconoUsuario");
      
      await expect(page).toClick('#logoutButton');
    });

    then('The user should logout', async () => {
      //si no esta logeado ve este boton
      await expect(page).toMatchElement("#loginButton");
    });
  })
  
  afterAll(async ()=>{
    browser.close()
  })

});