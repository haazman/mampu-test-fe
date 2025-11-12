# User Management Application

A modern, responsive user management application built with Next.js, TypeScript, React Query, and Tailwind CSS.

## 🚀 Features

- **User Directory**: Browse and search through all users
- **User Details**: View comprehensive user information including contact details, company info, and address
- **Smart Search**: Filter users by name or email in real-time
- **Sorting**: Sort users alphabetically by name
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Loading States**: Skeleton loaders for better UX
- **Error Handling**: Comprehensive error states with retry functionality
- **SEO Optimized**: Metadata generation for better search engine visibility
- **ISR (Incremental Static Regeneration)**: User data cached for 60 seconds
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support
- **Unit Tests**: Comprehensive test coverage with Jest and React Testing Library

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Data Fetching**: @tanstack/react-query
- **Styling**: Tailwind CSS v4
- **Testing**: Jest + React Testing Library
- **API**: JSONPlaceholder (https://jsonplaceholder.typicode.com)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## 🗂️ Project Structure

```
mampu-test-fe/
├── src/
│   ├── app/
│   │   ├── users/
│   │   │   ├── [id]/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── page.test.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── __tests__/
│   │   │   │   └── page.test.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── QueryProvider.tsx
│   └── types/
│       └── user.ts
├── public/
├── jest.config.js
├── jest.setup.js
├── next.config.ts
├── tsconfig.json
└── package.json
```

## 🎯 Features Implementation

### Task 1 - Setup ✅
- Next.js 16 with TypeScript
- App Router
- React Query for data fetching
- Tailwind CSS for styling
- Jest + React Testing Library for testing

### Task 2 - Users List Page ✅
- Located at `/users`
- Fetches data from JSONPlaceholder API
- Responsive table with Name, Email, Website columns
- Loading skeleton and error states
- Client-side search by name/email
- Sort by name (ascending/descending)
- Empty state when no results

### Task 3 - User Details Route ✅
- Dynamic route at `/users/[id]`
- Displays comprehensive user information:
  - Contact Information (Email, Phone, Website)
  - Company details (Name, Catchphrase, Business)
  - Address (Street, City, Zipcode, Coordinates)
- "Back to list" navigation
- Loading and error states
- SEO metadata with `generateMetadata`
- ISR with 60-second cache

### Task 4 - Styling & UX ✅
- Modern, clean UI with Tailwind CSS
- Fully responsive (desktop & mobile)
- Skeleton loaders during data fetch
- Empty state messaging
- Accessible table semantics
- Focus states and keyboard navigation
- Proper ARIA labels

### Task 5 - Testing ✅
- Unit tests for Users List component
- Unit tests for User Details component
- Tests cover:
  - Rendering rows
  - Search filtering
  - Sorting functionality
  - Loading states
  - Error states
  - Retry functionality
  - Empty states

## 🧪 Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🚀 Building for Production

```bash
npm run build
npm start
```

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Proper heading hierarchy

## 🎨 Key Design Decisions

1. **React Query**: Chosen for automatic caching, background refetching, and better developer experience
2. **Client Components**: Used for interactive features (search, sort) while maintaining good performance
3. **Tailwind CSS**: Provides rapid UI development with consistent design
4. **Skeleton Loaders**: Improves perceived performance during data loading
5. **Error Boundaries**: Graceful error handling with retry functionality
6. **Semantic HTML**: Better accessibility and SEO
7. **ISR**: 60-second cache for better performance while keeping data fresh

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 📄 License

Copyright © 2025 PT Mampu Inovasi Digital

---

**Note**: This application uses the JSONPlaceholder API for demonstration purposes. In a production environment, you would replace this with your actual API endpoints.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
