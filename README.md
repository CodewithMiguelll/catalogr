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

## Screenshots

<img width="1366" height="858" alt="01_dashboard png" src="https://github.com/user-attachments/assets/87548efd-850f-4ea8-b2d3-e58a1553d9f2" />

<img width="1366" height="702" alt="04_product-detail" src="https://github.com/user-attachments/assets/91b041a9-f5a8-446d-a50e-8c99e282618b" />

<img width="1366" height="633" alt="03_edit-form" src="https://github.com/user-attachments/assets/567d075d-b5ec-43bc-9188-459421d16f61" />

<img width="1366" height="858" alt="02_add-form" src="https://github.com/user-attachments/assets/96635bd5-cba1-430e-9b8b-76fa0a0a2a58" />


## Notes On Technical Decisions
- Built with Next.js 16 app directory for server components and routing

- React Query used for data fetching and caching

- Tailwind CSS for styling

- ShadCN UI component library for consistent, reusable UI components

- Lucide-react for icons

- Core features implemented: add/edit/delete books, dynamic dashboard views
