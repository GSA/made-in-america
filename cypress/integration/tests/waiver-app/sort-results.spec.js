/// <reference types="Cypress" />
describe('sort waivers by alphabetical order', () => {
  before('visit site', () => {
    cy.visit('localhost:4000/waivers')
  })
  beforeEach('create alias', () => {
    cy.get('[data-test="sort-select"] select').children().as('sort-options')
    cy.get('[data-test="procurement-title"]')
      .then(elements => {
        const titles = elements.map(elementIndex => {
          return elements[elementIndex].innerText
        })
        return titles
      })
      .as('titles')
  })
  it('waivers are in alphabetical order after being sorted', () => {
    cy.get('@sort-options').then(sortOptions => {
      sortOptions.each(option => {
        // if (sortOptions[option].value !== 'recent') {
        cy.get('[data-test="sort-select"] select').select(
          sortOptions[option].value
        )

        // cy.get('@titles').then(titles => {
        //   console.log('og titles', titles)

        cy.get('[data-test="procurement-title"]').each(elements => {
          const t = elements.map(elementIndex => {
            return elements[elementIndex].innerText
          })
          // console.log('t', t.sort())
          expect(t).to.eq(t.sort())

          // console.log("t",t)

          // console.log("t sort", t.sort())

          // return t
        })

        // console.log('titles', sortedTitles)
        // console.log('sorted', titles.sort())
        // console.log('titles.2', titlesArray)

        // })
        // }
      })
    })
  })
})

// alphabetical

//   const filetypes = ['Access', 'Excel', 'Text/CSV','PDF','JSON','dsdsd'];
//   cy.get('.data-sourcename').should(($els) => {
// // map jquery elements to array of their innerText
// const elsText = $els.toArray().map(el => el.innerText)
// expect(elsText).to.deep.eq(filetypes)

// })
