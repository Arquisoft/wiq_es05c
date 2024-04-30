Feature: Daily Question Mode

Scenario: The user is not registered in the site
  Given An unregistered user
  When I fill the data in the form and press submit
  Then The user is logged

Scenario: User play the daily question
  When I play the daily question
  Then I should see a message with my game results

  Scenario: User wants to play the daily question but he/she/they already played it
  When I try to play the daily question
  Then I should see a message with a message