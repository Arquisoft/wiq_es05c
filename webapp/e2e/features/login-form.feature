Feature: Login user

Scenario: The user is registered in the site
  Given An registered user
  When I fill the data in the form and press submit
  Then A confirmation message should be shown in the screen

Scenario: The user is not registered in the site
  Given An unregistered user
  When I fill the data in the form and press submit
  Then An error message should be displayed indicating that the credentials are wrong

  Scenario: Password mismatch during login
  Given A registered user with password incorrect
  When I fill the data in the form and press submit
  Then An error message should be displayed indicating that the credentials are wrong

