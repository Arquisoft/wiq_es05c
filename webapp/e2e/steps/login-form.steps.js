const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/login-form.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch({headless: 'new'})
      : await puppeteer.launch({ headless: false, slowMo: 50 , defaultViewport: { width: 1200, height: 800 }});
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 30000 })

    await page
      .goto("http://localhost:3000/login", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

  });

  afterEach(async () => {    
    await page.waitForTimeout(1000);

    await page.goto("http://localhost:3000/login", {
      waitUntil: "networkidle0",
    });
  });

  test('The user is registered in the site', ({given,when,then}) => {
    
    let email;
    let username;
    let password; 
    let passwordConfirmation;    

    given('An registered user', async () => {      
      email = "userTestLogin@email.com"
      username = "userTestLogin"
      password = "Contraseña_1?"
      passwordConfirmation = "Contraseña_1?"
    });

    when('I fill the data in the form and press submit', async () => {      
      //creamos un usuario para poder hacer login
      await expect(page).toClick("#register");
      
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

    then('A confirmation message should be shown in the screen', async () => {
      await expect(page).toMatchElement("#iconoUsuario");

      //cerramos la sesion    
      await expect(page).toClick("#iconoUsuario");
      await expect(page).toClick("#logoutButton");
    });
  })

  test('The user is not registered in the site', ({given,when,then}) => {
    
    let username;
    let password;

    given('An unregistered user', async () => {
      username = "user1TestLogin"
      password = "Contraseña_1?"
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      
      await expect(page).toClick('#login')
    });

    then('An error message should be displayed indicating that the credentials are wrong', async () => {
        await expect(page).toMatchElement("#errorMessage", { text: "Error: Credenciales erroneas" });
    });
  })
  
  test('Password mismatch during login', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user with password incorrect', async () => {
      username = "userTestLogin"
      password = "Contraseña_1"
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      
      await expect(page).toClick('#login')
    });

    then('An error message should be displayed indicating that the credentials are wrong', async () => {
        await expect(page).toMatchElement("#errorMessage", { text: "Error: Credenciales erroneas" });
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});