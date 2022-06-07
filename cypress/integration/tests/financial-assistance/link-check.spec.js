/// <reference types="Cypress" />

describe('check links on financial assistance page', () => {
  before('let site load', () => {
    cy.visit('localhost:4000/financial-assistance/')
  })
  it('check that link open in new tab and go to right address', () => {
    cy.get('[data-test="fa-list"]')
      .find('a')
      .then(links => cy.get(links))
      .should('have.attr', 'target')
      .and('match', /.?[_blank]/)
  })
})
