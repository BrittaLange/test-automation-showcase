export {}

export interface TableEntry {
  id: number
  name: string
  location: string
  link: HTMLAnchorElement
  href: string
}

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Returns the latest entry found by comparing the ids or undefined if there is none.
       * @example
       * cy.getLatestEntry()
       * @returns A Chainable resolving to the table entry with the highest id or undefined.
       */
      getLatestEntry(): Chainable<TableEntry | undefined>

      /**
       * Deletes the entry with the highest delete ID.
       * @example
       * cy.findLatestEntryAndDeleteIt()
       */
      findLatestEntryAndDeleteIt(): void  

      /**
       * Finds the entry with the highest ID and verifies its name and location.
       * @param expectedName The expected name in the latest entry.
       * @param expectedLocation The expected location in the latest entry.
       * @example
       * cy.findLatestEntryAndCheckContent('John', 'Denver')
       * @returns A Chainable resolving to the clickable delete button if found.
       */
      findLatestEntryAndCheckContent(expectedName: string, expectedLocation: string): Chainable<JQuery<HTMLAnchorElement>>

      /**
       * Deletes all entries in the table (from newest to oldest).
       * @example
       * cy.deleteAllEntries()
       * @returns A Chainable resolving to an array of deleted entry IDs.
       */
      deleteAllEntries(): Chainable<void>
    }
  }
}

Cypress.Commands.add('getLatestEntry', () => {
  return cy.get('table tr').then(($rows) => {
    const entries: TableEntry[] = Cypress._.chain($rows)
      .map((row) => {
        const cells = row.querySelectorAll('td')
        if (cells.length < 3) return undefined
        const name = cells[0].innerText.trim()
        const location = cells[1].innerText.trim()
        const link = cells[2].querySelector<HTMLAnchorElement>('a.btn-danger')
        const href = link?.getAttribute('href')
        if (!link || !href) return undefined
        const match = href.match(/delete=(\d+)/)
        if (!match) return undefined
        return {
          id: Number(match[1]),
          name,
          location,
          link,
          href,
        } satisfies TableEntry
      })
      .filter((e): e is TableEntry => Boolean(e)) // type-safe filter
      .value()
    return Cypress._.maxBy(entries, 'id')
  }) as Cypress.Chainable<TableEntry | undefined>
})

Cypress.Commands.add('findLatestEntryAndDeleteIt', () => {
  cy.getLatestEntry().then((latest) => {
    if (latest != undefined) {
      cy.get(`a[href="${latest.href}"]`)
      .click()
    }
  })
})

Cypress.Commands.add(
  'findLatestEntryAndCheckContent', (expectedName: string, expectedLocation: string) => {
    return cy.getLatestEntry().then((latest) => {
      if (!latest) {
        throw new Error('No latest entry found')
      }
      expect(latest.name).to.equal(expectedName)
      expect(latest.location).to.equal(expectedLocation)

      return latest.link
      })
  }
)

Cypress.Commands.add('deleteAllEntries', () => {
  const deleteUntilEmpty = () => {
    cy.getLatestEntry().then((latest) => {
      if (!latest) {
        return
      }
      if (latest.href != undefined) {
         cy.get(`a[href="${latest.href}"]`)
          .click()
          .then(() => {
            deleteUntilEmpty() 
        })
      }
    })
  }
  deleteUntilEmpty()
})