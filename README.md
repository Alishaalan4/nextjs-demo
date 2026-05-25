## Description

This project is for trying out [NextJS](https://nextjs.org/).

Please note this was created on a windows PC, while running on WSL2. Keep that in mind if you run into any issues.

### Prerequisites

This demo assumes you've already setup your development environment following the prisma demo repo (node, npm, etc). You will need at least Node 20+ to run this project.

### Up and Running

First, install the dependencies:

```bash
npm install
```

Then, start the development server:

```bash
npm run dev
```

Access the application at `http://localhost:3000`.

### How to submit your work

1. Fork this repo to your own GitHub account.
2. Make your changes there.
3. Open a Pull Request against this repo.

### What you need to do

1. Switch books genre filtering from `useState` to query params.
2. Add pagination to the different listings available.
3. Add new pages for publishers:
   - Listing using a table view including filtering / sorting
   - Detail view for each publisher
4. Add a fake loading state when navigating between pages (use a skeleton loader or similar).

**Bonus Points:** Hide pages behind authentication (if you navigate to a page while not logged in, redirect to login page) - you can fake the actual authentication logic.

### A note on using AI agents

This exercise is meant to deepen your understanding of Next.js, the App Router, client/server components, routing, and data fetching patterns. If you plan to use an AI agent, don't ask it to generate the full solution. Instead, guide it with something like:

```
Act as a mentor. Do not give me the full solution.
Help me step by step with hints, explanations, and guiding questions so I can implement:
- Switching books genre filtering from `useState` to query params
- Pagination on the different listings
- The publishers pages (table listing with filtering/sorting, and a detail view)
- A fake loading state when navigating between pages (skeleton loader or similar)
- (Bonus) Faking authentication and redirecting unauthenticated users to a login page

Focus on helping me understand, not completing the task for me.
```

The goal is to understand what you're doing, not just finish the assignment.
