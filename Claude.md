# Built By Jason — Portfolio & Services Site

## Project Name: `built-by-jason`

**Domain suggestion:** `builtbyjason.dev` (grab this on Namecheap/Cloudflare — it's a statement, it's brandable, and it looks killer on a business card and resume)

**Stack:** Next.js 14 (App Router) + Tailwind CSS + Framer Motion — deploy on Vercel

---

## Design Direction

This is NOT a generic dev portfolio. This should feel like a premium creative agency site that happens to be one person. Think: dark mode, cinematic, bold typography, smooth scroll animations, and intentional whitespace. The vibe is confident, modern, and a little bit luxurious — like the black & gold barbershop flyer aesthetic but evolved for a broader audience.

### Design Principles

- **Dark theme primary** — near-black background (#0a0a0a), warm cream text (#f0ece4), gold accents (#c9a84c)
- **Typography** — Use a bold display font for headings (Bebas Neue, Oswald, or Space Grotesk) paired with a clean sans-serif body (DM Sans, Satoshi, or General Sans). Big type. Let it breathe.
- **Motion** — Smooth scroll-triggered fade-ins, subtle parallax on hero, staggered entry animations on project cards. Use Framer Motion. Nothing flashy or gimmicky — just polished.
- **Layout** — Full-width sections with generous padding. Asymmetric grids for projects. No boxy template feel.
- **Photography** — Use placeholder image blocks for now with clear labels like `[HERO_IMAGE]`, `[PROJECT_SCREENSHOT_GERA]`, `[PROJECT_SCREENSHOT_BIGHIT]`, `[HEADSHOT]` so Jason can drop in real images later.
- **Mobile-first** — Must look incredible on phone. Most barbershop owners and potential clients will view this on mobile.

---

## Site Structure (Single Page, Scroll Sections)

### Section 1: Hero

Full viewport height. This is the first impression — make it count.

- Large heading: **"I Build Websites & AI Tools for Businesses That Want to Stand Out"**
- Subtext: A one-liner like "Developer & AI specialist based in Las Vegas, NV — helping local businesses look sharp online and work smarter with AI."
- A subtle animated element — maybe a soft gradient shift, a typing effect on one keyword, or a slow parallax on a background texture
- CTA button: **"See My Work"** (smooth scrolls to projects)
- Secondary CTA: **"Get In Touch"** (smooth scrolls to contact)
- Somewhere in the hero (corner or below the CTAs): small links/icons for GitHub, YouTube (@zerotoagents), X (@zerotoagent)
- `[HEADSHOT]` placeholder — optional, could be a circular photo off to the side or integrated into the layout

### Section 2: About (Brief)

Keep this tight — 3-4 sentences max. No life story.

- **Who I am:** Web developer and AI solutions builder based in Las Vegas
- **What I do:** Build custom websites, AI chatbots, and AI agents for local businesses
- **Why me:** 5 years of e-commerce experience (Etsy), hands-on builder who ships real products, not a template installer
- **Personality hook:** Something like "I don't just build websites — I build tools that work for you while you work on your business."
- Include a few quick stats/badges horizontally:
  - `5+` Years in E-Commerce
  - `10+` Projects Shipped
  - `24/7` AI Tools That Never Sleep

### Section 3: Services

This is where potential clients understand what you offer. Lay it out in a clean card grid (2x2 or responsive).

**Card 1: Custom Websites**
- Built from scratch, not templates
- Mobile-optimized, fast, SEO-friendly
- Designed specifically for your business
- Icon: code brackets or monitor icon

**Card 2: AI Chatbots**
- Smart assistants that live on your website
- Answer customer questions 24/7
- Handle FAQs, pricing, booking links
- Icon: chat bubble or robot icon

**Card 3: AI Agent Development**
- Custom AI agents that automate workflows
- Built with the latest AI APIs and tools
- Tailored to your specific business needs
- Icon: cpu/brain icon

**Card 4: Website Redesigns**
- Modernize your outdated site
- Improve speed, SEO, and mobile experience
- Keep what works, fix what doesn't
- Icon: refresh/paintbrush icon

Each card should have a subtle hover animation — slight lift, border glow, or scale.

### Section 4: Projects (THE MONEY SECTION)

This is what sells. Make it visual, make it bold. Each project gets a large showcase card.

**Project 1: G.Era — Street Luxury Brand**

- `[PROJECT_SCREENSHOT_GERA]` — large screenshot/mockup placeholder
- **Description:** Full e-commerce website built for a street luxury fashion brand. Custom design, product catalog, and brand identity brought to life online.
- **Tags/pills:** `E-Commerce` `Custom Design` `Brand Identity`
- **Link:** (add live URL if available, otherwise omit)

**Project 2: Big Hit Barbershop — AI Chatbot**

- `[PROJECT_SCREENSHOT_BIGHIT]` — large screenshot/mockup placeholder (could show the chat widget in action)
- **Description:** AI-powered chatbot deployed for a barbershop with locations in Las Vegas and Kenosha. Handles customer questions about services, pricing, hours, and directs clients to booking — all automatically.
- **Tags/pills:** `AI Chatbot` `Multi-Location` `Customer Service Automation`
- **Link:** (add live URL if available, otherwise omit)

**Layout for projects:**
- Alternating layout — first project has image on left/text on right, second project flips. On mobile, stack vertically.
- Large images with a subtle device mockup frame (laptop or phone) to make screenshots look professional
- Scroll-triggered animations — image slides in from one side, text fades in from the other

**Future-proofing:** Build the projects section so it's easy to add more projects later. Use a simple data array/config so Jason can just add a new object and it renders automatically.

### Section 5: Zero to Agents (Content / Teaching)

A smaller section that shows the teaching/content side. This differentiates Jason from random freelancers — he's not just building, he's teaching.

- Heading: **"I Also Teach This Stuff"**
- Brief description: "Zero to Agents is a free 10-week course I created that teaches anyone how to build AI agents from scratch using Python and the Claude API."
- A row of links/buttons:
  - 🎥 YouTube — links to @zerotoagents
  - 🐦 X / Twitter — links to @zerotoagent
  - 🌐 Course Site — links to zerotoagents.vercel.app
- Optional: embed or thumbnail of a YouTube video
- Keep this section lighter in visual weight than projects — it's supplementary, not the main sell

### Section 6: Contact / CTA

Strong close. Dark section with gold accents.

- Heading: **"Let's Build Something"**
- Subtext: "Have a project in mind? Need a website or AI tool for your business? Let's talk."
- **Phone:** (702) 982-9560
- **Email:** jaysal2789@gmail.com
- **Location:** Las Vegas, NV
- CTA button: "Send Me a Message" — this can link to `mailto:jaysal2789@gmail.com` or open a simple contact form
- Social icons row: GitHub, YouTube, X

### Footer

Minimal. Just:
- "© 2026 Jason Salazar. Built from scratch, obviously."
- Small row of social links

---

## Technical Notes

### Project Structure
```
built-by-jason/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Main single-page with all sections
│   └── globals.css         # Global styles + Tailwind
├── components/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Projects.tsx
│   ├── ZeroToAgents.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx          # Fixed/sticky nav with section links
│   └── ui/
│       ├── ProjectCard.tsx
│       ├── ServiceCard.tsx
│       ├── SectionHeading.tsx
│       ├── AnimatedSection.tsx  # Reusable scroll-trigger wrapper
│       └── Button.tsx
├── lib/
│   ├── projects.ts         # Project data array (easy to add more later)
│   └── services.ts         # Services data array
├── public/
│   ├── images/             # Drop screenshots and headshot here
│   └── favicon.ico
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

### Navigation

Fixed/sticky navbar that appears after scrolling past the hero. Minimal — just:
- Logo or "JS" monogram on the left
- Section links: Work / Services / About / Contact
- Smooth scroll to each section on click
- Mobile: hamburger menu with full-screen overlay

### Fonts

Import via `next/font/google`:
- Heading: Bebas Neue or Space Grotesk (bold weights)
- Body: DM Sans (400, 500, 600)

### Color Tokens (Tailwind Config)

```js
colors: {
  background: '#0a0a0a',
  surface: '#151515',
  'surface-light': '#1e1e1e',
  border: '#2a2a2a',
  gold: '#c9a84c',
  'gold-light': '#dfc06e',
  cream: '#f0ece4',
  muted: '#9a9a9a',
  white: '#fafafa',
}
```

### Animations (Framer Motion)

- Hero: fade-in + slight upward slide on load
- Section headings: fade-in when scrolled into view
- Project cards: slide in from left/right alternating
- Service cards: staggered fade-in
- Stats: count-up animation on the numbers
- Navbar: slide down on scroll, transparent to solid background transition

### SEO & Meta

- Page title: "Jason Salazar — Web Developer & AI Solutions | Las Vegas, NV"
- Meta description: "Custom websites, AI chatbots, and AI agents for local businesses. Based in Las Vegas. Let's build something."
- Open Graph image: create a simple OG image with the site name and tagline (1200x630)
- Proper heading hierarchy (h1 in hero, h2 for sections, h3 for cards)

### Performance

- Use `next/image` for all images with proper sizing
- Lazy load project screenshots
- Minimal JS bundle — avoid heavy libraries beyond Framer Motion
- Target 95+ Lighthouse score

---

## Placeholder Images to Replace

When building, use gray placeholder boxes with text labels. Jason will replace these with real assets:

1. `[HEADSHOT]` — Professional or casual photo of Jason
2. `[PROJECT_SCREENSHOT_GERA]` — Screenshot of the G.Era website (desktop + mobile mockup)
3. `[PROJECT_SCREENSHOT_BIGHIT]` — Screenshot of Big Hit Barbershop chatbot in action
4. `[HERO_BG]` — Optional textured or gradient background for hero section
5. `[OG_IMAGE]` — Open Graph social share image (1200x630)

---

## Deploy

1. Push to GitHub repo (e.g., `Jasonsal23/built-by-jason`)
2. Connect to Vercel
3. Add custom domain `builtbyjason.dev` once purchased
4. Done

---

## Summary

This portfolio should accomplish three things:
1. **Sell to clients** — barbershop owners, local businesses see your work and want to hire you
2. **Impress on resumes** — hiring managers and recruiters see a polished, well-built site that shows real skills
3. **Connect your brand** — Zero to Agents, your YouTube, your services all live under one roof

Build it clean, build it fast, make it yours.
