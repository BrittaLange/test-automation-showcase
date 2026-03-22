export {}

export interface TableEntry {
  id: number
  name: string
  location: string
  link: HTMLAnchorElement
}

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Deletes the entry with the highest delete ID.
       * @example
       * cy.findLatestEntryAndDeleteIt()
       * @returns A Chainable resolving to the deleted entry's ID, or `null` if none found.
       */
      findLatestEntryAndDeleteIt(): Chainable<number | null>
      /**
       * Finds the entry with the highest ID and verifies its name and location.
       * @param expectedName The expected name in the latest entry.
       * @param expectedLocation The expected location in the latest entry.
       * @example
       * cy.findLatestEntryAndCheckContent('John', 'Denver')
       * @returns A Chainable resolving to the clickable element if found, or `null` otherwise.
       */
      findLatestEntryAndCheckContent(expectedName: string, expectedLocation: string): Chainable<HTMLAnchorElement | null>
    }
  }
}

Cypress.Commands.add('findLatestEntryAndDeleteIt', () => {
  return cy.get('table tr')
    .then(($rows) => {
      // Convert rows into an array of { id, href }
      const entries = Cypress._.chain($rows)
        .map((row) => {
          const href = row
            .querySelector('td:nth-child(3) a.btn-danger')
            ?.getAttribute('href') // ? provides optional chaining, getAttribute is only called if element exists.
          if (!href) return null
          const match = href.match(/delete=(\d+)/)
          if (!match) return null
          return {
            id: Number(match[1]),
            href,
          }
        })
        .compact() // remove nulls
        .value()
      if (entries.length === 0) {
        return null
      }
      // Find max ID entry
      const latest = Cypress._.maxBy(entries, 'id')
      return latest ?? null
    })
    .then((latest) => {
      if (!latest) {
        cy.log('No deletable entries found.')
        return null
      }
      return cy.get(`a[href="${latest.href}"]`)
        .click()
        .then(() => latest.id)
    })
})

Cypress.Commands.add('findLatestEntryAndCheckContent', (expectedName: string, expectedLocation: string) => {
    // Find all entries in the table and save them in entries array
    cy.get('table tr').then(($rows) => {
      const entries: TableEntry[] = Cypress._.chain($rows)
        .map((row) => {
          const cells = row.querySelectorAll('td')
          if (cells.length < 3) return null
          const name = cells[0].innerText.trim()
          const location = cells[1].innerText.trim()
          const href = cells[2]
            .querySelector('a.btn-danger')
            ?.getAttribute('href')
          const link = cells[2].querySelector<HTMLAnchorElement>('a.btn-danger')
          if (!href) return null
          const match = href.match(/delete=(\d+)/)
          if (!match) return null
          return { id: Number(match[1]), name, location, link } as TableEntry
        })
        .compact()
        .value()
      // Get the latest entry (or null if none exist)
      const latest = entries.length ? Cypress._.maxBy(entries, 'id') ?? null : null
      if (latest) {
        cy.log('Found latest id: ')
        cy.log(latest['id'].toString())
        // Only assert if entry exists
        expect(latest.name).to.equal(expectedName)
        expect(latest.location).to.equal(expectedLocation)
        // Wrap in Cypress chainable
        return cy.wrap(latest.link)
      } else {
        cy.log('No latest id found')
      }
      return null
    })
  }
)