# Sitely — Digital Studio

> Official website and digital services platform for **Sitely**, a digital service provider based in Karachi, Pakistan, helping businesses grow with fast, mobile-friendly websites, online stores, WhatsApp ordering, custom applications, and business automations.

---

## 🔒 Security & Secret Safety Policy

### ⚠️ CRITICAL WARNING: ROTATE PREVIOUSLY HARDCODED SECRETS
> **If any secret (API key, password, token, database URL, private key) was ever hardcoded into this repository at any point in the past, simply deleting it or modifying the file DOES NOT remove it from Git history.**
>
> Git commits permanently preserve every historical version of tracked files. Anyone with repository access can retrieve past commit diffs.
>
> **Action Required:** If any real credential was previously committed to this repository, you must **IMMEDIATELY ROTATE (revoke, delete, and reissue)** that secret in the respective service provider dashboard (e.g. Supabase, Stripe, OpenAI, SendGrid, Twilio, AWS, database host).

---

### Secret Handling & Environment Rules

1. **Zero Hardcoded Secrets in Source Code:**
   - No API keys, passwords, database URLs, tokens, or private certificates may exist as string literals anywhere in source code, configuration files, comments, or documentation.
   - All dynamic secrets must be injected via environment variables at runtime.

2. **Environment Variable Configuration (`.gitignore` & `.env.example`):**
   - The `.gitignore` file strictly blocks `.env`, `.env.local`, `.env.*.local`, `*.key`, `*.pem`, and credential files from ever being committed.
   - Use `.env.example` as the canonical reference for all required and optional environment variables. Never place actual production or secret values inside `.env.example`.

3. **Supabase Key Architecture:**
   - **Anon Key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`):** Designed for client-side use, but **ONLY IF Row Level Security (RLS) is enabled and enforced on EVERY table** in your Supabase database. Without RLS, the anon key exposes all tables to public read/write access.
   - **Service Role Key (`SUPABASE_SERVICE_ROLE_KEY`):** Bypasses all Row Level Security rules and provides root administrative database access. **It must NEVER appear in client-side code, frontend bundles, or public repositories under any circumstances.**

4. **Stripe Key Segregation:**
   - **Publishable Key (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `pk_...`):** Safe for client-side payment forms and Stripe Elements.
   - **Secret Key (`STRIPE_SECRET_KEY` / `sk_...`):** Must remain strictly server-side for charge creation, customer management, and backend billing.
   - **Webhook Secret (`STRIPE_WEBHOOK_SECRET` / `whsec_...`):** Stored strictly on the backend to verify the cryptographic signature of incoming Stripe webhooks.

5. **Database Connection Strings:**
   - MongoDB URIs (`mongodb+srv://...`) and PostgreSQL URLs (`postgresql://...`) contain database credentials and connection parameters.
   - These must strictly reside in server-side environment variables (`DATABASE_URL`, `MONGODB_URI`) and must never be committed or bundled into client code.

6. **Frontend Exposure & Prefix Rules:**
   - Frameworks like Next.js (`NEXT_PUBLIC_`), Create React App (`REACT_APP_`), and Vite (`VITE_`) automatically expose any variable with these prefixes to the browser bundle.
   - **Audit Rule:** Verify that no private key, JWT secret, database connection string, or service role key ever carries a `NEXT_PUBLIC_` or `REACT_APP_` prefix.

7. **Logging, Error Handlers & API Responses:**
   - Never log `process.env`, Authorization headers, bearer tokens, or database connection strings to `console.log`, `console.error`, or external telemetry.
   - Sanitize all error responses returned to clients so that internal connection errors or stack traces do not reveal backend credentials or database hostnames.

---

## 🚀 Getting Started & Local Development

### Prerequisites
- Python 3.x (for local static HTTP serving) or Node.js (v18+)

### Running Locally
```bash
# Clone the repository
git clone https://github.com/your-org/sitely.git
cd sitely

# Start local server on port 8000
python3 -m http.server 8000
```
Open your browser and navigate to:
```
http://localhost:8000/html/index.html
```

---

## 📁 Project Structure

```
sitely/
├── assets/
│   ├── css/
│   │   ├── styles.css           # Bootstrap core + custom responsive styling
│   │   └── sitely.css           # Sitely theme tokens, typography, and component styles
│   ├── fonts/
│   │   └── manrope/             # Self-hosted Manrope variable woff2 fonts (zero external delay)
│   ├── images/
│   │   ├── logos/               # Sitely official brand marks (SVG)
│   │   ├── portfolio/           # Client project vector assets
│   │   ├── resources/           # High-resolution vector blog illustrations (SVG)
│   │   └── tools/               # Technology stack icons
│   ├── js/
│   │   └── custom.js            # Sticky header, carousels, scroll animations, mobile menu
│   ├── libs/
│   │   ├── iconify-icon/        # Locally bundled Iconify web component (no CDN lag)
│   │   ├── bootstrap/           # Bootstrap 5 core
│   │   ├── owl.carousel/        # Responsive multi-item touch sliders
│   │   └── aos-master/          # Animate On Scroll (AOS) library
│   └── video/
│       └── video.mp4            # Optimized 720p H.264 ambient hero background video
├── html/
│   ├── index.html               # Official Sitely Homepage
│   ├── about-us.html            # About Sitely, team, values, and client support
│   ├── projects.html            # Full portfolio gallery with verified client reviews
│   ├── projects-detail.html     # Dynamic case study detail viewer
│   ├── blog.html                # Educational resources & business tips
│   ├── blog-detail.html         # Dynamic article viewer
│   ├── contact.html             # Direct phone call and WhatsApp contact page
│   ├── privacy-policy.html      # Privacy policy
│   ├── terms-and-conditions.html# Terms of service
│   ├── 404.html                 # Custom 404 page
│   ├── sign-in.html             # Account access interface
│   └── sign-up.html             # Registration interface
├── .env.example                 # Environment variables template with security guidelines
├── .gitignore                   # Strict exclusions for secrets, credentials, and caches
├── index.html                   # Root canonical redirect to /html/index.html
├── robots.txt                   # Search crawler directives
└── sitemap.xml                  # XML sitemap with local Karachi metadata
```

---

## 📄 License & Attribution

- Built for **Sitely Digital Studio**.
- Base architectural template adapted under the MIT License.
- Vector assets, custom typography configurations, branding, and local Pakistani business concepts &copy; 2026 Sitely.
