Feature: Login functionality
  As a customer, I want to securely access my account so that I can use the portal features.

  Scenario: Customer logs in with valid credentials
    Given a customer is on the login page
    When the customer submits valid credentials
    Then the customer sees the Shell page

  Scenario: Customer sees validation errors for incorrect credentials
    Given a customer is on the login page
    When the customer submits the login form with no credentials
    Then the customer sees an error for missing email
    When the customer submits an invalid email
    Then the customer sees an error for user not found
    When the customer submits a valid email and wrong password
    Then the customer sees an error for incorrect password

  Scenario: Customer submits valid email and empty password
    Given a customer is on the login page
    When the customer enters a valid email and leaves the password empty
    And the customer submits the login form
    Then the customer sees an error for missing password

  Scenario: Customer submits valid email and incorrect password
    Given a customer is on the login page
    When the customer enters a valid email and an incorrect password
    And the customer submits the login form
    Then the customer sees an error for incorrect password

  Scenario: Customer submits invalid email format
    Given a customer is on the login page
    When the customer enters an invalid email format and a valid password
    And the customer submits the login form
    Then the customer sees an error for invalid email format