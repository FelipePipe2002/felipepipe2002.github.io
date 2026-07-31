# Home Finance App

An **offline-first mobile finance application** for understanding monthly cash flow, planning installments, controlling category budgets, and tracking savings goals.

## Main Features

- **Income and Expense Tracking**: Create, edit, categorize, filter, and delete transactions
- **Installment Planning**: Split expenses and automatically create payments as they become due
- **Savings Goals**: Manage goals, deadlines, suggested contributions, deposits, and withdrawals
- **Financial Dashboard**: Review balances, monthly net flow, spending, upcoming commitments, and insights
- **Multi-Currency Support**: Record ARS and USD transactions using a locally cached exchange rate
- **Custom Categories**: Configure limits, icons, colors, and their relationship to existing transactions
- **Offline Persistence**: Keep financial information locally without requiring an account or connection

## Technical Implementation

The application is built with **React Native**, **React**, and **TypeScript**. Data is persisted with **AsyncStorage**, and custom hooks separate persistence, financial calculations, exchange-rate updates, and transaction-form behavior.

The financial model normalizes installment plans on startup, calculates derived monthly metrics, converts currencies into a common base, and keeps category changes synchronized with existing data.

## Architecture Highlights

- Reusable custom hooks for transactions, summaries, forms, and exchange rates
- Derived financial metrics separated from presentation components
- Local-first data ownership and offline operation
- Automatic light and dark themes
- Jest tests, ESLint, and scripted Android release generation

## Technologies

`React Native` `React` `TypeScript` `AsyncStorage` `Jest` `Android` `iOS`
