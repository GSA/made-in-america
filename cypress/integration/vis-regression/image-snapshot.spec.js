/// <reference types="Cypress" />
const url = 'localhost:4000'

describe('image snapshot', () => {
  // take a screen shot of the home page and compare it to what is documented
  it('homepage should render on desktop', () => {
    cy.viewport(1080, 1200)
    cy.visit(url).then(() => {
      cy.document().toMatchImageSnapshot({ name: 'homepage-desktop' })
    })
  })

  it('homepage should render on mobile', () => {
    cy.viewport(320, 875)
    cy.visit(url).then(() => {
      cy.document().toMatchImageSnapshot({ name: 'homepage-mobile' })
    })
  })
})
