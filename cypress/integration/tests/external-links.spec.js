/// <reference types="Cypress" />
describe('check external links', () => {
  it('should open in new tab', () => {
    cy.getUrlsArray().then($urls => {
      $urls.forEach(url => {
        cy.visit(url).then(() => {
          cy.get('.usa-link--external')
            .should('have.attr', 'target')
            .and('match', /.?[_blank]/)
        })
      })
    })
  })
})
