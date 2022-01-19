/// <reference types="Cypress" />
describe('pagination of waiver page', () => {
  before('visit site', () => {
    cy.visit('localhost:4000/waivers')
  })
  it('next and previous buttons allow movement as expected', () => {
    cy.get('[data-test="next-page"]').click()
    cy.get('[aria-label="Previous page"]').should('be.visible')
    cy.get('[data-test="previous-page"]').click()
    cy.get('[aria-label="Next page"]').should('be.visible')
  })
  it('check first page takes user to beginning', () => {
    cy.get('[data-test="first-page"]').then(firstPage => {
      firstPage.each(() => {
        cy.get('[data-test="first-page"]')
          .click()
          .get('[aria-label="Previous page"]')
          .should('not.be.visible')
      })
    })
  })
  it('check last page takes user to end', () => {
    cy.get('[data-test="last-page"]').then(lastPage => {
      lastPage.each(() => {
        cy.get('[data-test="last-page"]')
          .click()
          .get('[aria-label="Next page"]')
          .should('not.be.visible')
      })
    })
  })
  it('usa current matches first page', () => {
    cy.get('[data-test="first-page"]')
      .click()
      .should('have.class', 'usa-current')
  })
  it('usa current matches last page', () => {
    cy.get('[data-test="last-page"]')
      .click()
      .should('have.class', 'usa-current')
  })
})
