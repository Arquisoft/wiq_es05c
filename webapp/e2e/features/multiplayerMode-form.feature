Feature: Multiplayer Mode

Scenario: The users are not registered in the site
  Given A not registered users
  When I fill the data in the form and press submit
  Then The users are logged

Scenario: Host create a room
  When I press the create room button
  Then I should see a room

Scenario: User join a room
  When I press the join room button
  Then I should see a room

Scenario: The host press the start button
  When I press the start game button and the game should start and the host and the user play
  Then The ranking comes out