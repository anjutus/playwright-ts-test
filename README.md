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
├── tests/                          # Test suites
│   ├── ui/
│   │   └── screenshot.spec.ts-snapshots/  # Cross-platform visual baselines
│   │   └── alertsandpopups.spec.ts # UI Basic Alert and Popup logic
|   |   └── checkboxes.spec.ts      # UI Basic checkbox logic
│   │   └── basicAuth.spec.ts       # UI Basic Auth test logic
│   │   └── screenshot.spec.ts      # Visual Testing using SS logic
│   └── api/
│       └── booking.spec.ts         # API CRUD & state sharing test
├── pages/                          # Page Object Models
│   └── CheckboxesPage.ts           # Locators & actions for Checkbox
|   └── BasicAuthPage.ts            # URL & Credentials for Login page
|   └── AlertPopupPage.ts           # Locators & actions for Alert and Popup
|   └── ScreenshotPage.ts           # Locators & actions for Alert and Popup    
├── data/                           # Test data
│   └── userDataPayload.json        # Static JSON test data
├── .env                            # Environment secrets (ignored by Git)
├── .gitignore                      # Files excluded from version control
├── playwright.config.ts            # Browser & Parallel execution config
├── package.json                    # Dependencies & Scripts
└── README.md                       # Project documentation
