Feature: Game Basic Mode

Scenario: The user is not registered in the site
  Given An registered user
  When I fill the data in the form and press submit
  Then The user is logged

Scenario: User play a game
  When I play a game in basic mode
  Then I should see a message with my game results