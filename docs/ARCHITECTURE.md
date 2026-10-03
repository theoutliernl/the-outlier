# The Outlier site: how it is built

Read this before you change anything. Plan of work: `docs/PRD-QUINT.md`. Rules: `AGENTS.md`.

## Stack

- **Next.js 16** (App Router, Turbopack), **React 19**, plain JavaScript (`.jsx`/`.js`).
- **Styling:** design tokens in `app/globals.css`, every component has its own **CSS Module** (`Component.module.css` next to `Component.jsx`). No Tailwind, no inline colours.
- **Motion:** `motion/react` (Framer Motion). One motif: fade-up 24px, 600ms, ease-out. Respect `prefers-reduced-motion` (the primitives already do).
- **Icons:** `lucide-react`, always through `IconBadge` or at `size` 16-22 inline.
- **CMS:** Payload 3 at `/admin`, Postgres on Supabase (`vidqebtlybyxfrcppgye`, eu-west-1). Collection `posts` holds insights and comparisons.
- **Forms:** Next route handlers in `app/(frontend)/api/*` write to Supabase tables with the service-role key (RLS on, no public policies).
- **Hosting:** Vercel project `the-outlier/theoutlier-site`, deploys on every push to `main` of `github.com/theoutliernl/the-outlier`. Review URL: https://theoutlier-site.vercel.app

## Folders

```
app/
  globals.css                 tokens + reset + .container + brand lockup classes. Nothing else.
  layout.jsx                  root <html lang="en">
  (frontend)/layout.jsx       fonts, site JSON-LD, SiteHeader, <main id="main">, SiteFooter, WhatsAppWidget
  (frontend)/page.jsx         home (sections composed from components/home + components/ui)
  (frontend)/<route>/page.jsx services, start, contact, about, team, projects, compare, blog, privacy, thank-you
  (frontend)/api/*            contact, assessment, newsletter
  (payload)/                  Payload admin, do not touch
components/
  Brand.jsx                   Logo, Mark, Wordmark. The ONLY way to show the logo.
  ui/                         primitives (see catalogue below)
  site/                       SiteHeader, SiteFooter, NewsletterForm, WhatsAppWidget
  home/                       Hero, HeroBars, GlyphField, ProblemRows, MethodGrid, ServiceCards, CompareTeaser, FounderBlock
  forms/                      ContactForm, Assessment
lib/
  content/site.js             nav, contact, founder facts, stats, method, values, FAQ, marquee
  content/services.js         the four services (prices live here only)
  content/compare.js          comparison rows + Mac-vs-PC dialogue
  blog.js                     Payload queries; slug convention for comparisons
  scoring.js                  assessment questions + scoring + result
  mail.js                     mail templates + MAIL_ENABLED switch
  qa.js                       dry-run detection for QA submissions
content/articles/*.md         insight articles (source of truth, import with scripts/import-markdown.py)
content/compare/vs-*.md       comparison articles (draft until Fariza approves)
supabase/*.sql                additive schema changes (run once, never destructive)
scripts/qa-tests.sh           79-check QA suite
tools/qa/                     shot.mjs (screenshots + overflow check), flow.mjs (gold bar + assessment end-to-end)
design/tokens.js              brand source (from Figma), reference only
```

## Change content without touching layout

