Feature: Basic Buttons

Scenario: The user is not registered in the site
  Given An registered user
  When I fill the data in the form and press submit
  Then The user is logged

Scenario: User checks game play history
  Given A logged user
  When I navigate to user section and press the history
  Then I should see a list of past games played

Scenario: The user is not registered in the site
  Given A logged user
  When I navigate to the user section and press the ranking section
  Then I should see a list of users ranked by their scores

Scenario: User switches to dark mode
  Given A logged user
  When I toggle the dark mode switch
  Then The interface should switch to dark mode

Scenario: User switches to light mode
  Given A logged user
  When I toggle the light mode switch
  Then The interface should switch to light mode

Scenario: User switches to english
  Given A logged user
  When I navigate to the settings section and press english from the language dropdown
  Then The interface should switch to english

Scenario: User switches to spanish
  Given A logged user
  When I navigate to the settings section and press spanish from the language dropdown
  Then The interface should switch to spanish

Scenario: User logout
  Given A logged user
  When I navigate to the user section and press logout
  Then The user should logout