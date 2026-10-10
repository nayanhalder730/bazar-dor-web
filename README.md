# 🛒 Bazar Dor — বাজার দর

**A modern, responsive web application for exploring and comparing daily market prices in Bangladesh.**

Bazar Dor helps users explore everyday products, compare market prices, identify price increases and decreases, and view product details through a clean, user-friendly interface with Bengali localization.

## 🌐 Live Demo

**[Visit Bazar Dor](https://bazar-dor-web-eight.vercel.app/)**

- **GitHub Repository:** [nayanhalder730/bazar-dor-web](https://github.com/nayanhalder730/bazar-dor-web)
- **Deployment:** Vercel

## ✨ Features

- **Responsive Design:** Optimized layouts for mobile, tablet, and desktop screens.
- **Daily Market Prices:** Browse product prices with Bengali numerals and units.
- **Price Trend Sections:** Explore products with increasing and decreasing prices.
- **Product Categories:** Browse products by category and sort them by price.
- **Product Details:** View product information, price summaries, and market-specific prices.
- **Authentication:** Email and password authentication with Google and GitHub sign-in integration.
- **Protected Pages:** Authentication-based access to restricted pages.
- **Interactive Price Ticker:** A scrolling marquee for quick market-price updates.
- **Loading and Feedback UI:** Loading states and notifications for a smoother user experience.
- **Profile Management:** A dedicated area for user profile functionality.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework and application routing |
| React 19 | Component-based user interface |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling |
| HeroUI | UI components |
| Better Auth | Authentication |
| MongoDB | Database |
| React Fast Marquee | Scrolling market-price ticker |
| React Toastify | Toast notifications |
| Vercel | Deployment and hosting |

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git
- A MongoDB database

### 1. Clone the repository

```bash
git clone https://github.com/nayanhalder730/bazar-dor-web.git
```

### 2. Navigate to the project directory

```bash
cd bazar-dor-web
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root and configure the following variables with your own credentials.

```env
MONGODB_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

**Important:** Use valid credentials for your own database and OAuth applications. Never commit `.env.local` or publish API secrets in your repository.

For production, configure the appropriate environment variables in your Vercel project settings.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for production

```bash
npm run build
```

To start the production server after building:

```bash
npm run start
```

## 📁 Application Routes

The application includes the following routes:

| Route | Description |
|---|---|
| `/` | Home page and market overview |
| `/category/[categoryProduct]` | Category-specific products |
| `/productDetail/[productId]` | Product details |
| `/signIn` | User sign-in |
| `/signUp` | User registration |
| `/profile` | User profile |

Some routes require authentication. Access depends on the application's authentication configuration.

## 🔐 Authentication

Bazar Dor uses Better Auth for authentication and MongoDB for persistent data storage.

Authentication options are configured for:

- Email and password
- Google OAuth
- GitHub OAuth

OAuth sign-in requires correctly configured provider credentials and callback URLs. Availability depends on the production configuration.

## 🌍 Deployment

The application is deployed on Vercel.

**Live Application:**  
https://bazar-dor-web-eight.vercel.app/

**Source Code:**  
https://github.com/nayanhalder730/bazar-dor-web

## 🎯 Project Goals

The goal of Bazar Dor is to make everyday market-price information easier to explore through an accessible, responsive, and localized web experience.

The project also demonstrates practical use of modern web development technologies, including Next.js, TypeScript, database integration, authentication, responsive UI development, and deployment.

## 👨‍💻 Author

**Nayan Halder**

- GitHub: [@nayanhalder730](https://github.com/nayanhalder730)
- Project: [Bazar Dor — Live Demo](https://bazar-dor-web-eight.vercel.app/)

---

*Built with Next.js, TypeScript, and a focus on making market-price information easier to access.*
