# Catalogr

A Next.js application for managing and organizing books efficiently.

## Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/CodewithMiguelll/catalogr.git
cd catalogr
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   - Create a `.env.local` file in the root directory
   - Add any required environment variables

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Production Build

```bash
npm run build
npm run start
```

## Project Structure

- `app/` - Next.js app directory with pages and components
- `public/` - Static assets
- `package.json` - Dependencies and scripts

## Notes On Technical Decisions
- Built with Next.js 16 app directory for server components and routing

- React Query used for data fetching and caching

- Tailwind CSS for styling

- ShadCN UI component library for consistent, reusable UI components

- Lucide-react for icons

- Core features implemented: add/edit/delete books, dynamic dashboard views