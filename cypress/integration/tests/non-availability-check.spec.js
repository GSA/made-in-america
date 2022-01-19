/// <reference types="Cypress" />
describe('non-availability check', () => {
  it('non-availability should not be present on site', () => {
    cy.getUrlsArray().then($urls => {
      $urls.forEach(url => {
        if (url !== 'http://localhost:4000/waivers/') {
          // skipping the wiavers page because that is the only page that is dynamic within the site... test coverge for that wiavers page for this can be found in the 'results-display.spec.js' file within the wiaver-app file
          cy.visit(url)
          cy.contains('non-availability').should('not.exist')
          cy.contains('Non-availability').should('not.exist')
        }
      })
    })
  })
})
