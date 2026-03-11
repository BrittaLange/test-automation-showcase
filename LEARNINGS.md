# Learnings

This document summarizes key technical learnings, decisions, and insights gained while building this test automation showcase.

---

## 1. Test Case Design

- Designed structured test cases for CRUD functionality and security scenarios.
- Used a consistent CSV-based format to separate **test specification** from **test implementation**.
- Introduced lifecycle states for test cases:

  Draft → In Review → Approved → Deprecated

This reflects a simplified **test management workflow**.

---

## 2. Test Automation Architecture

The project separates three layers:

1. **Test Cases**  
   Human-readable test specifications stored in CSV files.

2. **Automation Implementations**  
   Implementations of selected tests in automation frameworks.

3. **Automation Mapping**  
   A mapping file linking test cases to automated implementations.

This separation demonstrates **traceability between specification and automation**.

---

## 3. Security Testing

Security test cases were derived from the **OWASP Top 10** categories, including:

- Injection attempts
- Cross-Site Scripting (XSS)
- Security misconfiguration
- Vulnerable components

This helped connect **security principles with practical test scenarios**.

---

## 4. Why Selenium Was Removed From This Showcase

Initially, the project planned to include **Selenium** as a third automation framework.

However, during implementation it became clear that Selenium requires a **significantly different architectural setup** compared to Cypress and Playwright.

Key differences include:

- WebDriver-based architecture
- explicit driver management
- more extensive test framework configuration
- additional abstraction layers for maintainability (e.g. Page Object Model)

While Cypress and Playwright allow relatively lightweight test setups, Selenium projects typically require:

- a more structured framework design
- test runners and dependency management
- dedicated browser driver configuration

Including Selenium in this repository would therefore require building a **much larger automation framework**, which would distract from the main purpose of this project.

For this reason Selenium was intentionally removed from the showcase.

This decision keeps the repository focused on:

- modern E2E frameworks
- maintainable test structures
- clear automation examples
