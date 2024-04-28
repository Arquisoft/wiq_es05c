const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/register-form.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch({headless: 'new'})
      : await puppeteer.launch({ headless: false, slowMo: 20 , defaultViewport: { width: 1200, height: 800 }});
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

  test('The user is not registered in the site', ({given,when,then}) => {
    
    let email;
    let username;
    let password;
    let passwordConfirmation;

    given('An unregistered user', async () => {
      email = "userTestRegister@email.com"
      username = "userTestRegister"
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

  test('The user is registered in the site with the same email', ({given,when,then}) => {
    
    let email;
    let username;
    let password;
    let passwordConfirmation;

    given('An registered user with the same email in the database', async () => {
      email = "userTestRegister@email.com"
      username = "userTestRegister"
      password = "Contraseña_1?"
      passwordConfirmation = "Contraseña_1?"
      await expect(page).toClick("#register");
    });

    when('I fill the data in the form with the existing email and press submit', async () => {
      await expect(page).toFill('input[name="email"]', email);
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="passwordConfirm"]', passwordConfirmation);
      
      await expect(page).toClick('#addRegister')
    });

    then('An error message should be shown on the screen indicating that the email already exists', async () => {
        await expect(page).toMatchElement("#errorMessage", { text: "Error: El email ya existe en la base de datos" });
    });
  })
  
  test('The user is registered in the site with the same username', ({given,when,then}) => {
    
    let email;
    let username;
    let password;
    let passwordConfirmation;

    given('An registered user with the same username in the database', async () => {
      email = "userTest1Register@email.com"
      username = "userTestRegister"
      password = "Contraseña_1?"
      passwordConfirmation = "Contraseña_1?"
      await expect(page).toClick("#register");
    });

    when('I fill the data in the form with the existing username and press submit', async () => {
      await expect(page).toFill('input[name="email"]', email);
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="passwordConfirm"]', passwordConfirmation);
      
      await expect(page).toClick('#addRegister')
    });

    then('An error message should be shown on the screen indicating that the username already exists', async () => {
        await expect(page).toMatchElement("#errorMessage", { text: "Error: El username ya existe en la base de datos" });
    });
  })

  
  test('The user enters a email with incorrect format', ({given,when,then}) => {
    
    let email;
    let username;
    let password;
    let passwordConfirmation;

    given('An unregistered user', async () => {
      email = "userTestemail.com"
      username = "userTest1Register"
      password = "Contraseña_1?"
      passwordConfirmation = "Contraseña_1?"
      await expect(page).toClick("#register");
    });

    when('I fill the form with a email that does not meet the required format and press submit', async () => {
      await expect(page).toFill('input[name="email"]', email);
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="passwordConfirm"]', passwordConfirmation);
      
      await expect(page).toClick('#addRegister')
    });

    then('An error message should be shown on the screen indicating that the email format is incorrect', async () => {
        await expect(page).toMatchElement("#errorMessage", { text: "Error: El email es invalido" });
    });
  })

  test('The user enters a password with incorrect format', ({given,when,then}) => {
    
    let email;
    let username;
    let password;
    let passwordConfirmation;

    given('An unregistered user', async () => {
      email = "userTest1Register@email.com"
      username = "userTest1Register"
      password = "Contraseña_?"
      passwordConfirmation = "Contraseña_?"
      await expect(page).toClick("#register");
    });

    when('I fill the form with a password that does not meet the required format and press submit', async () => {
      await expect(page).toFill('input[name="email"]', email);
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="passwordConfirm"]', passwordConfirmation);
      
      await expect(page).toClick('#addRegister')
    });

    then('An error message should be shown on the screen indicating that the password format is incorrect', async () => {
        await expect(page).toMatchElement("#errorMessage", { text: "Error: La contraseña tiene que tener al menos un número" });
    });
  })

  
  test('The user enters mismatched passwords', ({given,when,then}) => {
    
    let email;
    let username;
    let password;
    let passwordConfirmation;

    given('An unregistered user', async () => {
      email = "userTest1Register@email.com"
      username = "userTest1Register"
      password = "Contraseña_1?"
      passwordConfirmation = "Contraseña_2?"
      await expect(page).toClick("#register");
    });

    when('I fill the form with two passwords that do not match and press submit', async () => {
      await expect(page).toFill('input[name="email"]', email);
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="passwordConfirm"]', passwordConfirmation);
      
      await expect(page).toClick('#addRegister')
    });

    then('An error message should be shown on the screen indicating that the passwords do not match', async () => {
        await expect(page).toMatchElement("#errorMessage", { text: "Error: Las contraseñas no coinciden" });
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});