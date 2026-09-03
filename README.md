# Pilates High

Marketing site, journal, and payments for Amy's private Pilates apparatus training.

Built as a [Jekyll](https://jekyllrb.com) site so it hosts for free on GitHub Pages, takes payments through Stripe Payment Links with no server, and publishes journal entries from plain Markdown files.

## Running costs

| Item | Cost |
|---|---|
| Hosting (GitHub Pages) | Free |
| Payments (Stripe Payment Links) | No monthly fee. 2.9% + 30¢ per card payment. |
| Booking form (Formspree free tier) | Free up to 50 submissions a month |
| Domain name | Roughly $12 a year |

## Where everything lives

- `_config.yml` — every fact a non-developer should change: contact details, location, the four rates, Stripe links, Formspree id.
- `index.html` — the home page. The Investment section is generated from `_config.yml`.
- `_posts/` — journal entries, one Markdown file each. See below.
- `_layouts/` — the page shell (`default.html`) and the journal entry template (`post.html`).
- `blog/index.html` — the journal listing at `/journal/`.
- `assets/css/styles.css` — design tokens at the top, light and dark themes, then components.
- `assets/js/script.js` — the breathing line in the hero.

## Publishing on GitHub Pages

1. Merge this branch into `main`.
2. In the repository settings, open **Pages** and set the source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The site appears at `https://<account>.github.io/<repo>/` within a minute or two. If the repo is not named `<account>.github.io`, set `baseurl: "/<repo>"` in `_config.yml`.
4. To use a custom domain, add it under **Pages > Custom domain**, point the domain's DNS at GitHub Pages as the settings page instructs, and set `url:` in `_config.yml`. Tick **Enforce HTTPS**.

## Taking payments with Stripe

Payment Links are hosted checkout pages Stripe runs for you. There is no code to write and no server to run.

1. Create a Stripe account at stripe.com and complete the business verification.
2. In the dashboard go to **Product catalogue > Add product** and create one product per option: Initial assessment, Single private session, Series of ten, Monthly (set the monthly one as a recurring price if you want it to bill automatically).
3. For each product click **Create payment link**. Under advanced options you can collect the customer's phone number and add a note such as "Amy will contact you to schedule".
4. Copy each link into the matching field under `stripe:` in `_config.yml`. Add one for gift certificates too if you want them.
5. Commit and push. The Purchase buttons go live.

Until a link is filled in, that button reads "Book by email" instead, so the site is never broken while you set things up.

Stripe also emails receipts and lets you issue refunds from the dashboard. If you later want sessions tracked and booked automatically, a scheduling tool such as Acuity or Calendly can replace the Purchase buttons; the links live in the same config file.

## The booking form

By default the form opens the visitor's email client. For a proper form that lands in your inbox:

1. Create a free account at formspree.io and add a form.
2. Copy the form id (the part after `/f/` in the endpoint) into `formspree_id` in `_config.yml`.

## Writing a journal entry

Create a file in `_posts/` named `YYYY-MM-DD-short-title.md`:

```
---
layout: post
title: Why the first session is ninety minutes
summary: One sentence shown in listings and search results.
category: The practice
---

Your entry, written in Markdown. Use `## Heading` for sections,
`**bold**` for emphasis, and `- ` for bullet lists.

<!--more-->

Everything after the "more" marker only appears on the entry page.
```

Push the file and it is live. Entries are listed newest first at `/journal/`, the three most recent appear on the home page, and an RSS feed is generated at `/feed.xml`.

## Previewing locally

Requires Ruby. From the repo folder:

```
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

## Photography

The site is designed around six photographs, listed with art direction at `/direction/` (an unlisted page). Until they exist, each image slot shows a line drawing of the apparatus over a painted wash of light, and two slots load temporary Unsplash photographs configured under `photos:` in `_config.yml`. Those two were chosen by title, not reviewed, and should be replaced. To use your own, put the files in `assets/img/` and set, for example, `hero: /assets/img/hero.jpg`.

## Before launch

1. Confirm the bracketed facts in the Amy section of `index.html` and `amy.years` in `_config.yml`.
2. Confirm the rates, email, phone, and location in `_config.yml`.
3. Paste in the Stripe Payment Links.
4. Add photographs (see above) and set their paths in `_config.yml`.
5. Replace or delete the three sample journal entries.
