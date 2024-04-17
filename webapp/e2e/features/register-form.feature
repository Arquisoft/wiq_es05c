Feature: Registering a user

Scenario: The user is not registered in the site
  Given An unregistered user
  When I fill the data in the form and press submit
  Then A confirmation message should be shown in the screen

Scenario: The user is registered in the site with the same email
  Given An registered user with the same email in the database
  When I fill the data in the form with the existing email and press submit
  Then An error message should be shown on the screen indicating that the email already exists

Scenario: The user is registered in the site with the same username
  Given An registered user with the same username in the database
  When I fill the data in the form with the existing username and press submit
  Then An error message should be shown on the screen indicating that the username already exists

Scenario: The user enters a password with incorrect format
  Given An unregistered user
  When I fill the form with a password that does not meet the required format and press submit
  Then An error message should be shown on the screen indicating that the password format is incorrect

Scenario: The user enters mismatched passwords
  Given An unregistered user
  When I fill the form with two passwords that do not match and press submit
  Then An error message should be shown on the screen indicating that the passwords do not match