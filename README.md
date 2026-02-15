# Test Automation Showcase

## Overview
This repository is a **learning-focused demo project** showcasing professional
end-to-end (E2E) test automation for a PHP-based web application.

The project demonstrates how different E2E testing tools can be structured,
maintained, and integrated into a CI pipeline, while following best practices
commonly used in real-world software projects.

It is designed both as:
- a **technical showcase** of my testing and automation skills, and
- a **learning environment** to compare tools, approaches, and trade-offs.

---

## Why this project?

End-to-end testing is a critical part of modern software quality assurance,
yet different tools come with very different strengths, limitations, and
maintenance costs.

With this project, I wanted to:

- Demonstrate how I **structure and document** an automation project
- Show how I **evaluate and compare technologies**, not just use them
- Apply **real-world testing strategies**, not toy examples
- Practice **clean code, maintainability, and CI integration**
- Make architectural and tooling decisions explicit and explainable

This repository reflects **how I would approach E2E testing in a professional
environment**, while remaining transparent about learning outcomes and trade-offs.

---

## Goals

- Build maintainable end-to-end test suites
- Compare multiple E2E testing tools in the same domain
- Practice user-centric test scenarios
- Integrate automated tests into CI
- Document decisions, challenges, and lessons learned

---

## Roadmap

- [ ] Specify test cases
- [ ] Add Playwright test implementation
- [ ] Add Selenium test implementation
- [ ] Add Cycpress test implementation
- [ ] Add CI pipeline

---

## Technologies

- **Playwright** – modern web E2E testing
- **Selenium WebDriver** – established web automation standard
- **Cypress** – fast web testing with developer-friendly experience
- **PHP** – application under test
- **GitHub Actions** – continuous integration

---

## Requirements

The application had no formal written requirements,
so test cases were derived from implicit requirements and expected user behavior,
based on common usability standards and domain knowledge.

---

## Test Design

Test cases are organized by scenario (CRUD, security)
to improve readability and maintainability.
Test cases were initially generated with the help of AI based 
on a test structure and scenarios designed by me, and were 
then reviewed, refined, and organized to reflect QA practices 
and testing strategies.

### TestCaseStatus 

The TestCaseStatus reflects the lifecycle of a test case,
independent from its execution result.
It can have the following values:

- Draft: Test case is newly created and not finalized
- In Review: Test case is under review
- Approved: Test case is reviewed and ready for execution
- Deprecated: Test case is obsolete and no longer used

### AutomationStatus

The AutomationStatus indicates if a test case is covered by automated tests:

- Not Automated: Manual test only
- Planned: Automation planned but not implemented yet
- Automated: Covered by automated tests

---

## AI-assisted workflow

AI was used to accelerate the initial creation of test cases.
All outputs were manually reviewed, adapted, and validated to
ensure correctness, relevance, and maintainability.

---

## Installation

### Install Playwright

Playwright supports four programming languages: JavaScript, TypeScript, Python, Java.
Although TypeScript was not my primary language before this project, 
it was intentionally selected to work with a type-safe, 
production-oriented test stack and to gain hands-on experience 
with tooling commonly used in modern automation projects.

Playwright comes with its own gitignore file. I appreciate!

Install Playwright via npm:
    npm init playwright@latest

---

### Install Cypress

Cypress is a modern end-to-end testing framework for web applications. 
Tests are written in JavaScript or TypeScript and run directly in the browser, 
allowing fast, reliable testing of user interactions, UI behavior, and API requests. 
I chose to write the tests in TypeScript as well.

Install Cypress via npm:
    npm install cypress --save-dev

---

### Install Selenium

Seleniums main project supports five programming languages: C#/.NET, Ruby, JavaScript, Python and Java.
I chose Java because it offers one of the most robust and widely adopted integrations with Selenium, making it a strong choice for enterprise-grade automation. Its seamless compatibility with Maven, TestNG, and CI/CD pipelines enables the development of scalable, maintainable, and production-ready test frameworks.

Install Selenium via Maven:
mvn archetype:generate
with following parameters: 
- DgroupId=com.britta.selenium 
- DartifactId=selenium-demo 
- DarchetypeArtifactId=maven-archetype-quickstart 

---

## Documentation

### Selenium

https://www.selenium.dev/selenium/docs/api/java/index.html

Run test: right-click on test case file and run

### Playright

https://playwright.dev/docs/intro

Run test: npx playwright test --headed

Run test in UI mode: npx playwright test --ui

### Cypress

https://docs.cypress.io/api/table-of-contents

Run cypress: npx cypress open

I really like the real world app cypress comes with to show 
best practices and scalable strategies with Cypress: 
https://github.com/cypress-io/cypress-realworld-app

---

## License

This project is licensed under the MIT License.

It is intended for educational and learning purposes, such as exploring
and comparing different end-to-end testing tools and approaches.

The code is provided "as is", without warranty of any kind.
