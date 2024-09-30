/// <reference types="cypress" />

describe('Initial Page', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber');
  });

  it('should have the title of the application in the header', () => {
    cy.get('[data-test="application-title"]').should('contain', 'Echo Chamber');
  });

  it('should have the title of the application in the window', () => {
    cy.title().should('contain', 'Echo Chamber');
  });

  it('should navigate to "/sign-in" when you click the "Sign In" button', () => {
    cy.get('[data-test="sign-in"]').click();
    cy.location('pathname').should('contain', 'sign-in');
  });

  it('should navigate to "/sign-up" when you click the "Sign Up" button', () => {
    cy.get('[data-test="sign-in"]').click();
    cy.location('pathname').should('contain', 'sign-up');
  });
});

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-submit"]').as('submit');
    cy.get('[data-test="sign-up-email"]').as('email');
  });

  it('should require an email', () => {
    cy.get('@submit').click();
    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please fill out this field');

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'valdity')
      .its('valueMissing')
      .should('be.true');
  });

  it('should require that the email actually be an email address', () => {
    cy.get('@email').type('notanemail');

    cy.get('@submit').click();
    cy.get('[data-test="sign-up-email"]:invalid').should('have.length', 1);

    cy.get('@email')
      .invoke('prop', 'validationMessage')
      .should('contain', "Please include an '@' in the email address.");

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validity')
      .its('typeMismatch')
      .should('be.true');
  });

  it('should require a password when the email is present', () => {
    cy.get('@email').type('valid@email.com{enter}');

    cy.get('[data-test="sign-up-password"]:invalid').should('have.length', 1);

    cy.get('[data-test="sign-up-password"]:invalid')
      .invoke('prop', 'validity')
      .its('valueMissing')
      .should('be.true');
  });
});
