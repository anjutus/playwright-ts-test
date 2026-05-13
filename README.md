# Playwright TypeScript Automation Journey 🚀

This repository documents my professional transition into modern automation testing using **Playwright** and **TypeScript**. It features industry-standard patterns, including Page Object Models (POM), API testing, and Cross-Browser validation.

## 🛠️ Project Objective
The goal of this project is to demonstrate a robust automation framework capable of handling complex UI interactions and backend API verification.

## 🏗️ Framework Architecture
* **Language:** TypeScript (Type-safe scripting)
* **Design Pattern:** Page Object Model (POM)
* **Data Management:** Environment variables (`.env`) and JSON Payloads.
* **Testing Types:** * **UI Testing:** Handling Basic Auth, Dynamic Loading, and Form interactions.
    * **API Testing:** CRUD operations and Schema validation using `restful-booker`.

## 📂 Folder Structure
```text
playwright-ts-test/
├── tests/                                   # Test suites
│   ├── ui/                                  # UI test files
│   │   ├── alertsandpopups.spec.ts          # Tests for alerts and popups
│   │   ├── basicauth.spec.ts                # Basic authentication tests
│   │   ├── checkboxes.spec.ts               # Checkbox interaction tests
│   │   ├── dynamicWebTable.spec.ts          # Dynamic web table tests
│   │   ├── paginationWebTable.spec.ts       # Pagination web table tests
│   │   ├── screenshot.spec.ts               # Screenshot and visual tests
│   │   ├── staticWebTable.spec.ts           # Static web table tests
│   │   └── screenshot.spec.ts-snapshots/    # Visual regression snapshots
│   └── api/                                 # API test files
│       ├── booking.spec.ts                  # Booking API CRUD tests
│       └── bookingmock.spec.ts              # Mocked booking API tests
├── pages/                                   # Page Object Models (POM)
│   ├── AlertPopupPage.ts                    # POM for alert and popup pages
│   ├── BasicAuthPage.ts                     # POM for basic auth pages
│   ├── CheckboxesPage.ts                    # POM for checkbox pages
│   ├── DynamicWebTablePage.ts               # POM for dynamic web tables
│   ├── PaginationWebTablePage.ts            # POM for pagination web tables
│   ├── ScreenshotPage.ts                    # POM for screenshot pages
│   └── StaticWebTablePage.ts                # POM for static web tables
├── data/                                    # Test data
│   └── userDataPayload.json                 # JSON payloads for tests
├── playwright-report/                       # Generated test reports
│   └── index.html                           # HTML report file
├── test-results/                            # Test execution results
├── playwright.config.ts                     # Playwright configuration
├── package.json                             # Project dependencies and scripts
├── tsconfig.json                            # TypeScript configuration
└── README.md                                # This documentation file
```
