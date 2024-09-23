/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      cy.get('[data-test="new-item-input"]').type('First Item');
      cy.get('[data-test="add-item"]').should('be.enabled');
      cy.get('[data-test="add-item"]').click();
      cy.get('li').contains('First Item');
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('First Item');
      cy.get('form').submit();
      cy.get('[data-test="items-unpacked"]').contains('First Item');
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('First Item');
      cy.get('form').submit();

      cy.get('[data-test="items-unpacked"] li').last().contains('First Item');
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth Brush');
      cy.get('[data-test="items-unpacked"] li').should('have.length', 1);
      cy.get('[data-test="items-unpacked"] li').first().contains('Tooth Brush');
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth Brush');
      cy.get('[data-test="items-unpacked"] li').should('not.contain', 'apple');
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click();
        cy.get('[data-test="items-unpacked"] [data-test="items-empty-state"]').should('exist');
        cy.get('[data-test="items-packed"] [data-test="items-empty-state"]').should('exist');
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="remove"]').should('exist');
      });

      it('should remove an item from the page', () => {
        cy.get('[data-test="items-unpacked"] li').each(($items) => {
          cy.wrap($items).find('[data-test="remove"]').click();
          cy.wrap($items).should('not.exist');
        });
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-packed"] li').should('not.exist');
    });

    it('should empty have all of the items in the "Unpacked" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-packed"] [data-test="items-empty-state"]').should('exist');
    });
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {
      cy.get('[data-test="items-unpacked"] li').each(($items) => {
        cy.wrap($items).find('input').click();
        cy.wrap($items).should('not.exist');
      });
    });
  });
});
