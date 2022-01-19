/// <reference types="Cypress" />

describe('sort waivers by alphabetical order', () => {
  before('visit site', () => {
    cy.visit('localhost:4000/waivers')
  })
  beforeEach('create alias', () => {
    cy.get('[data-test="sort-select"] select').children().as('sort-options')
  })
  it('waivers are in alphabetical order after being sorted', () => {
    cy.get('@sort-options').then(sortOptions => {
      sortOptions.each(option => {
        cy.get('[data-test="sort-select"] select').select(
          sortOptions[option].value
        )
        cy.get('[data-test="procurement-title"]').then(elements => {
          const titles = elements.toArray().map(element => element.innerText)
          const alphabeticalTitles = titles
            .slice()
            .sort((a, b) => a.localeCompare(b))
          switch (sortOptions[option].value) {
            case 'alphabetical':
              expect(titles).to.deep.equal(alphabeticalTitles)
              break
            case 'recent':
              expect(titles).to.not.deep.equal(alphabeticalTitles)
              break
          }
        })
      })
    })
  })
})
