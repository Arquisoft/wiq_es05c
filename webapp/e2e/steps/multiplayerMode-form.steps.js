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
    console.log('Starting Puppeteer... githubactyions.env', process.env.GITHUB_ACTIONS);

    browserHost = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 20 });
    pageHost = await browserHost.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 40000 })

    browserUser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 20 });
      pageUser = await browserUser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 40000 })

    await pageHost
      .goto("http://localhost:3000/addUser", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

    await pageUser
      .goto("http://localhost:3000/addUser", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});

  });

  afterAll(async () => {
    await browserHost.close();
    await browserUser.close();
  });

  //test para crear el usuario
  test('The users are not registered in the site', ({given,when,then}) => {
    
    let emailHost;
    let usernameHost;
    let passwordHost; 
    let passwordConfirmationHost;  
    
    let emailUser;
    let usernameUser;
    let passwordUser; 
    let passwordConfirmationUser;

    given('A not registered users', async () => {      
      emailHost = "userTestMultiplayerHost@email.com"
      usernameHost = "userTestMultiplayerHost"
      passwordHost = "Contraseña_1?"
      passwordConfirmationHost = "Contraseña_1?"
      
      emailUser = "userTestMultiplayerUser@email.com"
      usernameUser = "userTestMultiplayerUser"
      passwordUser = "Contraseña_1?"
      passwordConfirmationUser = "Contraseña_1?"
    });

    when('I fill the data in the form and press submit', async () => {      
      //se introducen los emails
      await expect(pageHost).toFill('input[name="email"]', emailHost);
      await expect(pageUser).toFill('input[name="email"]', emailUser);

      //se introducen los nombres de usuario
      await expect(pageHost).toFill('input[name="username"]', usernameHost);
      await expect(pageUser).toFill('input[name="username"]', usernameUser);

      //se introducen las contraseñas
      await expect(pageHost).toFill('input[name="password"]', passwordHost);      
      await expect(pageUser).toFill('input[name="password"]', passwordUser);

      //se introducen las confirmaciones de contraseña
      await expect(pageHost).toFill('input[name="passwordConfirm"]', passwordConfirmationHost);
      await expect(pageUser).toFill('input[name="passwordConfirm"]', passwordConfirmationUser);

      //se presiona el botón de submit
      await expect(pageHost).toClick('#addRegister');
      await expect(pageUser).toClick('#addRegister');

      //esperamos a que se cargue la página
      await pageHost.goto("http://localhost:3000/login", {
      waitUntil: "networkidle0",
      });      
      await pageUser.goto("http://localhost:3000/login", {
        waitUntil: "networkidle0",
      });

      //escribimos en el formulario de login
      await expect(pageHost).toFill('input[name="username"]', usernameHost);
      await expect(pageUser).toFill('input[name="username"]', usernameUser);

      await expect(pageHost).toFill('input[name="password"]', passwordHost);
      await expect(pageUser).toFill('input[name="password"]', passwordUser);
      
      await expect(pageHost).toClick('#login');
      await expect(pageUser).toClick('#login');
    });

    then('The users are logged', async () => {
      await expect(pageHost).toMatchElement("#iconoUsuario");
      await expect(pageUser).toMatchElement("#iconoUsuario");
    });
  })

  test('Host create a room', ({when,then}) => {
    when('I press the create room button', async () => {    
      //vamos a crear una sala 
        await expect(pageHost).toClick("#roomCreateButton");
        await expect(pageHost).toClick("#createRoom");        
    });

    then('I should see a room', async () => {      
        //comprobamos que se ha acabado el juego
        await expect(pageHost).toMatchElement("#room");
    });
  })

  test('User join a room', ({when,then}) => {
    when('I press the join room button', async () => { 
        const idSala = await pageHost.evaluate(() => {
          const h1Element = document.getElementById('idSala');
          const fullText = h1Element.textContent.trim();
          const lastFourDigits = fullText.slice(-4); //obtenemos los ultimos 4 digitos
          return lastFourDigits;
        });

        //vamos a entrar a una sala
        await expect(pageUser).toClick("#roomJoinButton");
        await expect(pageUser).toFill('input[id="room-id-input"]', idSala);      
        await expect(pageUser).toClick("#roomJoin-button");  
    });

    then('I should see a room', async () => {      
        //comprobamos que se ha acabado el juego
        await expect(pageUser).toMatchElement("#room");
    });
  })

  test('The host press the start button', ({when,then}) => {
    when('I press the start game button and the game should start and the host and the user play', async () => { 
        //vamos a empezar el juego
        await expect(pageHost).toClick("#startButton");

        await expect(pageHost).toMatchElement("#buttonAnswer0");        
        await expect(pageUser).toMatchElement("#buttonAnswer0");


        //empieza el juego y responde 10 preguntas
        for(let i = 0; i < 10; i++){
          await expect(pageHost).toClick("#buttonAnswer0"); 
          await expect(pageUser).toClick("#buttonAnswer0");
      }
    });

    then('The ranking comes out', async () => {      
      // Esperamos a que aparezca el modal
      await pageHost.waitForSelector('.esperandoJugadoresMultiplayer');
      // Simulamos el clic en el botón de confirmación (cerrar)
      await pageHost.click('.swal2-confirm');

      // Esperamos a que aparezca el modal
      await pageUser.waitForSelector('.esperandoJugadoresMultiplayer');
      // Simulamos el clic en el botón de confirmación (cerrar)
      await pageUser.click('.swal2-confirm');

      //comprobamos que se ha acabado el juego
      await expect(pageHost).toMatchElement("#rankingMultiplayer");
      await expect(pageUser).toMatchElement("#rankingMultiplayer");
    });
  })

});