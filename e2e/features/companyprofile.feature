Feature: Company Profile
  As a customer, I want to view my company profile so that I can see my organization details.

  Scenario: Customer views company profile
    Given a customer is authenticated
    When the customer navigates to the company profile page
    Then the customer sees the company profile details

  Scenario: Unauthenticated customer tries to access company profile
    Given a customer is not authenticated
    When the customer navigates to the company profile page
    Then the customer is redirected to the login page