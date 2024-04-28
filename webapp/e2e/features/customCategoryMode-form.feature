Feature: Custom Category Mode

Scenario: The user is not registered in the site
  Given An unregistered user
  When I fill the data in the form and press submit
  Then The user is logged

Scenario: User play the custom category game
  When I play the game
  Then I should see a message with my game results
