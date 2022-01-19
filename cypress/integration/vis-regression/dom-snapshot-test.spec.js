/// <reference types="Cypress" />
let urls = []

before(() => {
  cy.request({
    url: 'http://localhost:4000/sitemap.xml',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
    },
  })
    .as('sitemap')
    .then(response => {
      urls = Cypress.$(response.body)
        .find('loc')
        .toArray()
        .map(el => el.innerText)
    })
})

describe('heaotneoiha', () => {
  it('toMatchSnapshot', () => {
    urls.forEach(url => {
      // console.log(url)
      cy.visit(url).then(() => {
        cy.get('main').toMatchSnapshot({
          ignoreExtraFields: true,
          replace: { key: url },
        })
      })
    })
  })
})
