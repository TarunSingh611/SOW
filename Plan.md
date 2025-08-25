You’ve basically been asked to build a tiny, two-page web app (front-end + back-end + Postgres DB) that mimics their UI/behavior and proves you can ship production-style code.

Here’s the task in plain English 👇

What you’re building

Two routes:

/terms – a clone of this page: https://online.123fakturera.se/terms/

Looks and behaves the same (scrolling, clicks, touch, language toggle, hamburger menu).

Text must come from PostgreSQL that you design (not hardcoded).

Use their image assets for flags/wallpaper/logo (URLs provided).

Header shows language (English / Swedish). Hamburger menu must open/close.

/pricelist – a simple price list that looks like the screenshots you were sent.

Ignore most actions (no add/delete/print logic required).

Render at least 20 rows so they can test scrolling.

Columns shown depend on screen size (desktop shows more; tablet/phone show fewer—see screenshots).

Cells are editable; when you change a value it should save to Postgres.

Data (all columns) must be loaded from your DB on page load and saved back on edit.

Hamburger menu does not have to work on this page.

Required tech (they specified)

Frontend: Vite + React (plain React is OK). Do not use Next.js.

CSS: Vanilla CSS (no Tailwind/Bootstrap).

Backend: Prefer Fastify + Sequelize (they said other Node frameworks are acceptable, but this is ideal).

Language: JavaScript.

Database: PostgreSQL (pgsql) with a schema you define.

Hosting & repo

Put the mini-app online on a free host (e.g., Render/Railway/Fly for server + DB; Netlify/Vercel for static front-end if you separate, or host both on Render/Railway).

Put code on GitLab (or GitHub) and share the repo link.

When done, provide a technical inventory (exact versions of React, Vite, Fastify, Sequelize, Node, Postgres, and any libs).

What “same look & behavior” means for /terms

Responsive layout works on mobile portrait, mobile landscape, tablet, desktop.

The page background, logo, and flags load from the provided URLs.

Language switch toggles EN/SV by fetching the corresponding text from DB.

Hamburger opens a side drawer (even simple dummy links are fine).

Scrolling and anchor links behave like the original page (if the original has section anchors, implement them).

All modern browsers should render/touch/scroll similarly.

What the /pricelist must do

Show the headers in their UI (you can use your own icons). Typical fields seen in screenshots:

Article No., Product/Service, In Price, Price, Unit, In Stock, Description

Tablet/mobile show fewer: e.g., Product/Service + Price (+ maybe a few others).

Render at least 20 rows from DB.

Users can click in any visible cell, type, and on blur (or with a small “…” save action) you persist to DB.

Keep the visual style close to the screenshots (rounded inputs, soft shadows, pill-like fields).

Smooth vertical scrolling.

Suggested minimal architecture

Frontend (Vite + React)

Routes: /terms, /pricelist

Components:

<AppHeader> with language toggle + flags + hamburger

/terms: <TermsContent> renders sections from API (based on selected lang)

/pricelist: <PriceListTable> with responsive column set + inline editing

Backend (Fastify)

REST endpoints:

GET /api/terms?lang=en|sv → { sections: [{id, title, body, order}] }

GET /api/products → array of 20+ product rows

PATCH /api/products/:id → accepts partial updates { field, value } (or full row)

CORS enabled for your front-end origin.

Sequelize models + migrations + seeders.

Postgres schema (example)

-- languages for clarity
CREATE TABLE languages (
  code TEXT PRIMARY KEY, -- 'en', 'sv'
  name TEXT NOT NULL
);

-- terms copy split into sections so you can anchor and order
CREATE TABLE terms_sections (
  id SERIAL PRIMARY KEY,
  lang_code TEXT REFERENCES languages(code),
  slug TEXT NOT NULL,           -- e.g. 'general-terms'
  title TEXT NOT NULL,
  body TEXT NOT NULL,           -- store HTML or Markdown; HTML is simplest to render like source
  sort_order INT NOT NULL
);
CREATE INDEX ON terms_sections(lang_code, sort_order);

-- products for pricelist
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  article_no TEXT,
  name TEXT NOT NULL,           -- Product/Service
  in_price NUMERIC(12,2),       -- In Price
  price NUMERIC(12,2),          -- Price
  unit TEXT,                    -- e.g., 'kilometers/hour'
  in_stock INTEGER,
  description TEXT
);


Seeding

Insert rows for languages (en, sv).

Copy the terms content from the live page into terms_sections for both languages, split by headings.

Insert 20–30 sample products.

Responsive behavior (what to show per device)

Desktop (≥1024px): Article No., Product/Service, In Price, Price, Unit, In Stock, Description.

Tablet (~768–1023px): Product/Service, In Price, Price, In Stock, Unit (optional).

Phone landscape (~568–767px): Product/Service, Price (+ optional Article No.).

Phone portrait (<568px): Product/Service and Price only (as in their phone screenshots).

Use CSS media queries; no CSS frameworks.

Acceptance checklist you can follow

/terms

 UI matches the reference page: header, language label + flag, wallpaper background, logo.

 Hamburger opens/closes; links are clickable.

 EN/SV toggle loads from DB; text updates without page reload.

 Anchors/scroll feel normal on touch and mouse.

 Mobile, tablet, desktop layouts verified.

/pricelist

 At least 20 rows load from DB.

 Inline edits persist to DB (refresh preserves changes).

 Columns adapt by breakpoint (as above).

 Visual style approximates screenshots.

 Smooth scrolling on mobile/desktop.

Infra

 Hosted app URL shared.

 Git repo shared.

 README with setup, env vars, DB schema, seed, and versions list.

What you’ll deliver at the end

Live URL (front-end + API).

Git repo link.

README including:

Versions (React, Vite, Fastify, Sequelize, Node, Postgres).

Exact libraries used.

How to run locally and seed DB.

API endpoints & sample payloads.

Good clarifying questions to send back (if needed)

Is it OK if I store the terms text as HTML in the DB (to match formatting exactly)?

For /pricelist saving: do you prefer auto-save on blur or a small “…” context button per row?

Any must-have columns on tablet/phone beyond what’s in the screenshots?

Any specific browser minimums (e.g., Safari 14+, Chrome 110+)?

Can I deploy both front-end and back-end on Render/Railway with a free Postgres instance?