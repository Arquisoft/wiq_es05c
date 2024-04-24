Feature: Multiplayer Mode

Scenario: The users are not registered in the site
  Given A not registered users
  When I fill the data in the form and press submit
  Then The users are logged

Scenario: User create a room
  When I press the create room button
  Then I should see a room

Scenario: User join a room
  When I press the join room button
  Then I should see a room

Scenario: The host press the start button
  When I press the start game button
  Then The game should start and the host play and the ranking comes out 

Scenario: The user play the game
  When The game is started
  Then I play the game and the ranking comes out 