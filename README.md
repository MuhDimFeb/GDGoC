# Project Tugas GDGoC   

## Identity
* Name: Muhammad Dimas Febrian
* NIM: 26/584567/PA/24526

## Overview

This is a website for GDGoC Assignment, I'm making the Landings and About page.

## Tech Stack
* Next.js
* React
* Typescript
* TailwindCSS
* Vercel

## Setup instructions

### Prerequisites
- **Node.js 18 or newer** (check with `node -v`)
- **npm** (installed with Node.js; check with `npm -v`)
- An internet connection – the dev server calls the live API, and the asset script downloads from Figma

### 1. Install dependencies
```bash
cd gdgoc-open-recruitment
npm install
```

### 2. Download the design assets
All illustrations, logos and icons from the Figma design are fetched into `public/assets`:
```bash
npm run assets
```
You should see `ok` for every file. Re-running skips files that already exist.
If any file fails with 403/404, the Figma links have expired – see **Assets** below.

### 3. (Optional) Configure the API URL
The site works without any configuration. To change the API or avoid CORS errors:
```bash
cp .env.example .env
```
Then edit `VITE_API_URL` in `.env` (see **CORS** below).

### 4. Start the dev server
```bash
npm run dev
```
Open the address Vite prints (usually http://localhost:5173). The Landing page is `/` and the About page is `/about`.

### 5. Build for production
```bash
npm run build   # type-checks, then writes the site to dist/
npm run preview # serves dist/ locally to check the production build
```

## Presentation

https://drive.google.com/file/d/1Suf0GNyH-D82Qp4iYYAMAsIoafjdPXhq/view?usp=sharing