| You want to change | Edit |
|---|---|
| Menu items, footer columns | `lib/content/site.js` → `nav`, `footerColumns` |
| Email, city, WhatsApp text | `lib/content/site.js` → `contact` (WhatsApp number comes from env `NEXT_PUBLIC_WA_NUMBER`) |
| Founder facts, stats strip, FAQ, values | `lib/content/site.js` |
| Service names, prices, deliverables | `lib/content/services.js` |
| Comparison table / dialogue | `lib/content/compare.js` |
| Assessment questions and advice lines | `lib/scoring.js` (`QUESTIONS`, `*_LINES`) |
| Mail texts | `lib/mail.js` (needs Fariza's approval before `MAIL_ENABLED=1`) |
| Articles | Payload `/admin`, or Markdown in `content/` + `scripts/import-markdown.py` |

## Design tokens (app/globals.css)

- Surfaces: `--ink` (page), `--midnight`, `--ink-deep` (footer), `--surface-1/2` (cards).
- Text on dark: `--text-strong`, `--text-lead`, `--text-body`, `--text-muted`.
- Accent: `--gold`, `--gold-hi`, `--gold-lo`, `--grad-gold`. **Gold is for bars, lines, dots, fills and the IER in the logo. Never for body text, never as text on a light surface.**
- Lines: `--line`, `--line-strong`. Radius: `--radius-sm/--radius/--radius-lg/--radius-pill`.
- Type: `--fs-display/h1/h2/h3/lead/body/small/label`. Fonts: Inter (`--font-sans`), JetBrains Mono (`--font-mono`) for labels and numbers.
- Motion: `--ease-out`, `--dur-fast/--dur/--dur-slow`.
- Need a new colour? Add a token here first. Never write hex values in a module except brand-fixed third parties (WhatsApp green).

## Primitive catalogue (components/ui)

Import with a relative path, e.g. `import Section from "../../../components/ui/Section";`

| Component | Use | Key props |
|---|---|---|
| `Section` | every page block (padding, tone, container) | `tone="plain|band|deep|gold"`, `size="default|tight|flush"`, `id` |
| `Heading` + `Accent` | every title | `as="h1|h2|h3"`, `size="display|h1|h2|h3"`, `caps`. Wrap ONE word in `<Accent>` |
| `Kicker` | small label above a heading | children |
| `Lead` | intro paragraph | children |
| `Button` | every CTA | `href`, `variant="primary|ink|ghost|text"`, `size="md|lg"`, `arrow`. Add `data-outlier-cta=""` to make the hero's gold bar react |
| `Reveal` / `Stagger` + `StaggerItem` | entrance animation | `delay` (s), `as` |
| `Media` | every photo (next/image) | `src`, **`alt` required**, `ratio="4/5"`, `sizes`, `priority`, `grade="soft"` |
| `IconBadge` | icon in a hairline square, redraws on hover | `icon={LucideIcon}`, `size="md|lg"`. Put `group` class on the card to trigger from the card |
| `StatStrip` (+ `NumberTicker`) | authority numbers | `items=[{note, value|text, prefix, suffix, label}]` |
| `Accordion` / `FAQ` | expandable lists / FAQ with FAQPage schema | `items=[{title, body, meta}]` |
| `PageHero` | top of every subpage, holds the page's only `h1` | `kicker, title, lead, crumbs, image, actions` |
| `Breadcrumbs` | inside PageHero, adds BreadcrumbList schema | `items` |
| `CTABand` | gold closing band | `kicker, title, lead, primary, secondary` |
| `Marquee` | moving strip of short phrases | `items` |
| `Field` | form field with label | `label, name, multiline, required` |
| `PostCards` | article grid | `posts`, `columns` |
| `ArticleLayout` | article page (blog + compare) | `post, section, related` |
| `ServiceDetail` | one service in full | `service, index, flip` |
| `ValueList` | big value rows | `items` |
| `RichContent` | Payload rich text with prose styles | `content` |
| `LottieIcon` | Lottie animation from `/public/lottie` | `src, width, height` |

### Page recipe (copy this for a new page)

```jsx
import PageHero from "../../../components/ui/PageHero";
import Section from "../../../components/ui/Section";
import Heading from "../../../components/ui/Heading";
import Kicker from "../../../components/ui/Kicker";
import Lead from "../../../components/ui/Lead";
import Reveal from "../../../components/ui/Reveal";
import CTABand from "../../../components/ui/CTABand";

export const metadata = {
  title: "Keyword-first title under 60 characters",
  description: "140-160 characters, keyword early, ends with a reason to click.",
  alternates: { canonical: "/your-route" },
};

export default function Page() {
  return (
    <>
      <PageHero kicker="Label" title="One clear promise." lead="One or two sentences." crumbs={[{ label: "Label", href: "/your-route" }]} />
      <Section tone="band">
        <Reveal><Kicker>Section label</Kicker></Reveal>
        <Reveal delay={0.05}><Heading size="h2">Section title</Heading></Reveal>
        <Reveal delay={0.1}><Lead>Section intro.</Lead></Reveal>
      </Section>
      <CTABand />
    </>
  );
}
```
Then: add the route to `nav` or `footerColumns` if it should be linked, to `PAGES` in `app/(frontend)/sitemap.js`, and to `PAGES` in `scripts/qa-tests.sh`.

## Behaviour worth knowing

- **Header:** hides on scroll down, returns on scroll up, stays when you stop (`components/site/SiteHeader.jsx`). Progress bar on top. Mobile menu below 1120px.
- **Hero:** video `/public/video/hero.mp4` + `GlyphField` (glyphs light up around the cursor) + `HeroBars` (canvas). Any element with `data-outlier-cta` makes the middle gold bar shoot up while hovered or focused.
- **WhatsApp widget:** shows only when `NEXT_PUBLIC_WA_NUMBER` is set. Pre-filled message in `lib/content/site.js`.
- **Assessment (/start):** questions in `lib/scoring.js`. The result is computed in the browser and again on the server; the server stores the row (`assessment_submissions`, columns incl. `answers` jsonb, `profile`, `company`, `role`, `timing`, `interest`). `?interest=<service-slug>` is stored when people come from a service.
- **Booking:** set `NEXT_PUBLIC_CAL_URL` in Vercel and the assessment result shows "Book a 20-minute call". Without it: "Plan a call" → /contact.
- **Mail:** `MAIL_ENABLED=1` + SMTP env sends confirmation + notification (to `NOTIFY_EMAIL`, default fariza@theoutlier.nl). Off by default: the message is logged only.
- **Comparisons vs insights:** a post whose slug starts with `vs-` is a comparison (`/compare/<slug>`), everything else is an insight (`/blog/<slug>`). No schema change needed.
- **QA dry-run:** requests with header `x-qa-dry-run: 1` or an email ending in `.test` are validated but not stored and not mailed.

## Environment (Vercel → Settings → Environment Variables)

`DATABASE_URL`, `PAYLOAD_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_WA_NUMBER`, optional `NEXT_PUBLIC_CAL_URL`, `NEXT_PUBLIC_SITE_URL` (set to https://theoutlier.nl at launch), `MAIL_ENABLED`, `SMTP_HOST/PORT/USER/PASS/FROM`, `NOTIFY_EMAIL`.
Changing a `NEXT_PUBLIC_*` value needs a new deploy (push a commit or redeploy in Vercel).

## Known pitfalls

- Never enable `PAYLOAD_DB_PUSH`: a schema push once dropped the form tables (`docs/INCIDENT-formuliertabellen.md`). Schema changes go in `supabase/*.sql`, additive only.
- `next/font/google` breaks with Turbopack in Next 16.3; fonts are local in `app/(frontend)/fonts/`.
- CSS custom properties that reference other variables must be defined where those variables exist (that is why `--font-sans` lives on `.site-root`).
- Server components cannot read `Stagger.Item`-style statics from client modules: use the named export `StaggerItem`.
- Ports 3999-4003 on the box are taken by old dev servers. Use 3100 or check `ss -ltnp`.
