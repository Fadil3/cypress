/// <reference types="cypress" />

const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread',
];

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder',
];

const ratings = [1, 2, 3, 4, 5, 6];

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
  });

  it('should exist have the title on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items');
  });

  for (const property of properties) {
    it(`should have a column for ${property}`, () => {
      cy.get(`#${property}-column`);
    });

    it('should hide the column when the checkbox is unchecked', () => {
      cy.get(`#show-${property}`).click();
      cy.get(`#${property}-column`).should('be.hidden');
    });
  }
});

describe('Restaurant Filter', () => {
  for (const restaurant of restaurants) {
    it('should pick restaurant', () => {
      cy.get('#restaurant-visibility-filter').select(`${restaurant}`);
      cy.get('#restaurant-visibility-filter').should('have.value', `${restaurant}`);
      cy.get('td[headers="whereToOrder-column"]').should('contain', restaurant);
    });
  }
});

describe('Ratings Filter', () => {
  for (const rating of ratings) {
    it(`should only display items with a popularity above ${rating}`, () => {
      cy.get('#minimum-rating-visibility').invoke('val', rating).trigger('input');
      cy.get('td[headers="popularity-column"]').each(($el) => {
        expect(+$el.text()).to.be.gte(rating);
      });
    });
  }
});
