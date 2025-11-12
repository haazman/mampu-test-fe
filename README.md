

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Data Fetching**: @tanstack/react-query
- **Styling**: Tailwind CSS v4
- **Testing**: Jest + React Testing Library
- **API**: JSONPlaceholder (https://jsonplaceholder.typicode.com)

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

The default configuration uses JSONPlaceholder API:

```env
NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
```

You can modify this to point to your own API endpoint if needed.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` - The base URL for the API endpoint (default: https://jsonplaceholder.typicode.com)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## Project Structure

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


## Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Building for Production

```bash
npm run build
npm start
```