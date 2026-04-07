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
       * Returns the latest entry found by comparing the ids.
       * @example
       * cy.getLatestEntry()
       * @returns A Chainable resolving to the table entry with the highest id.
       */
      getLatestEntry(): Chainable<TableEntry>

      /**
       * Deletes the entry with the highest delete ID.
       * @example
       * cy.findLatestEntryAndDeleteIt()
       * @returns A Chainable resolving to the deleted entry's ID.
       */
      findLatestEntryAndDeleteIt(): Chainable<number>

      /**
       * Finds the entry with the highest ID and verifies its name and location.
       * @param expectedName The expected name in the latest entry.
       * @param expectedLocation The expected location in the latest entry.
       * @example
       * cy.findLatestEntryAndCheckContent('John', 'Denver')
       * @returns A Chainable resolving to the clickable delete button if found.
       */
      findLatestEntryAndCheckContent(expectedName: string, expectedLocation: string): Chainable<JQuery<HTMLAnchorElement>>
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

    const latest = Cypress._.maxBy(entries, 'id')

    if (!latest) {
      throw new Error('No valid table entries found')
    }

    return latest
  })
})

Cypress.Commands.add('findLatestEntryAndDeleteIt', () => {
  return cy.getLatestEntry().then((latest) => {
    if (!latest) {
      throw new Error('No latest entry found')
    }

    return cy.get(`a[href="${latest.href}"]`)
      .click()
      .then(() => latest.id)
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