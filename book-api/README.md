# @phearaa/book-api

Simple REST API for books and categories built with Express, TypeScript, and Prisma.

## Scripts

- `npm run dev` - run in development mode with auto-reload
- `npm run build` - compile TypeScript to `dist`
- `npm start` - run compiled server from `dist/server.js`

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/book_api
```

## Run Locally

```bash
npm install
npm run build
npm start
```

## Publish Checklist

```bash
npm run build
npm pack --dry-run
npm publish
```
