Feature: Logout functionality
  As a customer, I want to log out of my account so that my session is securely ended and my data is protected.

  Scenario: Customer successfully logs out
    Given a customer is authenticated
    When the customer logs out
    Then the customer is redirected to the login page

  Scenario: Customer logs out and tries to access a protected page
    Given a customer is authenticated
    When the customer logs out
    And the customer tries to access a protected page
    Then the customer is redirected to the login page

#  Scenario: Customer logs out in one browser tab and session is invalidated in another
#    Given a customer is authenticated in two browser tabs
#    When the customer logs out from the first tab
#    And the customer attempts to access a protected resource in the second tab
#    Then the customer is redirected to the login page in the second tab
