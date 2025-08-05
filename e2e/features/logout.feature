
Feature: Logout functionality
#  Scenario: Successful logout
#    Given I am logged in
#    When I click the logout button
#    Then I should be redirected to the login page

#Scenario: Logout and access protected page
#    Given I am logged in
#    When I click the logout button
#    And I try to access a protected page
#    Then I should be redirected to the login page

  Scenario: Customer logs out in one browser tab and session is invalidated in another
    Given a customer is authenticated in two browser tabs
    When the customer logs out from the first tab
    And the customer attempts to access a protected resource in the second tab
    Then the customer is redirected to the login page in the second tab
